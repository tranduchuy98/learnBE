
import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    url: {type: String, require: true},
    name: {type: String, require: true},
    type: {type: String, require: true}
})

export const FileModel = mongoose.model('files', fileSchema);

export const saveFile = (file) => new FileModel(file).save()