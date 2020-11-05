import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
const traineeRouter = Router();
import  authMiddleWwre from '../../libs/routes/authMiddleware';


traineeRouter.route('/')
    .get(authMiddleWwre('getUser', 'read'), validationHandler( validation.get), TraineeController.get)
    .post(authMiddleWwre('getUser', 'write'), validationHandler( validation.create ), TraineeController.create)
    .put(authMiddleWwre('getUser', 'update'), validationHandler(validation.update ), TraineeController.update)
    .delete(authMiddleWwre('getUser', 'delete'), validationHandler( validation.delete ), TraineeController.delete);
// traineeRouter.route('/:id').delete(validationHandler( validation.delete ), TraineeController.delete);


export default traineeRouter;