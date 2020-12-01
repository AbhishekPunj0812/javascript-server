import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
const traineeRouter = Router();
import  authMiddleware from '../../libs/routes/authMiddleware';


traineeRouter.route('/')
    .get(authMiddleware('getUser', 'read'), validationHandler( validation.get), TraineeController.getAll)
    .post(authMiddleware('getUser', 'write'), validationHandler( validation.create ), TraineeController.create)
    .put(authMiddleware('getUser', 'update'), validationHandler(validation.update ), TraineeController.update);
    traineeRouter.route('/:id').delete(validationHandler( validation.delete ), TraineeController.delete);



export default traineeRouter;