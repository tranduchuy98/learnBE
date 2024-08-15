import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    role: {type: String, require: true},
})

export const RoleModel = mongoose.model('roles', RoleSchema);

export const getRole = () => RoleModel.find();

