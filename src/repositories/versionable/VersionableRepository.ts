import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    find(query: any) {
        throw new Error('Method not implemented.');
    }
    private model: M;

    constructor(model) {
        this.model = model;
    }

    public static generateObjectId(): string {
        return String(mongoose.Types.ObjectId());
    }

    public count() {
        return this.model.countDocuments();
    }

    public findOne(query: object) {
        return this.model.findOne(query).lean();
    }

    public async createUser(data: any, creator): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        const modelData = {
            ...data,
            originalId: id,
            createdBy: creator,
            _id: id,
        };

        return await this.model.create(modelData);
    }

    public getUser(data: any) {
        return this.model.findOne(data);
    }

    public async update(id: string, dataToUpdate: any, updator) {

        let originalData;

        await this.findOne({ id: id, updatedAt: undefined, deletedAt: undefined })
            .then((data) => {
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

                this.model.updateOne({ _id: oldId }, oldModel)
                    .then((res) => {
                        if (res === null) {
                            throw 'Unable to update';
                        }
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                    });
                    this.model.create(newData);

        });

            }
    public async delete(id: string, remover: string) {

            let originalData;

    await this.findOne({ id: ( id ), deletedAt: undefined }).lean()
                .then((data) => {
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

                    this.model.updateOne({ _id: oldId }, modelDelete)
                        .then((res) => {
                            if (res === null) {
                                throw 'Unable to Update';
                            }
                        })
                        .catch((err) => {
                            console.log('Error: ', err);
                        });
                });
    }
}