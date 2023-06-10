import { RedisPubSub } from 'graphql-redis-subscriptions';
import environmentVars from 'lib/environmentVars';

const redisUrl = environmentVars.REDIS_URL!;

const pubsub = new RedisPubSub({ connection: redisUrl });

export default pubsub;
