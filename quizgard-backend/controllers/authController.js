const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// User registration function
const register = async (req, res) => {
  const { email, password,role } = req.body;

  try {
    const userExist = await User.findOne({email});
    if(userExist){
      throw new Error('User already exists')
    }
    const user = await User.create({ email,role, password });
    res.status(200).json({ user });
  } catch (error) {
    
    res.status(502).send({ message: error.message });
  }
};

// User login function
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token,user });
  } catch (err) {
    res.status(502).send({ message: error.message });
  }
};

module.exports = { register, login };