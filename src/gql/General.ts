import { extendType, objectType } from 'nexus';

export const GeneralQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('metaFields', {
      type: objectType({
        name: 'MetaFields',
        definition(t) {
          t.nonNull.field('user', {
            type: objectType({
              name: 'MetaFields_User',
              definition(t) {
                t.nonNull.string('showDefaultGreWordSearchPromptInputs');
              },
            }),
          });
        },
      }),
      async resolve(root, args, ctx, info) {
        return {
          user: {
            showDefaultGreWordSearchPromptInputs:
              'showDefaultGreWordSearchPromptInputs',
          },
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
            'list meaning in simple words and 3 easy example sentences for word - {word}',
          ],
        };
      },
    });
  },
});
