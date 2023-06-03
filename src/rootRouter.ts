import { Router } from 'express';

const rootRouter = Router();

rootRouter.get('/', async (req, res, next) => {
  res.json({ message: 'skartner-server is working' });
});
rootRouter.post('/', async (req, res, next) => {
  res.json(req.body);
});
export default rootRouter;
