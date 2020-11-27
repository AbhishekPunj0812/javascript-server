import * as express from 'express';
import * as bodyParser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import routes from './router';
import Database from './libs/Database';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';
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
    initSwagger = () => {
        const options = {
            definition: {
                info: {
                    title: 'JavaScript-Server API Swagger',
                    version: '1.0.0',
                },
                securityDefinitions: {
                    Bearer: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'headers'
                    }
                }
            },
            basePath: '/api',
            swagger: '4.1',
            apis: ['./src/controllers/**/routes.ts'],
        };
        const swaggerSpec = swaggerJsDoc(options);
        return swaggerSpec;
    }
    public setupRoutes() {
        const { app } = this;
        app.use('/health-check', ( req, res, next) => {
              res.send('I am Ok');
        });
        this.app.use('/api', routes);
        app.use('/swagger', swaggerUI.serve, swaggerUI.setup(this.initSwagger()));
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
        //  Database.disconnect();
    }
}
export default Server;