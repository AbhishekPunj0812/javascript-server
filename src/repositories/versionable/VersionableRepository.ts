import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
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

    public createUser(data: any, creator): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        const modelData = {
            ...data,
            originalId: id,
            createdBy: creator,
            _id: id,
        };

        return this.model.create(modelData);
    }

    public getUser(data: any) {
        return this.model.findOne(data);
    }

    public update(id: string, dataToUpdate: any, updator) {

        return new Promise((resolve, reject) => {
            let originalData;
            this.findOne({ id: ( id ), updatedAt: undefined, deletedAt: undefined }).lean()
                .then((data) => {
                    if (data === null) {
                        throw '';
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
                                throw '';
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });

                    this.model.create(newData);

                    resolve(undefined);

                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    public delete(id: string, remover: string) {

        return new Promise((resolve, reject) => {
            let originalData;

            this.findOne({ id: ( id ), deletedAt: undefined }).lean()
                .then((data) => {
                    if (data === null) {
                        throw '';
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
                                throw '';
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    resolve(undefined);

                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}