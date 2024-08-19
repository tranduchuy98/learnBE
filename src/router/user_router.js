import express from 'express';
import { getUserInfo, updateUserName, updatePassWord, deleteUser, upLoadImage } from '../controller/user_controller.js';
import { isAuthentication, validUserId } from '../middleware/index.js';
import { upLoadFile } from '../controller/upload_controller.js';

export default (router) => {
    router.get('/user/getUserInfo', isAuthentication, validUserId, getUserInfo)
    router.post('/user/updateUserName', isAuthentication, validUserId, updateUserName)
    router.post('/user/updatePassWord', isAuthentication, validUserId, updatePassWord)
    router.delete('/user/deleteUser', isAuthentication, validUserId, deleteUser)
    router.put('/user/uploadImage', isAuthentication, upLoadFile.single("image"), upLoadImage)
}