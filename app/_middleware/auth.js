// middleware/auth.js
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET; // Ensure this is properly set in your environment variables

export const verifyToken = (token) => {

  if (!token) {
    return { message: 'No token provided' };
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    return userId;
  } catch (error) {
    return { message: 'Invalid token', error: error.message};
  }
};
