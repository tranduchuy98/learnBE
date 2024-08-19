import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.accessTokenSecret, { algorithm: 'HS256', expiresIn: process.env.expireAccessTokenTime });
    return token;
}

export const generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, process.env.refreshTokenSecret, { algorithm: 'HS256', expiresIn: process.env.expireRefreshTokenTime });
    return token;
}

export const verifyToken = (token) => {
    const payload = jwt.verify(token, process.env.accessTokenSecret, { algorithms: 'HS256' });
    return payload;
}

export const verifyRefreshToken = (token) => {
    const payload = jwt.verify(token, process.env.refreshTokenSecret, { algorithms: 'HS256' });
    return payload;
}