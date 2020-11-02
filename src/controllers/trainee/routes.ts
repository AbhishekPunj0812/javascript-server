import { Router } from 'express';
import TraineeController from './Controller';
import validationHadler from '../../libs/validationHandler';
import validation from './validation';
const traineeRouter = Router();



traineeRouter.route('/')
    .get(validationHadler( validation.get), TraineeController.get)
    .post(validationHadler( validation.create ), TraineeController.create)
    .put(validationHadler( validation.update ), TraineeController.update)
    .delete(validationHadler( validation.delete ), TraineeController.delete);
traineeRouter.route('/:id').delete(validationHadler( validation.delete ), TraineeController.delete);


export default traineeRouter;