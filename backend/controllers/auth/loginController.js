import Joi from 'joi';
import User from '../../models/user.js';
import RefreshToken from '../../models/refreshToken.js';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'changemeR';

const loginController = {
    async login(req, res, next) {
        // Validation schema
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Authentication
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate tokens
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);

            // Save refresh token in the database
            await RefreshToken.create({ token: refresh_token });

            res.json({ access_token, refresh_token, user });
        } catch (err) {
            return next(err);
        }
    },

    async logout(req, res, next) {
        // Validation schema for refresh token
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            await RefreshToken.deleteOne({ token: req.body.refresh_token });
            res.json({ status: 1 });
        } catch (err) {
            return next(new Error('Something went wrong in the database'));
        }
    }
};

export default loginController;
