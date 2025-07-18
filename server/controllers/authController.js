const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userSignupSchema = require('../dtos/userSignupDTO');
const userLoginSchema = require('../dtos/userLoginDTO');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

async function signup(req, res) {
  const { error, value } = userSignupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ where: { email: value.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const newUser = await User.create({
      name: value.name,
      email: value.email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  const { error, value } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  signup,
  login,
};
