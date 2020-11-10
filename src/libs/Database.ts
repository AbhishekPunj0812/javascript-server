import { rejects } from 'assert';
import * as mongoose from 'mongoose';
import { resolve } from 'path';
import seedData  from '../libs/seedData';


class Database {
    static open(MONGO_URL) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {

        console.log('inside open method');
        mongoose.connect(MONGO_URL, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
           if (err) {
               console.log(err);
               reject(err);
               return;
           } else {
             seedData();
             resolve(undefined);
           }
        });
    }); }
    static disconnect() {
        console.log('inside disconnect method');
    }
}
export default Database;