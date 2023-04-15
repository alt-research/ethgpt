import { Message } from '@/types/chat';
import { Box, Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import LoadingDots from './ui/LoadingDots';
import { Document } from 'langchain/document';
import IconSend from './icons/IconSend';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { AppContext } from '@/contexts/AppContext';

const Header: React.FC = () => {
  return (
    <Box sx={{
      background: 'rgb(68, 70, 84)',
      height: '36px',
      padding: '8px 0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography variant="body1" sx={{
        color: 'white'
      }}>
        {/* <div font-family=''> */}
        Ethereum ChatBot
        {/* </div> */}
      </Typography>
    </Box>
  );
};

const Footer: React.FC = () => {
  return (
    <Typography variant="body2" margin="12px auto 24px auto" color="rgba(255,255,255,0.8)">
      {/* <div font-family=''> */}
      Built with love ❤ by <a style={{
        textDecoration: 'underline'
      }} href="https://twitter.com/jiayaoqi" target="_blank" rel="noopener noreferrer">YQ</a>.
      {/* </div> */}
    </Typography>
  );
};

const Question: React.FC<{
  history: [string, string][];
  loading: boolean;
  setMessageState: Dispatch<SetStateAction<{
    messages: Message[];
    pending?: string | undefined;
    history: [string, string][];
    pendingSourceDocs?: Document[] | undefined;
  }>>,
  setLoading: any,
}> = ({ history, setMessageState, loading, setLoading }) => {
  const [query, setQuery] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { apiKey } = useContext(AppContext);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);
  
  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };
  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
      pending: undefined,
    }));

    setLoading(true);
    setQuery('');
    setMessageState((state) => ({ ...state, pending: '' }));

    const ctrl = new AbortController();

    try {
      fetchEventSource('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
          openAiApiKey: apiKey,
        }),
        signal: ctrl.signal,
        onmessage: (event) => {
          if (event.data === '[DONE]') {
            setMessageState((state) => ({
              history: [...state.history, [question, state.pending ?? '']],
              messages: [
                ...state.messages,
                {
                  type: 'apiMessage',
                  message: state.pending ?? '',
                  sourceDocs: state.pendingSourceDocs,
                },
              ],
              pending: undefined,
              pendingSourceDocs: undefined,
            }));
            setLoading(false);
            ctrl.abort();
          } else {
            const data = JSON.parse(event.data);
            if (data.sourceDocs) {
              setMessageState((state) => ({
                ...state,
                pendingSourceDocs: data.sourceDocs,
              }));
            } else if (data.data){
            // } else {
              // console.log("data.data: ", data.data);
              setMessageState((state) => ({
                ...state,
                pending: (state.pending ?? '') + data.data,
              }));
            }
            else {
              setMessageState((state) => ({
                ...state,
                pending: (state.pending ?? ''),
              }));
            }
          }
        },
      });
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  }

  const autoSize = useCallback(() => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = "46px";
    // Set the height to fit the content
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 2 + "px";
  }, []);

  return (
    <Box sx={{
      textAlign: 'center',
      marginTop: '10px',
    }}>
      <textarea
        style={{
          maxWidth: '48rem',
          boxShadow: 'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.1) 0px 0px 15px 0px',
          // backgroundColor: 'rgb(64 65 79)',
          backgroundColor: 'rgb(32 33 35)',
          outline: 'none',
          resize: 'none',
          width: '80%',
          height: '46px',
          padding: '12px 16px',
          color: 'white',
          fontSize: '14px',
          lineHeight: '20px',
          border: '1px solid rgb(64 65 79)',
          borderRadius: '6px',
        }}
        disabled={loading}
        onKeyDown={handleEnter}
        ref={textAreaRef}
        autoFocus={false}
        rows={1}
        maxLength={512}
        id="userInput"
        name="userInput"
        placeholder={
          loading
            ? 'Waiting for response...'
            : 'What is Ethereum?'
        }
        value={query}
        onInput={autoSize}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <Box sx={{
          display: 'inline-block',
          position: 'relative',
          left: '-30px',
          top: '-20px',
        }}>
          <LoadingDots color="rgb(229,229,229)" />
        </Box>
      ) : (
      <Box
        onClick={handleSubmit}
        sx={{
          display: 'inline-flex',
          background: 'rgba(0,0,0,0)',
          cursor: 'pointer',
          position: 'relative',
          left: '-30px',
          top: '-14px',
          width: "24px",
          height: "24px",
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '2px',
          '&:hover': {
            background: 'rgba(229, 229, 229, 0.5)'
          }
        }}>
          <IconSend sx={{
            width: "16px",
            height: "16px",
          }} />
        </Box>
      )}
  </Box>
  );
};

const QaA: React.FC<{
  messages: Message[];
  pending?: string;
  history: [string, string][];
  pendingSourceDocs?: Document[];
  loading: boolean;
}> = ({ messages, pending, pendingSourceDocs, loading }) => {
  const { selectedHistoryIndex } = useContext(AppContext);
  const chatMessages = useMemo(() => {
    return [
      ...messages,
      ...(pending
        ? [
            {
              type: 'apiMessage',
              message: pending,
              sourceDocs: pendingSourceDocs,
            },
          ]
        : []),
    ];
  }, [messages, pending, pendingSourceDocs]);
  const userIcons = [
    '/otties/ottie1.webp',
    '/otties/ottie2.webp',
    '/otties/ottie3.webp',
    '/otties/ottie4.webp',
    '/otties/ottie5.webp',
    // Add more user icons here
  ];  
  const messageListRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  function getRandomUserIcon() {
    const index = Math.floor(Math.random() * userIcons.length);
    return userIcons[index];
  }

  return (<Box sx={{
    flexDirection: 'column',
    display: 'flex',
    flex: 1,  
  }}>
    {
      chatMessages.map((message, index) => {
        let icon;
        if (message.type === 'apiMessage') {
          icon = (
            <Image
              src="/eth.png"
              alt="AI"
              width="25"
              height="25"
              priority
            />
          );
        } else {
          icon = (
            <a href="https://ottie.altlayer.io/" target="_blank" rel="noopener noreferrer">
              <Image
                src={getRandomUserIcon()}
                alt="Me"
                width="25"
                height="25"
                priority
              />
            </a>
          );
        }
    
        return (
          <Box key={index} sx={{
            border: index !== 0 && selectedHistoryIndex === Math.floor((index - 1) / 2) ? '1px solid #00a67d' : 'none',
            borderBottomWidth: index !== 0 && selectedHistoryIndex === Math.floor((index - 1) / 2) ? (index % 2) === 1 ? '0px' : '1px' : '0px',
            borderTopWidth: index !== 0 && selectedHistoryIndex === Math.floor((index - 1) / 2) ? (index % 2) === 0 ? '0px' : '1px' : '0px',
          }}>
            <Box
              py={3}
              sx={{
                background: message.type !== 'apiMessage' && loading && index === chatMessages.length - 1 ? 'linear-gradient(to left, #070809, #1a1c20, #070809)' : index % 2 ? 'rgb(68 70 84)' : 'rgb(52, 53, 65)',
                animation: 'loading-gradient 2s ease-in-out infinite',
                backgroundPosition: '-100% 0',
                backgroundSize: '200% 200%',
                animationDirection: 'alternate',
                animatioName: 'loading-gradient',
                borderBottom: index % 2 ? '1px solid rgba(17,24,39,.5)' : '1px solid rgba(17,24,39,.5)',
              }}
            >
              <Grid container sx={{
                maxWidth: '48rem',
                margin: 'auto',
                flexWrap: "nowrap",
              }}>
                <Box width="40px" pt={0.5}>
                  {icon}
                </Box>
                <Box pl={2} sx={{
                  color: '#d1d5db',
                  lineHeight: '28px',
                  fontSize: '16px',
                  fontFamily: '__Inter_4b5723,__Inter_Fallback_4b5723',
                }}>
                  <ReactMarkdown linkTarget="_blank">
                    {message.message}
                  </ReactMarkdown>
                </Box>
              </Grid>
            </Box>
            {/* {message.sourceDocs && (
              <div className="p-5">
                <Accordion
                  type="single"
                  collapsible
                  className="flex-col"
                >
                  {message.sourceDocs.map((doc, index) => (
                    <div key={`sourceDoc-${index}`}>
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>
                          <h3>Source {index + 1}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ReactMarkdown linkTarget="_blank">
                            {doc.pageContent}
                          </ReactMarkdown>
                          <p className="mt-2">
                            <b>Source:</b> {doc.metadata.source}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </div>
            )} */}
          </Box>
        );
      })
    }
  </Box>);
};

const Conversation: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    messages,
    pending,
    history,
    pendingSourceDocs,
    setMessageState,
  } = useContext(AppContext);

  return (
    <Box sx={{
      flexDirection: 'column',
      display: 'flex',
      flex: 1,
    }}>
      <QaA {...{
        messages,
        pending,
        history,
        pendingSourceDocs
      }} loading={loading} />
      <Question  {...{
        messages,
        pending,
        history,
        pendingSourceDocs
      }} loading={loading} setLoading={setLoading} setMessageState={setMessageState} />
    </Box>
  );
};

const Main: React.FC = () => {
  return (
    <Box sx={{
      background: 'rgb(52 53 65)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '300px',
    }}>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Header />
        <Conversation />
        <Footer />
      </Box>
    </Box>
  )
}

export default Main;
