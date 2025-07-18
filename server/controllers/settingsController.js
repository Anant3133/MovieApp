const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Incorrect current password' });

  const hashed = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashed });
  res.json({ message: 'Password updated successfully' });
};
