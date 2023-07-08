import { handlers } from './cacheValue';

const invalidateCache = async (
  handler: keyof typeof handlers,
  { key }: { key: any }
) => {
  await handlers[handler].delete(key);
};
export default invalidateCache;
