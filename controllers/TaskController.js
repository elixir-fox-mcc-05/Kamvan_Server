"use strict"

const { Task } = require('../models')

class TaskController {

    static read(req, res, next) {
        const UserId = req.UserId;

        Task.findAll({
            where: { UserId },
            order: [['id', 'ASC']]
        })
            .then(tasks => {
                res.status(200).json({ tasks })
            })
            .catch(err => {
                return next({
                    name: 'Internal Server Error',
                    errors: [{ message: `Internal Server Error` }]
                })
            })
    }

    static findById(req, res, next) {
        const { id } = req.params
        const UserId = req.UserId;

        Task.findByPk(id)
            .then(task => {
                if (task) {
                    if (task.UserId == UserId) {
                        res.status(200).json({ task })
                    } else {
                        return next({
                            name: 'Bad Request',
                            errors: [{ message: `Not authorized!` }]
                        })
                    }
                } else {
                    return next({
                        name: 'Bad Request',
                        errors: [{ message: `Cannot find task with id ${id}` }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        const { title, description, status, due_date } = req.body;
        const UserId = req.UserId;

        Task.create({
            title,
            description,
            status,
            due_date,
            UserId
        })
            .then(task => {
                res.status(201).json({ task })
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        const { id } = req.params
        Task.destroy({
            where: { id }
        })
            .then(task => {
                if (task) {
                    res.status(200).json({
                        msg: `Task with id ${id} successfully deleted`
                    })
                } else {
                    return next({
                        name: 'Bad Request',
                        errors: [{ message: `Task with id ${id} not found` }]
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const { title, description, status, due_date } = req.body;
        const { id } = req.params;

        Task.update({
            title: title,
            description: description,
            status: status,
            due_date: due_date
        }, {
            where: { id },
            returning: true
        })
            .then(task => {
                if (task != 0) {
                    res.status(200).json({
                        msg: `Task updated!`,
                        task: task[1][0]
                    })
                } else {
                    return next({
                        name: 'Bad Request',
                        errors: [{ message: `Task with id ${id} not found` }]
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController;