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

    public async get(req: IRequest, res: Response, next: NextFunction) {
      try {
        console.log('Inside get method of User Controller');
      res.send({
          message: 'User fetched successfully',
          data: [
            {
              name: 'User1',
            },
            {
                name: 'User2',
            }
          ]
        });
      } catch (err) {
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

      if ('limit' in req.query) {
          limit = Number(req.query.limit);
      } else {
          limit = 10;
      }
      if ('skip' in req.query) {
          skip = Number(req.query.limit);
      } else {
          skip = 0;
      }
      if ('sort' in req.query) {
          sort = true;
      } else {
          sort = false;
      }

      const user = new UserRepository();
      await user.getallTrainee(skip, limit, sort)
      .then((data) => {
          res.status(200).send({
              message: 'Trainees fetched successfully',
              'count': data[1],
              'data':   data
          });
      })
      .catch((err) => {
          res.send({
              message : 'Unable to fetch Trainees',
              status : 404
          });
      });
  }

    public async create(req: IRequest, res: Response, next: NextFunction) {
      const { id, email, name, role, password } = req.body;
      const creator = req.user._id;

      const user = new UserRepository();
      await user.create({ id, email, name, role, password }, creator);
              res.send({
                  message: 'User Created Successfully!',
                  data: {
                      // 'id': id,
                      'name': name,
                      'email': email,
                      'role': role,
                      'password': password
                  },
                  code: 200
              });
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
        res.send({
            error: 'User Not Found for update',
            code: 404
        });
    }
}

    login(req: IRequest , res: Response , next: NextFunction) {
      try { const { email, password } = req.body;
      userModel.findOne ( { email }, (err, result) => {
          if ( result ) {
              if ( password === config.Password ) {
                  console.log('result is', result.password);
                  const token = jwt.sign({
                      ...result.toObject()
                  }, config.SECRET_KEY, {expiresIn: Math.floor(Date.now() / 1000) + (15 * 60)});
                  console.log( token );
                  res. send( {
                      data: { ...result.toObject(), token },
                      message: 'Login Permitted',
                      status: 200
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
      });
      }
      catch ( err ) {
          res.send( err );
      }

    }
    me (req: IRequest, res: Response, next: NextFunction) {
      res.json(req.user);
    }


    public async remove(req: IRequest, res: Response, next: NextFunction) {
      const  id  = req.params.id;
      const remover = req.userData._id;
      const user = new UserRepository();
      try {
      await user.deleteData(id, remover);
              res.send({
              message: 'Deleted successfully',
              code: 200
          });
      }
      catch (err) {
          res.send({
              message: 'User not found to be deleted',
              code: 404
          });
      }
  }


   delete(req: Request , res: Response , next: NextFunction) {
      try {
        console.log('User delete method of Trainee Controller');
        res.send({
          message: 'User deleted successfully',
          data: [
            {
                name: 'User1',
              },
              {
                  name: 'User2',
              }
          ]
        });
      } catch (err) {
        console.log('Inside err', err);
      }
    }

  }

  export default  new UserController();