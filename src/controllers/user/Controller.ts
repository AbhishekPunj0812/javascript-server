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
    public async getAll(req: IRequest, res: Response, next: NextFunction) {

      let skip: number;
      let limit: number;
      let sort: boolean;

      limit = ('limit' in req.query) ? Number(req.query.limit) : 10;

      skip = ('skip' in req.query) ? Number(req.query.skip) : 0;

      sort = ('sort' in req.query) ? Boolean(req.query.sort) : false;

      try {
        const user = new UserRepository();
        const data = await user.getall(skip, limit, sort);
            res.status(200).send({
                message: 'Trainees fetched successfully',
                trainee: {
                'count': data[1],
                'data':   data[0]
                }
            });

      }
      catch (err) {
          next({
              error : 'Unable to fetch Trainees',
              code : 404,
              message : err
          });
      }
    }

    public async create(req: IRequest, res: Response, next: NextFunction) {
      const { id, email, name, role, password } = req.body;
      const creator = req.user._id;
      try {
        const user = new UserRepository();
        await user.create({ id, email, name, role, password }, creator);
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

    public async update(req: IRequest, res: Response, next: NextFunction) {
      const { id, dataToUpdate } = req.body;
      const updator = req.user._id;
      const user = new UserRepository();
      try {
          await user.updateUser( id, dataToUpdate, updator);
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

    public async login(req: IRequest , res: Response , next: NextFunction) {
      try {
        const { email, password } = req.body;
        const result = await this.userRepository.findOne ( { 'email': email } );
        if ( result ) {
            if ( bcrypt.compareSync(req.body.password, result. password) ) {
                console.log('result is', result.password);
                const token = jwt.sign({
                    id: result._id,
                    email: result.email
                }, config.SECRET_KEY);
                console.log( token );
                res.status(200). send( {
                    message: 'Authorization Token',
                    data: token
                });
            }
            else {
              res.send ( {
                  message: "password doesn't match",
                  status: 400
              });
            }
          } else {
                res.send ( {
                  message: ' Email is not registered ',
                  status: 404
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
        res.json(req.user);
    }
    public async search(req: IRequest, res: Response, next: NextFunction) {
      const searchField = req.query.srch;
      const user = new UserRepository();
      user.find({
          '$or': [
              {name: {$regex: searchField, $options: '$i' } },
              {email: {$regex: searchField, $options: '$i'} }
          ]
      })

      .then ( data => {
          res.send(data);
      })

      .catch ((err) => {
          res.send({
              message: 'no results',
              code: 404
          });
      });
    }

    public async remove(req: IRequest, res: Response, next: NextFunction) {
            const  id  = req.params.id;
            const remover = req.user._id;
            const user = new UserRepository();
            try {
                    await user.deleteData(id, remover);
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


    delete(req: Request , res: Response , next: NextFunction) {
          try {
              console.log('User delete method of Trainee Controller');
              res.send({
                  message: 'User deleted successfully',
                  data: [ { name: 'User1'}, {name: 'User2'} ]
              });
          }
          catch (err) {
                  console.log('Inside err', err);
          }
    }

}

export default  new UserController();
