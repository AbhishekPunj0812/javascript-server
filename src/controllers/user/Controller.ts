import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import IRequest from '../../libs/routes/IRequest';
import { error } from 'console';

class TraineeController {
    instance: TraineeController;
    static instance: any;
  static getInstance() {
      if (TraineeController.instance) {
        return TraineeController.instance;
      }
    TraineeController.instance = new TraineeController();
      return TraineeController.instance;
    }

    public async getAll(req: IRequest, res: Response, next: NextFunction) {

      let skip: number;
      let limit: number;
      let sort: boolean;
      let search: string = '';

        limit = ('limit' in req.query) ? Number(req.query.limit) : 10;

        skip = ('skip' in req.query) ? Number(req.query.skip) : 0;

        sort = ('sort' in req.query) ? Boolean(req.query.sort) : false;

      if ('search' in req.query) {
          search = req.query.search;
      }

      const query: any = {
          deletedAt: { $exists: false },
          updatedAt: { $exists: false },
          role: 'trainee',
          $or: [
              {
                  name: {
                      $regex: search,
                      $options: 'i'
                  }
              },
              {
                  email: {
                      $regex: search,
                      $options: 'i'
                  }
              }
          ]
      };

      const options: any = {
          skip: skip,
          limit: limit
      };

      let sortQuery: any;

      if (sort) {
          sortQuery = {
              name: 1,
              email: 1
          };
      }
      else {
          sortQuery = {
              createdAt: -1
          };
      }

      const user = new UserRepository();
      try {
        const data = await user.getallTrainee(query, options, sortQuery);

        res.status(200).send({
          message: 'Trainees fetched successfully',
          Trainees: {
            data : {
              count : data[1],
              records : data[0]
            }
          }
        });
      }
          catch (err) {
              next({
                  message: 'Trainee Not Found',
                  status: 404,
                  error: err
              });
          }
      }

    public async create(req: IRequest, res: Response, next: NextFunction) {
      const {  name, email, role, password } = req.body;
      const user = new UserRepository();
      const creator = req.user._id;
              try {
                await user.create({  name, email, role, password }, creator);

                res.status(200).send({
                    message: 'Trainee Created Successfully!',
                    data: {
                        'name': name,
                        'email': email,
                        'role': role
                    },
                    code: 200
                });
              }
              catch (err) {
                  next({
                      message: 'User not created',
                      code: 404,
                      error: err
                  });
              }
      }
      public async update(req: IRequest, res: Response, next: NextFunction) {
        const { id, dataToUpdate } = req.body;
        const user = new UserRepository();
        const updator = req.user._id;
            try {
              const result = await user.updateUser(id, dataToUpdate, updator);
              if (result !== undefined) {
                res.status(200).send({
                  message: 'Trainee Updated Successfully',
                  data: {
                    'id': id
                  }
                });
              }
              else {
                res.send(404).send( {
                  message: 'Record not found',
                  code: 404
                });
              }
            }
            catch (err) {
                next({
                    message: 'User Not Found for update',
                    code: 404,
                    error: err
                });
            }
        }

        public async delete(req: IRequest, res: Response, next: NextFunction) {
          const id = req.params.id;
          const user = new UserRepository();
              try {
                const deletor = req.user._id;
                const result = await user.delete(id, deletor);
                if (result !== undefined) {
                  res.send({
                    message: 'Trainee Deleted Successfully',
                    code: 200,
                    data: result
                });
                }
                else {
                  res.send({
                    message: 'Record does not exist in DB',
                    code: 404
                  });
                }

              }
              catch (err) {
                  next({
                      message: 'User not found to be deleted',
                      code: 404,
                      error: err
                  });
              }
        }

}

  export default  new TraineeController();
