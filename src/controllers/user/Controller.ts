import { NextFunction, Request, Response } from 'express';
import  * as jwt from 'jsonwebtoken';
import { userModel } from '../../repositories/user/UserModel';
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

    get(req: Request, res: Response, next: NextFunction): void {
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

    create(req: Request, res: Response, next: NextFunction) {
      try {
        console.log('Inside post method of User Controller');
        res.send({
          message: 'User created successfully',
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

    update(req: Request, res: Response, next: NextFunction) {
      try {
        console.log('Inside update method of User Controller');

      res.send({
          message: 'User updated successfully',
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

    login(req: Request , res: Response , next: NextFunction) {
      try { const { email, password } = req.body;
      userModel.findOne ( { email }, (err, result) => {
          if ( result ) {
              if ( password === result.password ) {
                  console.log('result is', result.password);
                  const token = jwt.sign({
                      result
                  }, config.SECRET_KEY);
                  console.log( token );
                  res. send( {
                      data: result,
                      message: 'Login Permitted',
                      status: 200
                  });
              }
              else {
                  res.send ( {
                      message: 'id doesnt match',
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
    me( req: Request, res: Response, next: NextFunction) {
        res.json( {
            // data
        });
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