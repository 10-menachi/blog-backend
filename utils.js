import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
  return token;
};
