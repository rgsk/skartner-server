import { Router } from 'express';
import { bullMonitorExpress } from 'queues';

const rootRouter = Router();

rootRouter.get('/', async (req, res, next) => {
  res.json({ message: 'skartner-server is working' });
});
rootRouter.post('/', async (req, res, next) => {
  res.json(req.body);
});

(async () => {
  await bullMonitorExpress.init();
  rootRouter.use('/queues', bullMonitorExpress.router);
})();

export default rootRouter;
