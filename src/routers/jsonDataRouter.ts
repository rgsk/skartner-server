import { db } from 'db';
import { Router } from 'express';
import { z } from 'zod';

const jsonDataRouter = Router();
const zodSchema = z.object({
  key: z.string(),
});

jsonDataRouter.get('/:key', async (req, res, next) => {
  try {
    const { key } = zodSchema.parse(req.params);
    const jsonData = await db.jsonData.findFirst({
      where: { key: key },
    });
    res.json(jsonData);
  } catch (err) {
    next(err);
  }
});
jsonDataRouter.post('/:key', async (req, res, next) => {
  try {
    const { key } = zodSchema.parse(req.params);
    const value = req.body;
    const jsonData = await db.jsonData.findFirst({ where: { key } });
    if (!jsonData) {
      const createdJsonData = await db.jsonData.create({
        data: {
          key,
          value,
        },
      });
      res.json(createdJsonData);
    }
    const updatedJsonData = await db.jsonData.update({
      where: { key },
      data: {
        value,
      },
    });
    res.json(updatedJsonData);
  } catch (err) {
    next(err);
  }
});
export default jsonDataRouter;
