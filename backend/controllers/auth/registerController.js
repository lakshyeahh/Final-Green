import Joi from 'joi';
import User from '../../models/user.js'; // Adjusted import to match your naming convention
import RefreshToken from '../../models/refreshToken.js'; // Adjusted import to match your naming convention
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';


const REFRESH_SECRET = process.env.REFRESH_SECRET || "changemeR";

const registerController = {
    async register(req, res, next) {
        // Validation schema
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if user already exists
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return res.status(409).json({ error: 'This email is already taken.' });
            }
        } catch (err) {
            return next(err);
        }

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'student' // Default role, adjust if needed
        });

        let access_token;
        let refresh_token;
        try {
            const result = await user.save();

            // Generate tokens
            access_token = JwtService.sign({ _id: result._id, role: result.role });
            refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);

            // Save refresh token in the database
            await RefreshToken.create({ token: refresh_token });
        } catch (err) {
            return next(err);
        }

        res.status(201).json({ access_token, refresh_token, user });
    }
};

export default registerController;
