import express from 'express';
import { createUser, getUserByEmail } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { generateToken, generateRefreshToken } from '../helper/jwt_helper.js';

export const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).send(new ErrorResponse(400, 'Nhập đầy đủ thông tin'));
        }

        const exitsUser = await getUserByEmail(email);
        if (exitsUser) {
            return res.status(400).send(new ErrorResponse(400,'Email đã được đăng ký'));
        }

        const user = await createUser({
            name,
            email,
            password: md5(password)
        })

        return res.status(200).send(new SuccessResponse('Đăng ký thành công', null)).end();
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export const login = async(req, res) => {
    try{
      const {email, password} = req.body;
      if(!email || ! password) {
        return res.status(400).send(new ErrorResponse(400,'Nhập đầy đủ thông tin'));
      }
      const user = await getUserByEmail(email);
      if(!user){
        return res.status(400).send(new ErrorResponse(400,'Email không tồn tại'));
      }
      
      if(user.password != md5(password)){
        return res.status(400).send(new ErrorResponse(400,'Sai mật khẩu'));
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const accessToken = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const resUser = {
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken,
      }
      
      return res.status(200).send(new SuccessResponse('Đăng nhập thành công', resUser));
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}