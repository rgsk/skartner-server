import { Configuration, OpenAIApi } from 'openai';
import environmentVars from './environmentVars';

const configuration = new Configuration({
  organization: environmentVars.OPENAI_ORGANIZATION,
  apiKey: environmentVars.OPENAI_API_KEY,
});
const openAIApi = new OpenAIApi(configuration);

export default openAIApi;
