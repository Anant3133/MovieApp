const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email'] });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name } = req.body;
  const user = await User.findByPk(req.user.id);
  await user.update({ name });
  res.json({ message: 'Profile updated' });
};
