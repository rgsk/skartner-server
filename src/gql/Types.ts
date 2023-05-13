import { Kind } from 'graphql';
import { inputObjectType, scalarType } from 'nexus';

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
