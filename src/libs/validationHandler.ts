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
      console.log('key is' , key);
      const values = obj.in.map( ( val ) => {
          return req[ val ][ key ];
      });

      // Checking for In i.e Body or Query
      console.log('body is', req[obj.in]);
      console.log('body', Object.keys( req[obj.in] ).length );
      if (Object.keys( req[obj.in] ).length === 0) {
          errors.push({
              message: `Values should be passed through ${obj.in}`,
              status: 400
          });
      }

      // Checking for required
      console.log('values is' , values);
      if (obj.required) {
          if (isNull(values[0])) {
              errors.push({
                  message: `${key} is required`,
                  status: 404
              });
          }
      }
      if (obj.string) {
          if ( !( typeof ( values[0] ) === 'string' ) ) {
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
          if (!regex.test(values[0])) {
              errors.push({
                  message: `${key} is not valid expression` ,
                  status: 400,
              });
          }
      }
      if (obj.default) {
          if ( values[0] === '' ) {
             // tslint:disable-next-line:no-unused-expression
             values[0] === obj.default;
          }
      }
      if (obj.number) {
          if (isNaN(values[0]) || values[0] === undefined) {
              errors.push({
                  message: `${key}  must be an number` ,
                  status: 400,
              });
          }
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
  const a = ( obj === undefined || obj === null );
  return a;
}