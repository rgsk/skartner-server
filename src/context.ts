// api/context.ts
import { PrismaClient } from '@prisma/client';
import pubsub from 'pubsub';
import { db } from './db';
export interface Context {
  db: PrismaClient;
}
export const context = {
  db,
  pubsub: pubsub,
};
