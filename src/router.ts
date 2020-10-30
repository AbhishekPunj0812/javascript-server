import { Router } from 'express';
import traineeRouter  from './controllers/trainee/routes';

const mainRouter = Router();

mainRouter.use('/trainee', traineeRouter);

export default mainRouter;