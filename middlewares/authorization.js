"use strict"

const { Task } = require('../models')

function authorization(req, res, next) {
    const { id } = req.params;

    Task.findByPk(id)
        .then(task => {
            if (task) {
                if (task.UserId == +req.UserId) {
                    next()
                } else {
                    res.status(401).json({
                        msg: `You are not authorized to do this`
                    })
                }
            } else {
                res.status(400).json({
                    msg: `Cannot find task with id ${id}`
                })
            }
        })
}

module.exports = authorization;