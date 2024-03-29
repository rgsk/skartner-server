import Prisma from '@prisma/client';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import { db } from 'db';
import { Subscriptions } from 'lib/Subscriptions';
import { withCancel } from 'lib/graphqlUtils';
import { withFilter } from 'lib/withFilter';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import pubsub from 'pubsub';

// for testing substitute below methods
// subDays -> subMinutes
// startOfDay -> startOfMinute
// endOfDay -> endOfMinute

const calculateStreak = async (userSession: Prisma.UserSession) => {
  let date = userSession.startedAt;
  let streak = 1;
  while (true) {
    date = subDays(date, 1);
    const previousDateSessionCount = await db.userSession.count({
      where: {
        userId: userSession.userId,
        startedAt: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    });
    if (previousDateSessionCount > 0) {
      streak++;
    } else {
      return streak;
    }
  }
};

const notifyForStreak = async (userSession: Prisma.UserSession) => {
  const todaysSessionCount = await db.userSession.count({
    where: {
      userId: userSession.userId,
      startedAt: {
        gte: startOfDay(userSession.startedAt),
        lte: endOfDay(userSession.startedAt),
      },
    },
  });
  const isFirstSession = todaysSessionCount === 1;
  if (isFirstSession) {
    // if this is the first session
    const streak = await calculateStreak(userSession);
    if (streak > 1) {
      notifyUser({
        userId: userSession.userId,
        message: `You are on continuous ${streak} days streak`,
      });
    }
  }
};

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
        token: nonNull(stringArg()),
      },
      subscribe: withFilter(
        async (root, args, ctx, info) => {
          // this runs when user subscribes
          if (!ctx.user) {
            throw new Error('invalid token');
          }
          const userSession = await ctx.db.userSession.create({
            data: {
              userId: ctx.user.id,
              startedAt: new Date(),
            },
          });
          notifyForStreak(userSession);
          const asyncIterator = ctx.pubsub.asyncIterator(
            Subscriptions.notificationReceived
          );
          return withCancel(asyncIterator, async () => {
            // this runs when user unsubscribes
            const currentTime = new Date();
            const updatedUserSession = await ctx.db.userSession.update({
              where: {
                id: userSession.id,
              },
              data: {
                endedAt: currentTime,
                duration:
                  currentTime.getTime() - userSession.startedAt.getTime(),
              },
            });
          });
        },
        async (root: Notification, args, ctx, info) => {
          //  this runs when notifyUser function is called for any user
          //  pubsub.publish(Subscriptions.notificationReceived, notification);
          // here we filter so that user is notified only if it's him who has subscribed to the notification
          return root.userId === ctx.user?.id;
        }
      ),
      resolve(root: Notification, args, ctx, info) {
        // ctx somehow is received as undefined here
        return root;
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
