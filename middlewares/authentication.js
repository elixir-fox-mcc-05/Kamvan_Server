"use strict"

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    let token = req.headers.token

    try {
        let decoded = verifyToken(token)
        let { id } = decoded;

        User.findByPk(id)
            .then(user => {
                if (user) {
                    req.UserId = id
                    next()
                } else {
                    res.status(401).json({
                        msg: 'Please login first!'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Internal server error'
                })
            })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

module.exports = authentication;