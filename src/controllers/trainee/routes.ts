import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware from '../../libs/routes/authMiddleware';
const traineeRouter = Router();

/**
 * @swagger
 *   
 *  definitions:
 *      TraineePost:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: abhi.punj@successive.tech
 *          name:
 *              type: string
 *              example: Abhi Punj
 *          password:
 *              type: string
 *              example: Abhi@123
 *          role:
 *               type: string
 *               example: trainee
 *      TraineeResponse:
 *        type: object
 *        properties:
 *          _id:
 *              type: string
 *              example: 5e4a36bc64824b1f80b730cd
 *          email:
 *              type: string
 *              example: abhi.punj@successive.tech
 *          name:
 *              type: string
 *              example: Abhi Punj
 *          role:
 *              type: string
 *              example: trainee
 *          originalId:
 *              type: string
 *              example: 5e4a36bc64824b1f80b730cd
 *          createdBy:
 *              type: string
 *              example: 5e45404398e86d576ad964e6
 *          createdAt:
 *              type: string
 *              example: 2020-02-20T11:33:39.325Z
 *          v:
 *              type: number
 *              example: 0
 *      Unauthorized:
 *        type: object
 *        properties:
 *          error:
 *              type: string
 *              example: Unauthorized
 *          message:
 *              type: string
 *              example: Token not found
 *          status:
 *              type: number
 *              example: 403
 *          timestamp:
 *               type: string
 *               example: 2020-11-25T17:34:37.066Z
 *
 */


traineeRouter.route('/')
/**
 * @swagger
 *
 * /api/trainee:
 *   get:
 *     description: List of all the trainees
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Trainee
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: skip
 *         description: Number of elements to skip
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: number of elements to show
 *         in: query
 *         required: false
 *         type: number
 *       - name: sort
 *         description: Show in Order
 *         in: query
 *         required: false
 *         type: number
 *       - name: search
 *         description: Element to search(name or email)
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Trainee List
 *         schema:
 *              properties:
 *                  status:
 *                      type: string
 *                      example: 200 OK
 *                  message:
 *                      type: string
 *                      example: 'successfully fetched Trainee'
 *                  Count:
 *                      type: number
 *                      example: 5
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .get(authMiddleware('getUser', 'read'), validationHandler( validation.get), TraineeController.getAll)
/**
 * @swagger
 *
 * /api/trainee:
 *   post:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on creation
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: Data of users.
 *         in: query
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/TraineeCreate'
 *     responses:
 *       200:
 *         description: User Created Successfully
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      type: string
 *                      example: OK
 *                  message:
 *                      type: string
 *                      example: Trainee Created Successfully
 *                  data:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/definitions/TraineeResponse'
 *                      properties:
 *                              name:
 *                                  type: string
 *                                  example: "Abhishek"
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .post(authMiddleware('getUser', 'write'), validationHandler( validation.create ), TraineeController.create)
/**
 * @swagger
 *
 * /api/trainee:
 *   put:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on Updation
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: Data of users.
 *         in: query
 *         required: true
 *         type: object
 *         schema:
 *          oneOf:
 *          properties:
 *              dataToUpdate:
 *                  type: string
 *                  example: 5e4e6e93c095d84d34045a30
 *                  allOf:
 *                      - $ref: '#/definitions/TraineePost'
 *     responses:
 *       200:
 *         description: User Updated Successfully
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      type: string
 *                      example: OK
 *                  message:
 *                      type: string
 *                      example: successfully upddate
 *                  data:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .put(authMiddleware('getUser', 'update'), validationHandler(validation.update ), TraineeController.update);
/**
 * @swagger
 *
 * /api/trainee/{id}:
 *   delete:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on deletion
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: OriginalID of user to be deleted.
 *         in: path
 *         required: true
 *         type: string
 *         example: 5e4e6e93c095d84d34045a30
 *     responses:
 *       200:
 *         description: Data to be deleted
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      type: string
 *                      example: OK
 *                  message:
 *                      type: string
 *                      example: Trainee deleted successfully!
 *                  code:
 *                      type: number
 *                      example: 200
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    traineeRouter.route('/:id').delete(authMiddleware('getUser', 'delete'), validationHandler( validation.delete ), TraineeController.delete);



export default traineeRouter;