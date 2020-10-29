import { Request, Response, NextFunction } from 'express';
import { IError } from './interface';
export default(err: IError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
      }
    res.status(404).json(
        {
            error: err.error,
            message: err.message || 'error',
            status: err.code,
            timestamp: new Date()
        }
    );
};