import  * as jwt from 'jsonwebtoken';
import { hasPermission } from '../../libs/permission';
import { permissions } from '../../libs/constants';
import UserRepository from '../../repositories/user/UserRepository';
import { config } from '../../config';
import IRequest from '../../libs/routes/IRequest';
import { NextFunction, Request, Response } from 'express';

export default (module: string, permissionType: string ) => async (req: IRequest, res: Response, next: NextFunction) => {
  try {
      // tslint:disable-next-line: new-parens
      const userRepository = new UserRepository;
      console.log('The config is', module, permissionType);
      console.log('Header is', req.headers.authorization);
      const token = req.headers.authorization;
      const decodedUser = jwt.verify(token, config.SECRET_KEY);
      console.log('User', decodedUser, decodedUser.role);
      if ( !decodedUser ) {
        throw new Error('Unauthoriesd');
      }

      const result = await userRepository.findOne({ email: decodedUser.email });
          console.log(result);
          if (!result) {
              return next({
                  error: 'User not existing in db',
                  code: 403
              });
          }
          if (hasPermission(module, result.role, permissionType)) {
            console.log(result.role + 'has permission' + permissionType, true);
            req.user = result;
            next();
          }
          else {
            console.log('error');
            throw new Error('Unauthorized');
          }
  }
  catch (err) {
    next({
      error: 'Unauthorized',
      code: 403
    });
  }
};