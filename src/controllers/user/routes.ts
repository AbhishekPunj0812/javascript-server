import { Router } from 'express';
import UserController from './Controller';
import validation from '../user/validation';
import { authMiddleware } from '../../libs/routes';
import validationHandler from '../../libs/validationHandler';
const userRouter: Router = Router();

/**
 * @swagger
 *
 *  definitions:
 *      me:
 *        type: object
 *        properties:
 *          data:
 *              _id:
 *                  type: string
 *                  example: 5fc0831e23a1643be0d2317c
 *              email:
 *                  type: string
 *                  example: abhi.punj@successive.tech
 *              name:
 *                  type: string
 *                  example: Abhi Punj
 *              role:
 *                  type: string
 *                  example: Trainee
 *              originalId:
 *                  type: string
 *                  example: 5fc0831e23a1643be0d2317c
 *              createdBy:
 *                  type: string
 *                  example: 5fbdf53ac2f34b17040e4663
 *              createdAt:
 *                  type: string
 *                  example: 2020-11-27T04:39:58.761Z
 *              _v:
 *                  type: number
 *                  example: 0
 *          message:
 *              type: string
 *              example: Me
 *          status:
 *              type: string
 *              example: OK
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: trainee@successive.tech
 *          password:
 *              type: string
 *              example: training@123
 *      Token:
 *           type: object
 *           properties:
 *               status:
 *                   type: string
 *                   example: Ok
 *               message:
 *                   type: string
 *                   example: Authorization Token
 *               data:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5laGEuZ29lbEBzdWNjZXNzaXZlLnRlY2giLCJpZCI6IjVlNGEzNmJjNjQ4MjRiMWY4MGI3MzBjZCIsImlhdCI6MTU4MjU0OTIyN30.cFV6YYlfmhJ1yL3GyIIgb-PjMTpDNVICd5KGi1ENpVI
 */


userRouter.route('/')
.get(authMiddleware('getUser', 'read'), validationHandler(validation.get), UserController.get)
.post(authMiddleware('getUser', 'write'), validationHandler(validation.create), UserController.create)
.put(authMiddleware('getUser', 'write'), validationHandler(validation.update), UserController.update);



userRouter.get('/', authMiddleware('getUser', 'get'), validationHandler(validation.get) );

userRouter.route('/:id').delete(authMiddleware('getUser', 'delete'), validationHandler(validation.delete), UserController.remove);

/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     description: Current user Details.
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *             $ref: '#/definitions/me'
 */

userRouter.route('/me')
.get(authMiddleware('getUser', 'read'), UserController.me);
/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     description: Login Credentials
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User email and password
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *              $ref: '#/definitions/Token'
 *       422:
 *         description: invalid email or password
 *         schema:
 *          oneOf:
 *          properties:
 *              status:
 *                  type: number
 *                  example: "200"
 *              message:
 *                  type: string
 *                  example: Password or email does not match
 *              err:
 *                  type: string
 *                  example: Password is incorrect
 */

userRouter.route('/login')
.post(validationHandler(validation.login), UserController.login);

export default userRouter;