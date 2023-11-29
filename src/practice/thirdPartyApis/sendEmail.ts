import { SendEmailCommand } from '@aws-sdk/client-ses';
import sesClient from 'lib/sesClient';

const createSendEmailCommand = (toAddress: string, fromAddress: string) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: 'HTML_FORMAT_BODY changed again',
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'TEXT_FORMAT_BODY',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'EMAIL_SUBJECT',
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    'rahulguptasde@gmail.com',
    'rahulguptasde@gmail.com'
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error('Failed to send email.');
    console.log(e);
    return e;
  }
};

run();
