
import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    comment: {type: String, require: true},
    contact: {type: String, require: true},
    lang: {type: String, require: true},
    staffName: {type: String, require: true},
    tableNumber: {type: String, require: true},
    date: {type: String, require: true}
})

export const FileModel = mongoose.model('feedbacks', fileSchema);

export const saveFile = (file) => new FileModel(file).save()