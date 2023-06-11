import { context } from 'context';
import { withFilter } from 'graphql-subscriptions';
import { Subscriptions } from 'lib/Subscriptions';
import { withCancel } from 'lib/graphqlUtils';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import pubsub from 'pubsub';

type Notification = {
  userId: string;
  message: string;
};

export const NotificationObject = objectType({
  name: 'Notification',
  definition(t) {
    t.nonNull.string('message');
    t.nonNull.string('userId');
  },
});

export const NotificationSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field(Subscriptions.notificationReceived, {
      type: 'Notification',
      args: {
        userId: nonNull(stringArg()),
      },
      subscribe: withFilter(
        (root, args, ctx, info) => {
          console.log(args);
          console.log('connection established');
          const asyncIterator = context.pubsub.asyncIterator(
            Subscriptions.notificationReceived
          );
          return withCancel(asyncIterator, () => {
            console.log(args);
            console.log('connection closed');
          });
        },
        (root, args, ctx, info) => {
          return root.userId === args.userId;
        }
      ),
      resolve(eventData) {
        return eventData;
      },
    });
    t.boolean('truths', {
      subscribe() {
        return (async function* () {
          while (true) {
            await new Promise((res) => setTimeout(res, 1000));
            yield Math.random() > 0.5;
          }
        })();
      },
      resolve(eventData) {
        return eventData;
      },
    });
  },
});

export const NotificationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNotification', {
      type: 'Notification',
      args: {
        userId: nonNull(stringArg()),
        message: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { userId, message } = args;
        const notification: Notification = {
          userId,
          message,
        };
        notifyUser(notification);
        return notification;
      },
    });
  },
});

export const notifyUser = (notification: Notification) => {
  pubsub.publish(Subscriptions.notificationReceived, notification);
};
