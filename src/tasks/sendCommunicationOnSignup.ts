import { User } from '@prisma/client';
import Bull from 'bull';
import { notifyUser } from 'gql';

export interface TaskSendCommunicationOnSignupData {
  user: User;
}
const sendCommunicationOnSignup = async (
  job: Bull.Job<TaskSendCommunicationOnSignupData>
) => {
  const { user } = job.data;
  notifyUser({ userId: user.id, message: 'Welcome to Skartner' });
};
export default sendCommunicationOnSignup;
