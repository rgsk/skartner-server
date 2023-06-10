import pubsub from 'pubsub';
import { db } from './db';
export const context = {
  db,
  pubsub: pubsub,
};
export type Context = typeof context;
