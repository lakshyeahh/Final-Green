import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const decryptUserID = (encryptedUserId) => {
  const key = process.env.SECRET_KEY;
  const iv = process.env.SECRET_IV;

  if (!key || !iv) {
    throw new Error('Decryption key or IV is missing');
  }

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedUserId, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export default decryptUserID;
