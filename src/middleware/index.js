import express from 'express';
import { createUser, getUserByEmail, getUserById } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { verifyRefreshToken, verifyToken } from '../helper/jwt_helper.js';

export const isAuthentication = async (req, res, next) => {
    try {
        let [scheme, token] = req.headers.authorization.split(' ');
        if (scheme == 'Bearer') {
            const payload = verifyToken(token);
            const user = await getUserById(payload.id);
            if (!user) {
                return res.status(401).send(new ErrorResponse(401,'Invalid token'));
            }
            req.user = user;
            return next()
        } else {
            return res.status(401).send(new ErrorResponse(401,'Invalid token'));
        }
    } catch(e){
        if (e.message == "jwt expired") {
            return res.status(401).send(new ErrorResponse(401,'Token expired'));
        }
        return res.status(401).send(new ErrorResponse(401,'Invalid token'));
    }
}

export const validUserId = async(req, res, next) => {
    try {
      const user = await getUserById(req.body.id);
      if (!user) {
          return res.status(400).send(new ErrorResponse(400, 'User ID không tồn tại'));
      }
      req.userGet = user
      return next()
    } catch(e){
     return res.status(400).send(new ErrorResponse(400, 'User ID không tồn tại'));
    }
  }