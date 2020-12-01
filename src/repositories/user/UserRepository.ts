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

    public create(data: any, creator: any) {
        const rawPassword = data.password;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(rawPassword, salt);
        data.password = hashedPassword;
        return super.create(data, creator);
    }

    public updateUser(id: string, data: any, updator: any) {
        if ('password' in data) {
            const rawPassword = data.password;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(rawPassword, salt);
            data.password = hashedPassword;
        }
        return super.update(id, data, updator);
    }

    public getUser(data: any) {

        return super.get(data);
    }

    public deleteData(id: string, remover: string) {
        return super.delete(id, remover);
    }

    public findone(data: any) {
        return super.findOne(data);
    }
    // tslint:disable-next-line:no-shadowed-variable
    public find(query: any) {
        return super.find(query);
    }

    // tslint:disable-next-line: no-shadowed-variable
    public count(query: any) {
        return super.count(query);
    }
    public async getallTrainee(sort: boolean, skip: number, limit: number) {
        try {
            if ( sort ) {
                    const fetchData = await this.model.find( { deletedAt : undefined})
                    .skip(skip)
                    .limit(limit)
                    .sort({name: 1, email: 1});
                    const count = await this.model.find( {deletedAt: undefined})
                    .countDocuments();
                    const arr = [fetchData, count];
                    return arr;
            }
            else {
                    const fetchData = await this.model.find({deletedAt: undefined})
                    .skip(skip)
                    .limit(limit)
                    .sort({createdAt: -1});
                    const count = await this.model.find({deletedAt: undefined})
                    .countDocuments();
                    const arr = [fetchData, count];
                    return arr;
            }
        }
        catch (err) {
            console.log('Error inside getAll', err);
        }
    }
}