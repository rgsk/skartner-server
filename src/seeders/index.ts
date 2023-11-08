// NODE_PATH=src ts-node src/seeders/index.ts

import { createAdminUser } from './createAdminUser';

const runSeeders = async () => {
  await createAdminUser();
};

runSeeders();
