import { addDateFieldsDefinitions } from 'lib/graphqlUtils';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const JsonDataObject = objectType({
  name: 'JsonData',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('key');
    t.nonNull.field('value', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
  },
});

export const JsonDataQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getJsonDataKey', {
      type: 'JsonData',
      args: {
        key: nonNull('String'),
      },
      async resolve(root, args, ctx, info) {
        const jsonData = await ctx.db.jsonData.findFirst({
          where: { key: args.key },
        });
        return jsonData;
      },
    });
  },
});

export const JsonDataMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('setJsonDataKey', {
      type: 'JsonData',
      args: {
        key: nonNull(stringArg()),
        value: nonNull('Json'),
      },
      async resolve(root, args, ctx, info) {
        const { key, value } = args;
        const jsonData = await ctx.db.jsonData.findFirst({ where: { key } });
        if (!jsonData) {
          const createdJsonData = await ctx.db.jsonData.create({
            data: {
              key,
              value,
            },
          });
          return createdJsonData;
        }
        const updatedJsonData = await ctx.db.jsonData.update({
          where: { key },
          data: {
            value,
          },
        });
        return updatedJsonData;
      },
    });
  },
});
