import { PrismaClient } from '@prisma/client';
import fileLogger from 'lib/fileLogger';
export const db = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

db.$on('query', async (e) => {
  console.log(`${e.query} ${e.params}`);
  fileLogger.logToJsFile(`${e.query} ${e.params}`);
});
