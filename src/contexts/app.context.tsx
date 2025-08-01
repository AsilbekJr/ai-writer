import {
  createContext,
  useContext,
  type FC,
  useState,
  type ReactNode,
} from 'react';

interface IAppContext {
  generatingContent: boolean;
  setGeneratingContent: (value: boolean) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<IAppContext | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('App context provider bilan ishlaydi');
  }
  return context;
};

interface IProps {
  children: ReactNode;
}

const AppContextProvider: FC<IProps> = ({ children }) => {
  const [generatingContent, setGeneratingContent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <AppContext.Provider
      value={{
        generatingContent,
        setGeneratingContent,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useAppContext };
