// import JwtService from '../services/JwtService.js';


// const auth = async (req, res, next) => {
//     let authHeader = req.headers.authorization;
//     console.log(authHeader);
//     if (!authHeader) {
//         return next('token toh daalo');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const { _id, role } = await JwtService.verify(token);
//         const user = {
//             _id,
//             role
//         }
//         console.log(user);
//         req.user = user;
//         next();

//     } catch(err) {
//         return next('unAuthorized');
//     }

// }

// export default auth;


import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const JWT_SECRET = 'changeme';

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        return next('token toh daalo');
    }

    const token = authHeader.split(' ')[1];
    

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

export default auth;
