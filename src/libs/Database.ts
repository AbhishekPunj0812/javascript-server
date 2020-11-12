import * as mongoose from 'mongoose';

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
           resolve(undefined);
           }
        });
    }); }
    static disconnect() {
        mongoose.disconnect(() => {
            console.log('MongoDB connection close');
          }, err => {
            console.log(err);
          });
    }
}
export default Database;