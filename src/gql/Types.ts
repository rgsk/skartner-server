import { Prisma } from '@prisma/client';
import { Kind } from 'graphql';
import { enumType, inputObjectType, scalarType } from 'nexus';
import { NexusGenEnums } from '../../nexus-typegen';

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

export const StringFilter = inputObjectType({
  name: 'StringFilter',
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

export const Json = scalarType({
  name: 'Json',
  description: 'The `Json` scalar type represents JSON objects.',
  parseValue(value: any) {
    // console.log('parseValue(value)', value, JSON.parse(value));
    return JSON.parse(value);
  },
  serialize(value) {
    // console.log('serialize(value)', value, JSON.stringify(value));
    return JSON.stringify(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // console.log('parseLiteral(ast)', ast.value, JSON.parse(ast.value));
      return JSON.parse(ast.value);
    }
    return null;
  },
});

export const getEnumFilter = (type: keyof NexusGenEnums) => {
  return inputObjectType({
    name: `Enum${type}Filter`,
    definition(t) {
      t.field('equals', { type: type });
      t.list.nonNull.field('in', {
        type: type,
      });
      t.list.nonNull.field('notIn', {
        type: type,
      });
      t.field('not', { type: type });
    },
  });
};

export const SortOrderEnum = enumType({
  name: 'SortOrder',
  members: [Prisma.SortOrder.asc, Prisma.SortOrder.desc],
});
