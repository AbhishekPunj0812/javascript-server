import * as express from 'express';
import * as bodyParser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import routes from './router';
import Database from './libs/Database';
class Server {
    app;
    constructor(private config) {
         this.app = express();
    }
    bootstrap() {
        this.initBodyParser();
    this.setupRoutes();
    return this;
    }
    public setupRoutes() {
         const { app } = this;
         app.use('/health-check', ( req, res, next) => {
              res.send('I am Ok');
        });
         this.app.use('/api', routes);
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
         return this;
    }
    public initBodyParser() {
        this.app.use(bodyParser.json());
    }
    run() {
        const { app, config: { PORT } } = this;
        Database.open(this.config.MONGO_URL)
        .then((res) => {
            console.log('Successfully connected to Mongo');
        } );
        app.listen(PORT , ( err )  => {
            if ( err ) {
                 console.log( err );
            }
            console.log('App is running on port : ' + PORT );
        });
         Database.disconnect();
    }
}
export default Server;