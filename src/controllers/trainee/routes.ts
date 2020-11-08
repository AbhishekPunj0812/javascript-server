import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
const traineeRouter = Router();



traineeRouter.route('/')
    .get(validationHandler( validation.get), TraineeController.get)
    .post(validationHandler( validation.create ), TraineeController.create)
    .put(validationHandler( validation.update ), TraineeController.update)
    .delete(validationHandler( validation.delete ), TraineeController.delete);
traineeRouter.route('/:id').delete(validationHandler( validation.delete ), TraineeController.delete);


export default traineeRouter;