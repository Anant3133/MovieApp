const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const sendEmail = require('../utils/sendEmail');
const forgotPasswordDTO = require('../dtos/forgotPasswordDTO');
const resetPasswordDTO = require('../dtos/resetPasswordDTO');

async function forgotPassword(req, res) {
  const { error, value } = forgotPasswordDTO.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) return res.status(404).json({ error: 'Email not registered' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiry

    await PasswordResetToken.upsert({
      userId: user.id,
      token,
      expiresAt,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);

    return res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function resetPassword(req, res) {
  const { error, value } = resetPasswordDTO.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const tokenRecord = await PasswordResetToken.findOne({ where: { token: value.token } });
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(value.newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: tokenRecord.userId } });
    await PasswordResetToken.destroy({ where: { token: value.token } });

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { forgotPassword, resetPassword };
