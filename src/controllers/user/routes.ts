import { Router } from 'express';
import UserController from './Controller';
import validation from '../user/validation';
import { authMiddleware } from '../../libs/routes';
import validationHandler from '../../libs/validationHandler';
const userRouter: Router = Router();

userRouter.route('/')
.get(validationHandler( validation.get), UserController.get)
.post( validationHandler( validation.create ), UserController.create)
.put(validationHandler(validation.update ), UserController.update);
 userRouter.route('/:id').delete(validationHandler( validation.delete ), UserController.remove);

//  userRouter.route('/me')
//  .get(authMiddleware ( validation.get, 'all'), UserController.me);
 userRouter.route('/me');
 // .get(authMiddleware ( validation.get, 'all'), UserController.me);
 userRouter.route('/login')
 .post(validationHandler(validation.login), UserController.login);
export default userRouter;