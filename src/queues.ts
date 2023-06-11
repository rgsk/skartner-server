import { BullMonitorExpress } from '@bull-monitor/express';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';
import Bull from 'bull';
import environmentVars from 'lib/environmentVars';
import sendCommunicationOnSignup, {
  TaskSendCommunicationOnSignupData,
} from 'tasks/sendCommunicationOnSignup';

export const sendCommunicationOnSignupQueue =
  new Bull<TaskSendCommunicationOnSignupData>(
    'sendCommunicationOnSignup',
    environmentVars.REDIS_URL
  );

sendCommunicationOnSignupQueue.process(sendCommunicationOnSignup);

export const bullMonitorExpress = new BullMonitorExpress({
  queues: [new BullAdapter(sendCommunicationOnSignupQueue)],
  // enables graphql introspection query. false by default if NODE_ENV == production, true otherwise
  gqlIntrospection: true,
  // enable metrics collector. false by default
  // metrics are persisted into redis as a list
  // with keys in format "bull_monitor::metrics::{{queue}}"
  metrics: {
    // collect metrics every X
    // where X is any value supported by https://github.com/kibertoad/toad-scheduler
    collectInterval: { hours: 1 },
    maxMetrics: 100,
    // disable metrics for specific queues
    blacklist: ['1'],
  },
});
