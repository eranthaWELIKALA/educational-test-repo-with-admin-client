module.exports = function (err, req, res, next) {
    if (err.response) {
        res.status(err.response.status).send({
            status: err.response.status,
            message: err.response.data
        });
    }
    else if (err instanceof Error) {
        res.status(500).send({
            status: err.name,
            message: err.message
        });
    }
    else {
        next();
    }
}