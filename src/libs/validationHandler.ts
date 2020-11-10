import { NextFunction, Request, Response } from 'express';
export default ( config ) => ( req: Request, res: Response, next: NextFunction  ) => {
    const errors = [];
    console.log( 'Inside ValidationHandler Middleware' );
    console.log( req.body );
    console.log( req.query );
    console.log(Object.keys( req.query ).length );
    const keys = Object.keys( config );
    keys.forEach((key) => {
      const obj = config[key];
      console.log('key is' , keys);
      const values = obj.in.map( ( val ) => {
          return req[ val ][ key ];
      });
      const paramvalue = values.find((val) => {
         return isNull(val);
      });
      // Checking for In i.e Body or Query
      console.log('body is', req[obj.in]);
      console.log('body', Object.keys( req[obj.in] ).length );
      // Checking for required
      console.log('values is' , values);
      if (obj.required) {
          if (!isNull(paramvalue)) {
              errors.push({
                  message: `${key} is required`,
                  status: 404
              });
          }
      }
      if (obj.string) {
          if ( ( typeof ( paramvalue ) === 'string' ) ) {
              errors.push({
                  message: `${key} Should be a String`,
                  status: 404
              });
          }
      }
      if (obj.isObject) {
          if ( ! ( typeof ( values ) === 'object' ) ) {
              errors.push({
                  message: `${key} Should be an object`,
                  status: 404
              });
          }
      }
      if (obj.regex) {
          const regex = obj.regex;
          if (!regex.test(paramvalue)) {
              errors.push({
                  message: `${key} is not valid expression` ,
                  status: 400,
              });
          }
      }
      if (obj.default) {
          if ( paramvalue === '' ) {
             // tslint:disable-next-line:no-unused-expression
             paramvalue === obj.default;
          }
      }
      if (obj.number) {
          if (isNaN(paramvalue) || paramvalue === undefined) {
              errors.push({
                  message: `${key}  must be an number` ,
                  status: 400,
              });
          }
      }
      if (obj.custom && typeof obj.custom === 'function') {
        obj.custom(values);
    }

  });
  if (errors.length > 0) {
      res.status(400).send({ errors});
  }
  else {
      next();
  }
};

function isNull( obj ) {
  const a = ( obj === undefined || obj === null || obj === '' );
  return a;
}