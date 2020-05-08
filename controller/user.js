const Model = require('../models')
const User = Model.User
const {checkPassword} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')


class UserController {
    static register(req, res){
    const {email, password, organisation} = req.body

    User.create({ email, password, organisation })
        .then(user => {
            res.status(201).json({
                id : user.id,
                email : user.email,
                organisation : user.organisation
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            })
        })
    }
    static logIn(req, res, next) {
        const {email, password} = req.body

        User.findOne({
            where : {email}
        })
            .then(result => {
                if(result){
                    let compare = checkPassword(password, result.password)
                    if(compare){
                        let token = generateToken({
                            id : result.id,
                            email : result.email,
                            organisation : result.organisation
                        })
                        res.status(201).json({
                            id : result.id, email : result.email, token, organisation : result.organisation
                        })
                    }else{
                        throw {
                            msg : 'email or password wrong',
                            code : 401
                        }
                    }
                }else{
                    res.status(400).json({
                        msg : 'Email and Password not match'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;