import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateReply = async (category: string) => {
  let prompt;

  switch (category) {
    case 'Interested':
      prompt = 'Generate a reply for an interested email asking for a demo call:';
      break;
    case 'Not Interested':
      prompt = 'Generate a polite reply for a not interested email:';
      break;
    case 'More information':
      prompt = 'Generate a reply asking for more information:';
      break;
    default:
      prompt = '';
  }

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}\n\nReply:`,
    max_tokens: 50,
  });

  return response.data.choices[0].text.trim();
};

export { generateReply };
