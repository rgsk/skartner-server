import permissions from 'constants/permissions';
import { Context } from 'context';
import { AuthorizationError } from 'errors';
import { GraphQLError } from 'graphql';
import { chain, rule, shield } from 'graphql-shield';
import { checkUserAuthorizedForPermission } from 'middlewares/authorize';
import { nonNull, stringArg } from 'nexus';

// CAUTION: Never return false
// in that case throw a descriptive error message

const getRuleForPermission = (permissionName: string) =>
  rule()(async (root: any, args: any, ctx: Context, info: any) => {
    if (!ctx.user) {
      throw new GraphQLError('Authentication Error');
    }
    const result = await checkUserAuthorizedForPermission({
      permissionName: permissionName,
      userId: ctx.user.id,
    });
    if (!result.hasPermission) {
      throw new AuthorizationError(permissionName, {
        extensions: result,
      });
    }
    return true;
  });

export const rules = {
  isAuthenticatedUser: {
    rule: rule()(async (root: any, args: any, ctx: Context, info: any) => {
      if (!!ctx.user) {
        return true;
      }
      throw new GraphQLError('Authentication Error');
    }),
  },
  canAccessAdminDashboard: {
    rule: getRuleForPermission(permissions['Access Admin Dashboard'].key),
  },
  canAccessConfidentialTables: {
    rule: getRuleForPermission(
      permissions['Access Admin Dashboard']['Access Confidential Tables'].key
    ),
  },
  canAccessUsersTable: {
    rule: getRuleForPermission(
      permissions['Access Admin Dashboard']['Access Confidential Tables'][
        'Access Users Table'
      ].key
    ),
  },
  canAccessGreWordsTable: {
    rule: getRuleForPermission(
      permissions['Access Admin Dashboard']['Access Confidential Tables'][
        'Access GreWords Table'
      ].key
    ),
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
          throw new GraphQLError('Authentication Error');
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
        if (ctx.user.id === greWord.userId) {
          return true;
        }
        throw new GraphQLError("Authorization Error: Can't access this entity");
      }
    ),
  },
};

export const graphqlPermissions = shield(
  {
    Query: {
      // "chain" method executes the rules one by one
      // "and" method executes the rules in parellel
      users: chain(
        rules.isAuthenticatedUser.rule,
        rules.canAccessUsersTable.rule
      ),
      userSessions: rules.canAccessAdminDashboard.rule,
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

    debug: true, // debug needs to be set to true, to send the error thrown
  }
);
//
