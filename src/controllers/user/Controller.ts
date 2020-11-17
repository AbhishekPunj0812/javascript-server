import { NextFunction, Request, Response } from 'express';
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