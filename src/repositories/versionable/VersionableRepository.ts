import * as mongoose from 'mongoose';
import { Document, Query, DocumentQuery } from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {

    protected model: M;

    constructor(model: any) {
        this.model = model;
    }

    public static generateObjectId(): string {
        return String(mongoose.Types.ObjectId());
    }

    public count(query: any) {
        return this.model.countDocuments({...query, deletedAt: undefined});
    }

    public findOne(query: object) {
        return this.model.findOne(query).lean();
    }

    public async create(data: any, creator: any): Promise<D> {

        const id = VersionableRepository.generateObjectId();

        const modelData = {
            ...data,
            originalId: id,
            createdBy: creator,
            _id: id,
        };

        return await this.model.create(modelData);
    }


    public  find(query: any, projection: any, options: any): DocumentQuery<D[], D> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery, projection, options);
    }
    public async update(id: string, dataToUpdate: any, updator: any) {


        try {
                let originalData;
                const data =   await this.findOne({ originalId: id, updatedAt: undefined, deletedAt: undefined });
                console.log(data);
                if (data === null) {
                        throw 'Record Not Found';
                    }
                    originalData = data;
                const newId = VersionableRepository.generateObjectId();
                const oldId = originalData._id;
                const oldModel = {
                    ...originalData,
                    updatedAt: Date.now(),
                    updatedBy: updator,
                    deletedAt: Date.now(),
                    deletedBy: updator,
                };

                const newData = Object.assign(JSON.parse(JSON.stringify(originalData)), dataToUpdate);

                newData._id = newId;
                newData.createdAt = Date.now();

                const res = await this.model.updateOne({ _id: oldId }, oldModel);
                        if (res === null) {
                            return undefined;
                        }
                        return this.model.create(newData);
            }

            catch (err) {
                        console.log('Error: ', err);
                    }
            }
    public async delete(id: string, remover: string) {

        let originalData;

        try {
            const data = await this.findOne({ originalId: id , deletedAt: undefined }).lean();
            if (data === null) {
                throw 'Record not found';
            }

            originalData = data;
            const oldId = originalData._id;

            const modelDelete = {
            ...originalData,
            deletedAt: Date.now(),
            deletedBy: remover,
            };

             return await this.model.updateOne({ _id: oldId }, modelDelete);

        }
        catch (err) {
             console.log('Error: ', err);
        }
    }

}