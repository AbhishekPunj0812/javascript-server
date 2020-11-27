import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import * as bcrypt from 'bcrypt';
import VersionableRepository from '../versionable/VersionableRepository';
import { query } from 'express';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

    constructor() {
        super(userModel);
    }

    public create(data, creator) {
        const rawPassword = data.password;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(rawPassword, salt);
        data.password = hashedPassword;
        return super.create(data, creator);
    }

    public updateUser(id, data, updator) {
        if ('password' in data) {
            const rawPassword = data.password;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(rawPassword, salt);
            data.password = hashedPassword;
        }
        return super.update(id, data, updator);
    }

    public getUser(data) {

        return super.get(data);
    }

    public deleteData(id, remover) {
        return super.delete(id, remover);
    }

    public findone(data) {
        return super.findOne(data);
    }
    // tslint:disable-next-line:no-shadowed-variable
    public find(query) {
        return super.find(query);
    }

    // tslint:disable-next-line: no-shadowed-variable
    public countData(query) {
        return super.count(query);
    }
}