import ollama from 'lib/ollama';

export const firstTest = async () => {
  const response = await ollama.chat({
    model: 'llama2',
    messages: [
      {
        role: 'user',
        content:
          'list the meaning of enthusiastic, along with 3 examples, also list antonyms and synonyms?',
      },
    ],
    stream: false,
  });
  console.log(response.message.content);
};
