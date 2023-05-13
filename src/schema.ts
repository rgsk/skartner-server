// api/schema.ts
import environmentVars from 'lib/environmentVars';
import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './gql';

export const schema = makeSchema({
  types: types,
  ...(environmentVars.NODE_ENV === 'development'
    ? {
        outputs: {
          typegen: join(__dirname, '..', 'nexus-typegen.ts'),
          schema: join(__dirname, '..', 'schema.graphql'),
        },
        contextType: {
          module: join(__dirname, './context.ts'),
          export: 'Context',
        },
      }
    : {}),
});
