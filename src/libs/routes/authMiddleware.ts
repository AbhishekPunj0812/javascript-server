import  * as jwt from 'jsonwebtoken';
import { hasPermission } from '../../libs/permission';
import { permissions } from '../../libs/constants';
import { NextFunction, Request, Response } from 'express';

export default (module: string, permissionType: string ) => (req: Request, res: Response, next: NextFunction) => {
  try {

console.log('The config is', module, permissionType);
console.log('Header is', req.headers.authorization);
const token = req.headers.authorization;

const decodedUser = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456');
console.log('User', decodedUser);
if (hasPermission(module, decodedUser.role, permissionType)) {
  console.log(decodedUser.role + 'has permission' + permissionType, true);
  next();
}
else {
  throw new Error('Unauthorized');

}
if ( !decodedUser ) {
  throw error;
}

}
catch (err) {
  next({
    error: 'Unauthorized',
    code: 403
  });
  }
};