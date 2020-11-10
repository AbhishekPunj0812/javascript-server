import * as mongoose from 'mongoose';
import { format } from 'path';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import { idText } from 'typescript';

export default class UserRepository {
    static count() {
        throw new Error('Method not implemented.');
    }

    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    public find(query, projection ?: any, options ?: any): any {
        return userModel.find(query, projection, options);
    }
    public create(data: any): Promise<IUserModel> {
        console.log('UserRepository :: create', data);
        const id = UserRepository.generateObjectId();
        const model = new userModel({
            _id: id,
            ...data,
        });
        return model.save();
    }

    // public update(data: any): Promise<IUserModel> {
    //     console.log('UserRepository :: update' , data);
    //     return userModel.update(data);
    // }
    public count() {
        return userModel.countDocuments();
    }
}