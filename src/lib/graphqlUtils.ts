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
  name: 'uuidComparisonExp',
  definition(t) {
    t.string('_eq');
  },
});

/*
    contains,
    endsWith,
    equals,
    gt,
    gte,
    in,
    lt,
    lte,
    mode,
    not,
    notIn,
    startsWith,
*/

export const StringComparisonExp = inputObjectType({
  name: 'StringComparisonExp',
  definition(t) {
    t.string('equals');
    t.string('not');
    t.list.nonNull.string('in');
    t.list.nonNull.string('notIn');
  },
});
