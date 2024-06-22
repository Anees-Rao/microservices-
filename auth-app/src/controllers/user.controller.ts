import { Request, Response } from 'express';
import md5 from 'md5';
import User, { UserDocument } from '../models/user';
import jwt from 'jsonwebtoken';
import { ValidateBody } from '../decorators/request.validator';
import { SignupSchema } from '../validation/signup.schema';
import { LoginSchema } from '../validation/login.schema';
import { VerifyJWTSchema } from '../validation/verify-jwt.schema';


class UserController {

    @ValidateBody(SignupSchema)
    async signup(req: Request, res: Response) {
        try {
            let { firstName, lastName, password, email } = req.body;
            email = email.toLowerCase();

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            // Create new user
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: md5(password), // Example: using md5 for simplicity (not recommended for real projects)
            });

            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @ValidateBody(LoginSchema)
    public async login(req: Request, res: Response): Promise<void> {
        try {
            let { email, password } = req.body;
            email = email.toLowerCase();
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: 'This user does not exist' });
                return;
            }
            if (user.password !== md5(password)) {
                res.status(401).json({ message: 'Invalid password' });
                return;
            }

            const { password: p, __v, ...rest } = user.toObject();
            const token = jwt.sign(rest, process.env.JWT_SECRET!, {
                expiresIn: '1h',
            });
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error in login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @ValidateBody(VerifyJWTSchema)
    public async verifyJwt(req: Request, res: Response): Promise<void> {
        console.log('verifyJwt');
        try {
            const token = req.body.token;
            if (!token) {
                res.status(400).json({ message: 'Token is required' });
                return;
            }
            jwt.verify(token, process.env.JWT_SECRET!, (error: any, decoded: any) => {
                if (error) {
                    res.status(401).json({ message: 'Invalid token' });
                    return;
                }
                res.status(200).json({ message: 'Token is valid', decoded });
            });
        } catch (error) {
            console.error('Error in verifyJwt:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

export default new UserController();
