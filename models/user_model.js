import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 16,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
});
userSchema.timestamps = true;
userSchema.statics.signup = async function (username, email, password) {
  try {
    const unameExists = await this.findOne({ username });
    const emailExists = await this.findOne({ email });
    if (unameExists) {
      throw new Error('Username already exists');
    }
    if (emailExists) {
      throw new Error('Email already exists');
    }
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model('User', userSchema);
export default User;
