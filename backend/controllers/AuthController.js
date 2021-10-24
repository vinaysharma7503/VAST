const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../environment/env');

exports.signup = async (req, res) => {
    try {
        const data = req.body
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const signup = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            password: hashedPassword,
            contactNumber: data.contactNumber,
        });

        await signup.save(async (error, result) => {
            if (error) {
                return res.status(400).send({ 'message': error });
            }
            var response = await User.find({ _id: result._id});
            const user = Boolean(response.length) ? response[0] : {};
            jwt.sign({ _id: result._id,email:user.email,role:user.role }, env.jwt_secret, async (error, token) => {
                if (error) {
                    return res.status(400).json({ 'message': error });
                }
                await User.updateOne({_id: user._id},{auth_r_token:token},{});
                var userDetails = {
                    "user":{
                        _id:user._id,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        username:user.username,
                        email:user.email,
                        role:user.role,
                        auth_r_token:token
                    }
                }
                res.send(201,{message:'Signup successfully.',userDetails});
            })
        })

    } catch (error) {
        if (error) {
            return res.status(400).send({ 'message': error });
        } else {
            res.status(500).send(error);
        }
    }
}
