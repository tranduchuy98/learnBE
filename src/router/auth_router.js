import express from 'express';
import { registerUser, login, refreshToken, submitForm } from '../controller/auth_controller.js';

export default (router) => {
    router.post('/auth/register', registerUser)
    router.post('/auth/login', login)
    router.post('/auth/refreshToken', refreshToken)
    router.post('/auth/submitForm', submitForm)
}