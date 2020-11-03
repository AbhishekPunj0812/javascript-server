import  * as jwt from 'jsonwebtoken';
export default (module, permissionType ) => (req, res, next) => {
  try {
console.log('The config is', module, permissionType);
console.log('Header is', req.headers.authorization);
const token = req.headers.authorization;
const decodedUser = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456');
console.log('User', decodedUser);
next();
}
catch (err) {
  next({
    error: 'Unauthorized',
    code: 403
  });
  }
};