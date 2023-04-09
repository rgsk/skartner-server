// api/schema.ts
import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';
import { environmentVariables } from 'lib/environmentVariables';

export const schema = makeSchema({
  types: types,
  ...(environmentVariables.NODE_ENV === 'development'
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
