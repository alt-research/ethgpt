import { OpenAIChat } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain, RetrievalQAChain, ConversationalRetrievalQAChain} from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';
import { CallbackManager } from 'langchain/callbacks';

const CONDENSE_PROMPT =
//   PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

// Chat History:
// {}
// Follow Up Input: {question}
// Standalone question:`);

  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT = PromptTemplate.fromTemplate(
  `You are an AI assistant providing helpful advice. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.


Question: {question}
=========
{context}
=========
Answer in Markdown:`,
);
//   `You are an AI assistant providing helpful advice. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
// You should only provide hyperlinks that reference the context below. Do NOT make up hyperlinks.
// If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
// If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

// Question: {question}
// =========
// {context}
// =========
// Answer in Markdown:`,
// );

export const makeChain = (
  // vectorstore: vectorStore,
  vectorstore: PineconeStore,
  onTokenStream?: (token: string) => void,
  openAiApiKey?: string,
) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAIChat({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAChain(
    new OpenAIChat({
      openAIApiKey: openAiApiKey,
      temperature: 0,
      modelName: 'gpt-3.5-turbo-0301', //change this to older versions (e.g. gpt-3.5-turbo) if you don't have access to gpt-4
      // modelName: 'gpt-4', //change this to older versions (e.g. gpt-3.5-turbo) if you don't have access to gpt-4
      streaming: Boolean(onTokenStream),
      callbackManager: onTokenStream
        ? CallbackManager.fromHandlers({
            async handleLLMNewToken(token) {
              onTokenStream(token);
              console.log(token);
            },
          })
        : undefined,
    }),
    { prompt: QA_PROMPT },
  );

  return new ConversationalRetrievalQAChain({
  // return new ChatVectorDBQAChain({
    retriever: vectorstore.asRetriever(),
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
    returnSourceDocuments: false,
    // k: 1, //number of source documents to return
  });
  // return new ConversationalRetrievalQAChain.fromLLM(
  //     docChain,
  //   // return new ChatVectorDBQAChain({
  //     vectorstore.asRetriever()
  //     // combineDocumentsChain: docChain,
  //     // questionGeneratorChain: questionGenerator,
  //     // returnSourceDocuments: true,
  //     // k: 1, //number of source documents to return
  //   );
};
