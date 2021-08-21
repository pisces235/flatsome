const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports = class authController {
    static async signup(req, res) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword
        });
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.send({ message: 'email is in use'});
        } else {
            const result = await newUser.save();
            const { password, ...data } = await result.toJSON();
            res.send(data);
        }
    }

    static async addUser(req, res) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword
        });
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.send({ message: 'email is in use'});
        } else {
            const result = await newUser.save();
            const { password, ...data } = await result.toJSON();
            res.send(data);
        }
    }

    static async login(req, res) {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ message: 'user not found' });
        }

        if(!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({ message: 'invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        })

        res.send({ message: 'succes', token: token, user: user});
    }

    // [GET] fetchUser
    static async fetchUser(req, res) {
        try {
            const cookie = req.cookies['jwt'];

            const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
            
            if(!claims) {
                return res.status(404).send({
                    message: 'unauthenticated'
                })
            }

            const user = await User.fineOne({ _id: claims._id })

            const { password, ...data } = await user.toJSON();

            res.send(data);
        } catch (error) {
            return res.status(404).send({
                message: 'unauthenticated'
            })
        }
        
    }

    static async logout(req, res) {
        res.cookie('jwt', '', {maxAge: 0});

        res.send({
            message: 'success'
        });
    }
}