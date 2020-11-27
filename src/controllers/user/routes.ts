import { Router } from 'express';
import UserController from './Controller';
import validation from '../user/validation';
import { authMiddleware } from '../../libs/routes';
import validationHandler from '../../libs/validationHandler';
const userRouter: Router = Router();

userRouter.route('/')
.get(authMiddleware('getUser', 'read'), validationHandler( validation.get), UserController.get)
.put(authMiddleware('getUser', 'write'), validationHandler(validation.update ), UserController.update);

userRouter.get('/getall', authMiddleware('getUser', 'all'), validationHandler(validation.get), UserController.getAll);

userRouter.route('/create')
.post(authMiddleware('getUser', 'write'), validationHandler( validation.create ), UserController.create);

userRouter.route('/:id').delete(authMiddleware('getUser', 'delete'), validationHandler( validation.delete ), UserController.delete);

userRouter.route('/me')
.get(authMiddleware('getUser', 'read'), validationHandler( validation.get), UserController.me);

userRouter.route('/login')
.post(validationHandler(validation.login), UserController.login);

 export default userRouter;