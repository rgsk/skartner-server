import { inputObjectType, intArg } from 'nexus';

export const addDateFieldsDefinitions = (t: any) => {
  t.nonNull.field('createdAt', {
    type: 'String',
    resolve: (root: any) => root.createdAt.toISOString(),
  });
  t.nonNull.field('updatedAt', {
    type: 'String',
    resolve: (root: any) => root.updatedAt.toISOString(),
  });
};
export const findManyGraphqlArgs = {
  offset: intArg(),
  limit: intArg(),
};

export const uuidComparisonExp = inputObjectType({
  name: 'uuid_comparison_exp',
  definition(t) {
    t.string('_eq');
  },
});

export const StringComparisonExp = inputObjectType({
  name: 'String_comparison_exp',
  definition(t) {
    t.string('_eq');
  },
});
