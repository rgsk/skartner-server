import environmentVars from 'lib/environmentVars';
import { extendType, nonNull, objectType } from 'nexus';

export const BatchPayloadObject = objectType({
  name: 'BatchPayload',
  definition(t) {
    t.nonNull.int('count');
  },
});

export const GeneralQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('hello', {
      type: nonNull(
        objectType({
          name: 'HelloWorld',
          definition(t) {
            t.nonNull.string('message');
          },
        })
      ),
      async resolve(root, args, ctx, info) {
        return {
          message: `GRAPHQL: Server is running on PORT: ${environmentVars.PORT}`,
        };
      },
    });
    t.nonNull.field('authenticate', {
      type: nonNull(
        objectType({
          name: 'AuthenticateResponse',
          definition(t) {
            t.nonNull.string('message');
          },
        })
      ),
      async resolve(root, args, ctx, info) {
        return {
          message: `email: ${ctx.user?.email}`,
        };
      },
    });
    t.nonNull.field('greConfiguration', {
      type: objectType({
        name: 'GreConfiguration',
        definition(t) {
          t.nonNull.list.nonNull.string('defaultGreWordSearchPromptInputs');
        },
      }),
      async resolve(root, args, ctx, info) {
        return {
          defaultGreWordSearchPromptInputs: [
            'list meaning and 3 easy example sentences for word - {word}',
            'list meaning in simple words and 5 easy example sentences for word - {word}',
          ],
        };
      },
    });
  },
});
