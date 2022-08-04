function errorHandler (err, req, res, next) {
    const {
        message,
        status
    } = err
    if(status) {
        res.status(status).json({message});
    } else {
        console.log(err)
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
}

module.exports = errorHandler