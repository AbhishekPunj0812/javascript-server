import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public find(query: any) {
        return this.model.find(query).lean();
    }
    private model: M;

    constructor(model) {
        this.model = model;
    }

    public static generateObjectId(): string {
        return String(mongoose.Types.ObjectId());
    }

    public count(query: any) {
        return this.model.countDocuments(query);
    }

    public findOne(query: object) {
        return this.model.findOne(query).lean();
    }

    public async create(data: any, creator): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        const modelData = {
            ...data,
            originalId: id,
            createdBy: creator,
            _id: id,
        };

        return await this.model.create(modelData);
    }

    public get(data: any) {
        return this.model.findOne(data);
    }

    public async update(id: string, dataToUpdate: any, updator) {


    try {
        let originalData;
        const data =   await this.findOne({ id: id, updatedAt: undefined, deletedAt: undefined });
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
                            throw 'Unable to update';
                        }
                    this.model.create(newData);
    }
                    catch (err) {
                        console.log('Error: ', err);
                    }
            }
    public async delete(id: string, remover: string) {

            let originalData;
    try {
        const data = await this.findOne({ id: ( id ), deletedAt: undefined }).lean();
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

        const res = await this.model.updateOne({ _id: oldId }, modelDelete);
                if (res === null) {
                    throw 'Unable to Update';
                }
    }
                        catch (err) {
                            console.log('Error: ', err);
                        }
    }
}