import { handlers } from './cacheValue';

const invalidateManyCache = async (
  handler: keyof typeof handlers,
  { keys }: { keys: any[] }
) => {
  await handlers[handler].deleteMany?.(keys);
};
export default invalidateManyCache;
