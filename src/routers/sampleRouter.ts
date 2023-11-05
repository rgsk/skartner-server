import { Router } from 'express';
import cacheValue from 'lib/cache/cacheValue';
import invalidateCache from 'lib/cache/invalidateCache';
import useCache from 'lib/cache/useCache';
import { getProps } from 'middlewareProps';
import { Middlewares } from 'middlewares';
import authenticate from 'middlewares/authenticate';

const sampleRouter = Router();
sampleRouter.get('/', async (req, res, next) => {
  res.json({ message: 'sample route get' });
});

sampleRouter.get('/user', authenticate, async (req, res, next) => {
  const { user } = getProps<Middlewares.Authenticate>(
    req,
    Middlewares.Keys.authenticate
  );

  res.json({ user });
});

sampleRouter.post('/', async (req, res, next) => {
  res.json({ message: 'sample route post' });
});

const numbers: number[] = [];

sampleRouter.get('/numbers', async (req, res, next) => {
  const nos = await cacheValue('db', {
    key: 'numbers',
    getValue: async (previousCachedValue) => {
      console.log('getNumbers called /numbers');
      return numbers;
    },
  });
  res.json({ numbers: nos });
});
sampleRouter.post('/numbers', async (req, res, next) => {
  numbers.push(numbers.length);
  invalidateCache('db', { key: 'numbers' });
  res.json({ numbers });
});

const numbersCache = useCache('redis', 'numbers');

sampleRouter.get('/numbers-2', async (req, res, next) => {
  const nos = await numbersCache.get({
    getValue: async (previousCachedValue) => {
      console.log('getNumbers called /numbers-2');
      return numbers;
    },
  });
  res.json({ numbers: nos });
});
sampleRouter.post('/numbers-2', async (req, res, next) => {
  numbers.push(numbers.length);
  numbersCache.invalidate();
  res.json({ numbers });
});

export default sampleRouter;
