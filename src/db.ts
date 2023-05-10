import { PrismaClient } from '@prisma/client';
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
});
