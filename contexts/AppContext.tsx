import { Message } from '@/types/chat';
import React, { Context, Dispatch, SetStateAction, useState } from 'react';
import { Document } from 'langchain/document';

interface AppContextProps {
  messages: Message[];
  pending?: string;
  history: [string, string][];
  pendingSourceDocs?: Document[];
  setMessageState: Dispatch<SetStateAction<{
    messages: Message[];
    pending?: string | undefined;
    history: [string, string][];
    pendingSourceDocs?: Document[] | undefined;
  }>>,
  apiKey: string;
  updateApiKey: (key: string) => void;
  selectedHistoryIndex: number;
  setSelectedHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext: Context<AppContextProps> = React.createContext(
  {} as unknown as AppContextProps
);

export const AppProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [{
      messages,
      pending,
      history,
      pendingSourceDocs,
    }, setMessageState] = useState<{
      messages: Message[];
      pending?: string;
      history: [string, string][];
      pendingSourceDocs?: Document[];
    }>({
      messages: [
        {
          message: "Hi, what would you like to learn about Ethereum? E.g., what's Ethereum? what's Shanghai/Shapella upgrade?",
          type: 'apiMessage',
        },
      ],
      history: [],
      pendingSourceDocs: [],
    });
    const [apiKey, updateApiKey] = useState('');
    const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(-1);
    
    return (
      <AppContext.Provider
        value={{
          messages,
          pending,
          history,
          pendingSourceDocs,
          setMessageState,
          apiKey,
          updateApiKey,
          selectedHistoryIndex,
          setSelectedHistoryIndex,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
);
