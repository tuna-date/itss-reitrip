import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models/index';
import router from './api/routes/index';

const bootstrap = async () => {
  // Init connection for database
  await sequelize.sync();

  const app = express();
  const port = process.env.SERVER_API_PORT || 8080;
  app.use(bodyParser.json());
  app.use(cors());

  // Attach defined routes to app
  app.use('/api', router);

  app.listen(port, () => console.info(`\nApp is listening on port ${port}!`));
};

bootstrap();
