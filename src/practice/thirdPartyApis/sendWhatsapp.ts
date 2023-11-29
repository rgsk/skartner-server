import axios from 'axios';
import environmentVars from 'lib/environmentVars';

const sendWhatsapp = async () => {
  const response = await axios.post(
    `https://graph.facebook.com/v17.0/${environmentVars.WHATSAPP.APP_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      to: '919877258740',
      type: 'template',
      template: { name: 'custom', language: { code: 'en' } },
    },
    {
      headers: {
        Authorization: `Bearer ${environmentVars.WHATSAPP.PERMANENT_TOKEN}`,
      },
    }
  );
  console.log(response.data);
};
sendWhatsapp();
