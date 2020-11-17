import { Router } from 'express';
import { TraineeRouter }  from './controllers/trainee';
import { userRouter }  from './controllers/user';

const mainRouter = Router();

mainRouter.use('/trainee', TraineeRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;