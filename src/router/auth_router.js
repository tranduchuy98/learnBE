import express from 'express';
import { registerUser, login, refreshToken, submitForm, getFormFB } from '../controller/auth_controller.js';

export default (router) => {
    router.post('/auth/register', registerUser)
    router.post('/auth/login', login)
    router.post('/auth/refreshToken', refreshToken)
    router.post('/auth/submitForm', submitForm)
    router.get('/auth/getForm', getFormFB)
}