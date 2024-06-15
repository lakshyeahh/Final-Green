import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    token: { type: String, unique: true },
}, { timestamps: false });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens');

export default RefreshToken;

