"use strict"

const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

    static register(req, res, next) {
        const { username, email, password } = req.body;

        User.create({
            username,
            email,
            password
        })
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;

        User.findOne({
            where: { email }
        })
            .then(user => {
                if (user) {
                    if (compare(password, user.password)) {
                        let token = generateToken({
                            id: user.id,
                            email: user.email
                        })
                        res.status(200).json({ token })
                    } else {
                        return next({
                            name: 'Bad Request',
                            errors: [{ message: `Wrong email/password!` }]
                        })
                    }
                } else {
                    return next({
                        name: 'Bad Request',
                        errors: [{ message: `Wrong email/password!` }]
                    })
                }
            })
            .catch(err => {
                next({
                    name: 'Internal Server Error',
                    errors: [{ message: err}]
                })
            })
    }
}

module.exports = UserController;