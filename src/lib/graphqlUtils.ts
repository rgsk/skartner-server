import { intArg } from 'nexus';

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
export const findManyGraphqlArgs = () => {
  return {
    offset: intArg(),
    limit: intArg(),
  };
};
