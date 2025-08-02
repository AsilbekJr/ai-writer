import type { TContentCreateRequestParam } from '@/shared/types/content-create-request-param';
import type { TGeneratedContent } from '@/shared/types/generating-content';
import { generateArticle } from '@/utilis/gemini';
import {
  createContext,
  useContext,
  type ReactNode,
  type FC,
  useState,
} from 'react';

interface IContentContext {
  generatingContent: boolean;
  setGeneratingContent: (value: boolean) => void;
  generateContent: (
    params: TContentCreateRequestParam
  ) => Promise<string | null>;
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
  const generateContent = async (params: TContentCreateRequestParam) => {
    let content = null;
    setGeneratingContent(true);
    const { title, description } = params;
    content = await generateArticle(title, description, setGeneratingContent);
    if (content) {
      const generetedContentItem: TGeneratedContent = {
        id: '1234',
        title,
        description,
        content,
        createdAt: new Date(),
      };
      localStorage.setItem(
        'contentItems',
        JSON.stringify([generetedContentItem])
      );
    }

    return content;
  };
  return (
    <ContentContext.Provider
      value={{
        generatingContent,
        setGeneratingContent,
        generateContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContextProvider, useContentContext };
