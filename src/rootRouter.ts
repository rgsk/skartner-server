import axios from 'axios';
import permissions from 'constants/permissions';
import { Request, Router } from 'express';
import environmentVars from 'lib/environmentVars';
import fileLogger from 'lib/fileLogger';
import authenticate from 'middlewares/authenticate';
import authorize from 'middlewares/authorize';
import conditionalMiddleware from 'middlewares/conditionalMiddleware';
import { bullMonitorExpress } from 'queues';
import generalRouter from 'routers/generalRouter';
import jsonDataRouter from 'routers/jsonDataRouter';
import sampleRouter from 'routers/sampleRouter';
const rootRouter = Router();

rootRouter.use('/sample', sampleRouter);
rootRouter.use('/jsonData', jsonDataRouter);
rootRouter.use('/general', generalRouter);

rootRouter.get('/', async (req, res, next) => {
  res.json({
    message: `REST: Server is running on PORT: ${environmentVars.PORT}`,
  });
});
rootRouter.post('/', async (req, res, next) => {
  res.json(req.body);
});
rootRouter.post('/log', async (req, res, next) => {
  fileLogger.logToJsFile(req.body);
  res.json({ message: 'logged', data: req.body });
});

async function getLatLngFromAddress(pincode: string, country: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const encodedAddress = encodeURIComponent(`${pincode},${country}`);

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    fileLogger.logToJsFile(response.data);
    const result = response.data.results[0];

    if (result) {
      const { lat, lng } = result.geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw error;
  }
}

rootRouter.get('/places', async (req, res, next) => {
  let { input, pincode, location } = req.query;
  const country = 'IN';
  if (!location) {
    const { latitude, longitude } = await getLatLngFromAddress(
      pincode as string,
      country
    );
    location = `${latitude},${longitude}`;
  }
  console.log(location);
  const params = {
    input: input,
    location: location,
    radius: 1000,
    strictbounds: true,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const searchParams = new URLSearchParams(params as any);
  const url = new URL(
    'https://maps.googleapis.com/maps/api/place/autocomplete/json'
  );
  url.search = searchParams.toString();
  const response = await axios.get(url.href);
  res.json(response.data);
});

rootRouter.get('/pincode/:pincode', async (req, res, next) => {
  const { pincode } = req.params;
  const url = `https://api.postalpincode.in/pincode/${pincode}`;
  const response = await axios.get(url);
  res.json(response.data);
});

const condition = (req: Request) => {
  return req.path === '/' && req.method === 'GET';
};
(async () => {
  await bullMonitorExpress.init();
  rootRouter.use(
    '/queues',
    conditionalMiddleware(condition, authenticate),
    conditionalMiddleware(
      condition,
      authorize(permissions['Access Bull Monitor'].key)
    ),
    bullMonitorExpress.router
  );
})();

export default rootRouter;
