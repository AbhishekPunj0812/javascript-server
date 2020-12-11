import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {
  constructor(option: any, collection: any) {
    const versionable = Object.assign({
      ...option,
      createdAt: {
        default: Date.now,
        required: true,
        type: Date,
      },
      deletedAt: {
        required: false,
        default: undefined,
        type: Date,
      },
      originalId: {
        required: true,
        type: String,
      },
      updatedAt: {
        required: false,
        default: undefined,
        type: Date,
      },
      updatedBy: {
        required: false,
        default: undefined,
        type: String,
      },
      createdBy: {
        required: false,
        default: undefined,
        type: String,
      },
      deletedBy: {
        required: false,
        default: undefined,
        type: String,
      },
    });
    super(versionable, collection);
  }
}