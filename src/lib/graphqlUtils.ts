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
  skip: intArg(),
  take: intArg(),
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
    t.string('contains');
    t.string('endsWith');
    t.string('equals');
    t.string('gt');
    t.string('gte');
    t.list.nonNull.string('in');
    t.string('lt');
    t.string('lte');
    t.string('not');
    t.list.nonNull.string('notIn');
    t.string('startsWith');
  },
});
