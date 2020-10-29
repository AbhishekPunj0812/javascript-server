import{ Router } from 'express';
import{ TraineeRouter } from './controllers';

const mainRouter = Router();
mainRouter.use('./trainee', TraineeRouter);

export default mainRouter;