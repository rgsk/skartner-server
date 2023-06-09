import environmentVars from 'lib/environmentVars';
import { extendType, objectType } from 'nexus';

export const GeneralQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('hello', {
      type: objectType({
        name: 'helloWorld',
        definition(t) {
          t.nonNull.string('message');
        },
      }),
      async resolve(root, args, ctx, info) {
        return {
          message: `Server is running on PORT: ${environmentVars.PORT}`,
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
