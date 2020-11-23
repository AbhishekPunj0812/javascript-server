import  * as jwt from 'jsonwebtoken';
import { hasPermission } from '../../libs/permission';
import { permissions } from '../../libs/constants';
import { config } from '../../config';
import IRequest from '../../IRequest';
import { NextFunction, Request, Response } from 'express';
import { userModel } from '../../repositories/user/UserModel';

export default (module: string, permissionType: string ) => (req: IRequest, res: Response, next: NextFunction) => {
  try {

console.log('The config is', module, permissionType);
console.log('Header is', req.headers.authorization);
const token = req.headers.authorization;
const decodedUser = jwt.verify(token, config.SECRET_KEY);
console.log('User', decodedUser, decodedUser.role);
if ( !decodedUser ) {
  throw new Error('Unauthoriesd');

}

userModel.findOne({ email: decodedUser.email }, (err, result) => {
  console.log(result);
  if (!result) {
      return next({
          error: 'User not existing in db',
          code: 403
      });
  }
  if (hasPermission(module, decodedUser.role, permissionType)) {
    console.log(decodedUser.role + 'has permission' + permissionType, true);
    req.user = decodedUser;
    next();
  }
  else {
    console.log('error');
    throw new Error('Unauthorized');

  }
});
}
catch (err) {
  next({
    error: 'Unauthorized',
    code: 403
  });
  }
};