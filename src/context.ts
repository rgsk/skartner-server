// api/context.ts
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import pubsub from 'pubsub';
import { db } from './db';
export interface Context {
  db: PrismaClient;
  pubsub: PubSub;
}
export const context = {
  db,
  pubsub: pubsub,
};
