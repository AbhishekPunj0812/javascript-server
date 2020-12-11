import { NextFunction, Request, Response } from 'express';
import  * as jwt from 'jsonwebtoken';
import { userModel } from '../../repositories/user/UserModel';
import config from '../../config/configuration';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';
import UserRepository from '../../repositories/user/UserRepository';
class UserController {
    instance: UserController;
    static instance: any;
    static getInstance() {
        if (UserController.instance) {
          return UserController.instance;
        }
      UserController.instance = new UserController();
        return UserController.instance;
    }
    userRepository: UserRepository = new UserRepository();


    public async get(req: IRequest, res: Response, next: NextFunction) {
      try {
        console.log('Inside get method of User Controller');
        res.send({
          message: 'User fetched successfully',
          data: [
            {
              name: 'User1'
            },
            {
                name: 'User2'
            }
          ]
        });
      }
      catch (err) {
        console.log('Inside err', err);
        next({
          error: 'Error Occured in fetching user',
          code: 500,
          message: err
        });
      }
    }
    create = async(req: IRequest, res: Response, next: NextFunction) => {
      const { id, email, name, role, password } = req.body;
      const creator = req.user._id;
      try {

        await this.userRepository.create({ id, email, name, role, password }, creator);
              res.send({
                  message: 'User Created Successfully!',
                  data: {
                      'name': name,
                      'email': email,
                      'role': role,
                      'password': password
                  },
                  code: 200
              });
      }
          catch (err) {
            next({
              error: 'Error Occured in creating user',
              code: 500,
              message: err
            });
          }

    }

    update = async(req: IRequest, res: Response, next: NextFunction) => {
      const { id, dataToUpdate } = req.body;
      const updator = req.user._id;
      try {
          await this.userRepository.updateUser( id, dataToUpdate, updator);
          res.send({
              message: 'User Updated',
              code: 200
          });
      }
      catch (err)  {
        next({
          error: 'Error Occured in updating user',
          code: 500,
          message: err
        });
      }
    }

     login = async (req: IRequest , res: Response , next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const result = await this.userRepository.findOne ( { 'email': email } );
        console.log('REsult', result);
        if ( result ) {
            if ( bcrypt.compareSync(password, result. password) ) {
                console.log('result is', result.password);
                const token = jwt.sign({
                    id: result._id,
                    email: result.email
                }, config.SECRET_KEY, {expiresIn: '15m'});
                console.log( token );
                res.status(200). send( {
                    message: 'Authorization Token',
                    data: token
                });
            }
            else {
              res.status(422).send ( {
                  message: 'password or email doesnt match',
                  status: 422
              });
            }
          } else {
                res.status(422).send ( {
                  message: ' password or email doesnt match ',
                  status: 422
                });
              }

      }
          catch ( err ) {
            next({
              error: 'Error Occured while login',
              code: 500,
              message: err
            });
          }
    }


    me (req: IRequest, res: Response, next: NextFunction) {
      delete req.user.password;
      res.json({ data: req.user, status: 200, message: 'Me'});
    }


    remove = async(req: IRequest, res: Response, next: NextFunction) => {
            const  id  = req.params.id;
            const remover = req.user._id;

            try {
                    await this.userRepository.deleteData(id, remover);
                    res.send({
                    message: 'Deleted successfully',
                    code: 200
                    });
            }
            catch (err) {
                next({
                  error: 'User not found to be deleted',
                  code: 404,
                  message: err
                });
            }
    }


}

export default  new UserController();
