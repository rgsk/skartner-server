// yarn run:file src/seeders/createRandomUsers.ts

import { db } from 'db';

const usersData = [
  { email: 'naina@gmail.com' },
  { email: 'praveen@gmail.com' },
  { email: 'virender@gmail.com' },
  { email: 'steve@gmail.com' },
  { email: 'elon@gmail.com' },
  { email: 'sam@gmail.com' },
  { email: 'ai@gmail.com' },
  { email: 'physics@gmail.com' },
  { email: 'math@gmail.com' },
];

const createRandomUsers = async () => {
  const { count } = await db.user.createMany({ data: usersData });
  console.log({ count });
};

createRandomUsers();
