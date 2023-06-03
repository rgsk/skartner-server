import { context } from 'context';
import { withFilter } from 'graphql-subscriptions';
import { Subscriptions } from 'lib/Subscriptions';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

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
        (...args) => {
          return context.pubsub.asyncIterator(
            Subscriptions.notificationReceived
          );
        },
        (payload, variables) => {
          return payload.userId === variables.userId;
        }
      ),
      resolve(eventData: any) {
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
        const notification = {
          userId,
          message,
        };
        ctx.pubsub.publish(Subscriptions.notificationReceived, notification);
        return notification;
      },
    });
  },
});
