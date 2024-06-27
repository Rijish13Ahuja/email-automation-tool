import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const categorizeEmail = async (content: string) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Categorize the following email content:\n\n${content}\n\nCategories:\n- Interested\n- Not Interested\n- More information`,
    max_tokens: 10,
  });

  return response.data.choices[0].text.trim();
};

export { categorizeEmail };
