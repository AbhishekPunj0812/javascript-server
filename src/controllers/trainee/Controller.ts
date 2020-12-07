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
    userRepository: UserRepository = new UserRepository();

    getAll = async(req: IRequest, res: Response, next: NextFunction) => {

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

      let countQuery: any = {role: 'trainee'};
      if (search) {
          countQuery = {
            ...countQuery,
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
            }]
          };
      }
      try {
        const data = await this.userRepository.find(query, {}, {} ).skip(skip).limit(limit).sort(sortQuery);
        const count = await this.userRepository.count(countQuery );
        res.status(200).send({
          message: 'Trainees fetched successfully',
          Trainees: {
            data : {
              count ,
              records : data
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
              const result = await this.userRepository.updateUser(id, dataToUpdate, updator);
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

        delete = async(req: IRequest, res: Response, next: NextFunction) => {
          const id = req.params.id;
              try {
                const deletor = req.user._id;
                const result = await this.userRepository.delete(id, deletor);
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