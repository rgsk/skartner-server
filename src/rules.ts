import permissions from 'constants/permissions';
import { Context } from 'context';
import { chain, rule, shield } from 'graphql-shield';
import { checkUserAuthorizedForPermission } from 'middlewares/authorize';
import { nonNull, stringArg } from 'nexus';

export const rules = {
  isAuthenticatedUser: {
    rule: rule()(async (root: any, args: any, ctx: Context, info: any) => {
      return !!ctx.user;
    }),
  },
  canAccessAdmin: {
    rule: rule()(async (root: any, args: any, ctx: Context, info: any) => {
      if (!ctx.user) {
        return false;
      }
      const result = await checkUserAuthorizedForPermission({
        permissionName: permissions['Access Admin Dashboard'].key,
        userId: ctx.user.id,
      });
      return result;
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

export const graphqlPermissions = shield(
  {
    Query: {
      // "chain" method executes the rules one by one
      // "and" method executes the rules in parellel
      users: chain(rules.isAuthenticatedUser.rule, rules.canAccessAdmin.rule),
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
//
