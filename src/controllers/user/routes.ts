import { Router } from 'express';
import UserController from './Controller';
import validation from './validation';
import validationHandler from '../../libs/validationHandler';
const userRouter: Router = Router();

userRouter.route('/')
.get(validationHandler( validation.get), UserController.get)
.post( validationHandler( validation.create ), UserController.create)
.put(validationHandler(validation.update ), UserController.update);
 userRouter.route('/:id').delete(validationHandler( validation.delete ), UserController.delete);
export default userRouter;