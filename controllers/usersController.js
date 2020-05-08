const { User, Task } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const googleVerification = require('../helpers/googleOauthApi')

class UsersController {
    static register (req, res, next) {
        let {name, email, password, organization} = req.body
        User.create({
            name,
            email,
            password,
            organization
        })
            .then(data => {
                res.status(201).json({
                    User: {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        organization: data.organization
                    },
                    notif: 'Register successful!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login (req, res, next) {
        let {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if(data) {
                    let compare = comparePassword(password, data.password)
                    if(compare) {
                        let token = generateToken({
                            id: data.id,
                            name: data.name,
                            email: data.email
                        })
                        res.status(201).json({
                            token,
                            user: {
                                id: data.id,
                                name: data.name,
                                email: data.email    
                            },
                            notif: `Welcome Back ${data.name}!`
                        })        
                    } else {
                        throw {
                            msg: 'Please input correct password',
                            code: 401
                        }    
                    }
                } else {
                    throw {
                        msg: 'Please input registered email',
                        code: 401
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getAll(req, res, next) {
        User.findAll({
            attributes: ['id', 'name', 'email'],
            order: [['name', 'ASC']],
        })
            .then(data => {
                res.status(200).json({
                    Users: data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        let {name, google_token} = req.headers;
        let googleEmail = null;
        let newUser = false;
        googleVerification(google_token)
        .then(payload => {
            googleEmail = payload.email;
            return User.findOne({
                where: {
                    email: googleEmail
                }
            })
        })
        .then(user => {
            if (user) {
                return user;
            } else {
                newUser = true;
                return User
                .create({
                    name: name,
                    email,
                    password: process.env.DEFAULT_GOOGLE_PASSWORD
                });
            }
        })
        .then(user => {
            let code = newUser ? 201 : 200;
            let token = generateToken({
                id: user.id,
                name: user.name,
                email: user.email
            })
            console.log(code)
            res.status(code).json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email    
                },
                notif: 'Login Success!'
            })
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UsersController