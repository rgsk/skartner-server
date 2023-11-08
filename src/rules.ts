import { Context } from 'context';
import { rule, shield } from 'graphql-shield';
import { nonNull, stringArg } from 'nexus';

export const rules = {
  isAuthenticatedUser: {
    rule: rule()(async (root: any, args: any, ctx: Context, info: any) => {
      return !!ctx.user;
    }),
  },
  isGreWordOwner: {
    args: {
      id: nonNull(stringArg()),
    },
    rule: rule()(
      async (
        root: any,
        args: {
          id: string;
        },
        ctx: Context,
        info: any
      ) => {
        if (!ctx.user) {
          return false;
        }
        const id = args.id;
        const greWord = await ctx.db.greWord.findUnique({
          where: {
            id: id,
          },
        });
        if (!greWord) {
          return true;
        }
        return ctx.user.id === greWord.userId;
      }
    ),
  },
};

export const permissions = shield(
  {
    Query: {
      users: rules.isAuthenticatedUser.rule,
    },
    Mutation: {
      deleteGreWord: rules.isGreWordOwner.rule,
    },
    Subscription: {},
  },
  {
    allowExternalErrors: true,
    // allowExternalErrors ensures
    // that if authorization layer succeeds
    // then error thrown thereafter is sent
    // otherwise error in resolvers was not sent
    // and every error was "Not Authorised!"
  }
);
