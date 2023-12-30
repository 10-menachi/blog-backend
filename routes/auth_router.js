import express from 'express';
import User from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../utils.js';

const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.body);
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.signup(username, email, hash);
    const token = createToken(newUser);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
