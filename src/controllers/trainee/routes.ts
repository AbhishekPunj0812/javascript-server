import { Router } from 'express';
// import config  from './validation';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';

import TraineeController from './Controller';

const TraineeRouter = Router();

TraineeRouter.route('/')
    .get(validationHandler(validation.get), TraineeController.get)
    .post(validationHandler(validation.create), TraineeController.create)
    .put(validationHandler(validation.update), TraineeController.update)
    .delete(validationHandler(validation.delete), TraineeController.delete);

    export default TraineeRouter;