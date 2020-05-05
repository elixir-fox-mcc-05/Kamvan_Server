const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')
function authentication(req,res,next){
    let token = req.header.token
    try{
        if(token){
            let decodeid = verifyToken(token)
            let {id} = decodeid

            User
                .findByPk(id)
                .then(data => {
                    if(data){
                        
                    }else{

                    }
                })
                .catch(err => {
                    res.status(404).json({
                        err : 'authentication error, please login again'
                    })
                })

        }else{
            res.status(404).json({
                err : 'please login first'
            })
        }
    }
    catch{
        throw err
    }
}

module.exports = authentication