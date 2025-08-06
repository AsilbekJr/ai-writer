import type { TContentCreateRequestParam } from '@/shared/types/content-create-request-param';
import type { TGeneratedContent } from '@/shared/types/generating-content';
import { generateArticle } from '@/utilis/gemini';
import { useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import {
  createContext,
  useContext,
  type ReactNode,
  type FC,
  useState,
} from 'react';
import type {
  TPromptHistory,
  TPromptLinks,
} from '@/shared/types/propmt-history.type';

interface IContentContext {
  generatingContent: boolean;
  setGeneratingContent: (value: boolean) => void;
  generateContent: (
    params: TContentCreateRequestParam
  ) => Promise<TGeneratedContent | null>;
  getPromtHistory: () => TPromptHistory[];
  getContentById: (id: string) => TGeneratedContent;
  updateById: (id: string, generatedContent: TGeneratedContent) => void;
}

export const ContentContext = createContext<IContentContext | null>(null);

const useContentContext = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('Content Context must be used within a ContextProvider');
  }

  return context;
};

interface IProps {
  children: ReactNode;
}

const ContentContextProvider: FC<IProps> = ({ children }) => {
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentItems, setContentItems] = useLocalStorage('contentItems', []);

  const generateContent = async (params: TContentCreateRequestParam) => {
    let generatedContent: TGeneratedContent | null = null;
    setGeneratingContent(true);
    const { title, description } = params;
    const content = await generateArticle(
      title,
      description,
      setGeneratingContent
    );
    // const tomorow = new Date();

    // tomorow.setDate(tomorow.getDate() + 1);
    if (content) {
      generatedContent = {
        id: uuidv4(),
        title,
        description,
        content,
        createdAt: new Date(),
      };
      setContentItems([generatedContent as never, ...(contentItems || [])]);
    }

    return generatedContent;
  };
  const getPromtHistory = (): TPromptHistory[] => {
    if (!contentItems) {
      return [];
    }
    const groupedItems = contentItems.reduce(
      (prev: { [data: string]: TPromptLinks[] }, next: TGeneratedContent) => {
        const date = dayjs(next.createdAt).format('MMM DD, YYYY');
        if (!prev[date]) {
          prev[date] = [];
        }
        prev[date].push({
          title: next.title,
          url: `/dashboard/content/${next.id}`,
        });
        return prev;
      },
      {}
    );
    return Object.keys(groupedItems)
      .sort((a, b) => dayjs(b).diff(a))
      .map((date) => ({
        date,
        links: groupedItems[date],
      }));
  };

  const getContentById = (id: string) => {
    const generatedContent = contentItems?.find((item) => item.id === id);

    if (!generatedContent) {
      throw new Error('Content not found');
    }
    return generatedContent;
  };

  const updateById = (id: string, generatedContent: TGeneratedContent) => {
    const updatedContentItems = contentItems?.map((item) => {
      if (item.id === id) {
        return generatedContent;
      }
      return item;
    });
    setContentItems((updatedContentItems as never) || []);
  };

  return (
    <ContentContext.Provider
      value={{
        generatingContent,
        setGeneratingContent,
        generateContent,
        getPromtHistory,
        getContentById,
        updateById,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContextProvider, useContentContext };
