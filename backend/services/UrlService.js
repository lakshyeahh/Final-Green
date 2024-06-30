import crypto from 'crypto';

const encryptUserID = (userId) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', process.env.SECRET_KEY, process.env.SECRET_IV);
  let encrypted = cipher.update(userId, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export default encryptUserID;
