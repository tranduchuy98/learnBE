import express from 'express';
import { createUser, getUserByEmail } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { generateToken, generateRefreshToken } from '../helper/jwt_helper.js';
import { verifyRefreshToken, verifyToken } from '../helper/jwt_helper.js';

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).send(new ErrorResponse(400, 'Nhập đầy đủ thông tin'));
        }

        if (!validateEmail(email)) {
          return res.status(400).send(new ErrorResponse(400, 'Email sai định dạng'));
        }

        if (password.length < 6) {
          return res.status(400).send(new ErrorResponse(400, 'Password phải lớn hơn 5 ký tự'));
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

export const refreshToken = async(req, res) => {
  try {
    const {refreshToken} = req.body;
    if(!refreshToken) {
      return res.status(401).send(new ErrorResponse(401,'Invalid refreshToken'));
    }
    const refreshTokenData = verifyRefreshToken(refreshToken);

    const payload = {
      id: refreshTokenData.id,
      email: refreshTokenData.email,
    };

    const accessToken = generateToken(payload);
    const refreshTokenNew = generateRefreshToken(payload);

    const resUser = {
      id: refreshTokenData.id,
      email: refreshTokenData.email,
      accessToken,
      refreshToken: refreshTokenNew,
    }
    return res.status(200).send(new SuccessResponse('Refresh Token success', resUser));
  } catch (e) {
      if (e.message == "jwt expired") {
        return res.status(401).send(new ErrorResponse(401,'RefreshToken expired'));
    }
      return res.status(401).send(new ErrorResponse(401,'Invalid refreshToken'));
  }
}