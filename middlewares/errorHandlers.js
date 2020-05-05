module.exports = (err, req, res, next) => {
    console.log(err)

    switch (err.name) {
        case "SequelizeValidationError":
            const errors = err.errors.map(el => ({
                message: el.message
            }))
            res.status(400).json({
                errors
            })
            break;
        case "Bad Request":
            res.status(400).json({
                errors: err.errors
            })
            break;
        case "Internal Server Error":
            res.status(500).json({
                errors: err.errors
            })
            break;
        default:
            break;
    }
}