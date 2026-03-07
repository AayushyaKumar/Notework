import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
export const cookie=() => {
   return    { 
    maxAge: process.env.JWT_COOKIE_EXPIRES,
    httpOnly: true,
    secure: true,
    sameSite: 'none', 
    path: '/'

  }
}
