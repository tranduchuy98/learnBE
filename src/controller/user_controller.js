import SuccessResponse from '../model/success_response.js';
import ErrorResponse from '../model/error_response.js';
import { updateUserById, deleteUserById, getUserById } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';


export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    const resUser = {
        id: user.id,
        email: user.email,
        name: user.name,
    }
    return res.status(200).send(new SuccessResponse('Success', resUser)).end();
  } catch(e){
    console.log(e)
    return res.status(400).send(new ErrorResponse(400, 'id không tồn tại'));
  }
}

export const updateUserName = async (req, res) => {
  try {
    const user = req.user;

    if (!req.body.name) {
      return res.status(400).send(new ErrorResponse(400, 'Nhập username mới'));
    }

    if (req.body.name == user.name) {
      return res.status(400).send(new ErrorResponse(400, 'Giống name cũ'));
    }

    var userUpdate = user
    userUpdate.name =  req.body.name

    const resUser = {
      id: userUpdate.id,
      email: userUpdate.email,
      name: userUpdate.name,
  }
    const userPayload = await updateUserById(user.id, userUpdate);
    return res.status(200).send(new SuccessResponse('Update Success', resUser)).end();
    
  } catch(e){
    console.log(e)
    return res.status(400).send(new ErrorResponse(400, 'Lỗi'));
  }
}


export const deleteUser = async (req, res) => {
  try {
    const user = req.user;
 
    if (md5(req.body.password) != user.password) {
      return res.status(400).send(new ErrorResponse(400, 'Mật khẩu không chính xác'));
    }

    const userPayload = await deleteUserById(user.id);
    return res.status(200).send(new SuccessResponse('Delete Success')).end();
  } catch(e){
    console.log(e)
    return res.status(400).send(new ErrorResponse(400, 'Lỗi'));
  }
}


export const updatePassWord = async (req, res) => {
  try {
    const user = req.user;

    if (!req.body.oldPassword || !req.body.newPassword) {
      return res.status(400).send(new ErrorResponse(400, 'Nhập đủ thông tin'));
    }

    if (req.body.oldPassword == req.body.newPassword) {
      return res.status(400).send(new ErrorResponse(400, 'Không đổi giống pass cũ'));
    }

    if (req.body.newPassword < 6) {
      return res.status(400).send(new ErrorResponse(400, 'Password phải lớn hơn 5'));
    }

    if (md5(req.body.oldPassword) != user.password) {
      return res.status(400).send(new ErrorResponse(400, 'Mật khẩu hiện tại không chính xác'));
    }

    var userUpdate = user
    userUpdate.password =  md5(req.body.newPassword)

    const resUser = {
      id: userUpdate.id,
      email: userUpdate.email,
      name: userUpdate.name,
  }
    const userPayload = await updateUserById(user.id, userUpdate);
    return res.status(200).send(new SuccessResponse('Update Success', resUser)).end();
    
  } catch(e){
    console.log(e)
    return res.status(400).send(new ErrorResponse(400, 'Lỗi'));
  }
}