import SuccessResponse from '../model/success_response.js';
import ErrorResponse from '../model/error_response.js';
import { updateUserById, deleteUserById, getUserById } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import {StateValue} from "../State/state_value.js"


// var UpdateId = stateValue.UserRoles.find(item => item.role === 'UPDATE').id 
// var NormalId = stateValue.UserRoles.find(item => item.role === 'NORMAL').id 

export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    const userGet = req.userGet;
    var stateValue = new StateValue()
    var AdminId = stateValue.UserRoles.find(item => item.role === 'ADMIN').id 

    if (user.role.includes(AdminId)) {
      return res.status(200).send(new SuccessResponse('Success', userGet)).end();
    }

    if (userGet.id != user.id) {
      const resUser = {
        name: userGet.name,
        id: userGet.id,
    }
    return res.status(200).send(new SuccessResponse('Success', resUser)).end();
    }
    const resUser = {
      id: userGet.id,
      email: userGet.email,
      name: userGet.name,
  }
    return res.status(200).send(new SuccessResponse('Success', resUser)).end();
  } catch(e){
    console.log(e)
    return res.status(400).send(new ErrorResponse(400, 'Lỗi'));
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