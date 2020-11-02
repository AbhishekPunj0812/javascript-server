import { Request, Response, NextFunction } from 'express';
function checkRegex(stringtovalidate: string, regex: RegExp): boolean {
    return regex.test(stringtovalidate);
}
export default ( config ) => (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(config);
    const body = Object.keys(req.body).length;
    const params = Object.keys(req.query).length;
    const query = Object.keys(req.query).length;
    keys.forEach((key) => {
        const item = config[key];
        const value = item.in.map((val) => {
            return req[val][key];
        });
        console.log(value);
        console.log(req.method);
        if (item && item.required) {
            if (req.method === 'POST' || req.method === 'PUT') {
                if (body !== keys.length) {
                    next({
                        error: item.errorMessage,
                        message: 'data is missing ',
                        status: 404
                    });
                }
            }
            if (req.method === 'GET') {
                if (query !== keys.length) {
                    next({
                        error: item.errorMessage,
                        message: 'data is missing ',
                        status: 404
                    });
                }
            }
            if (req.method === 'DELETE') {
                if (params !== keys.length) {
                    console.log(keys.length);
                    next({
                        error: item.errorMessage,
                        message: 'data is missing ',
                        status: 404
                    });
                }
            }
            if (req.method === 'DELETE') {
                next({
                    error: item.errorMessage,
                    message: 'Id is required',
                    status: 404
                });
            }
            if (item.string) {
                if (!('string' === typeof value[0])) {
                    next({
                        error: item.errorMessage,
                        message: `${key} is not string type`,
                        status: 400,
                    });
                }
            }
            if (item.number) {
                if (isNaN(value[0])) {
                    next({
                        error: item.errorMessage,
                        message: `${key} is not number type`,
                        staus: 400,
                    });
                }
            }
            if (item.regex) {
                const flag = checkRegex(value[0], /^[A-Za-z]+$/);
                console.log(flag);
                if (!flag) {
                    next({
                        error: item.errorMessage,
                        message: 'name can only consist of alphabets ' ,
                        status: 400,
                    });
                }
            }
        }
        else if (!item.required) {
            if (item.number) {
                if (value[0] === '') {
                    console.log(key + ' = ', item.default);
                }
            }
        }
    });
    next();

};