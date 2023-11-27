import { OpenAI } from 'openai';
import environmentVars from './environmentVars';

const openAI = new OpenAI({
  organization: environmentVars.OPENAI_ORGANIZATION,
  apiKey: environmentVars.OPENAI_API_KEY,
});

export default openAI;
