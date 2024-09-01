class Errorhandler extends Error {                //custom Error class.
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

const Errormiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server error";
    err.statuscode = err.statuscode || 500;
    if (err.code === 11000) {   
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new Errorhandler(message, 400);
    }
    if (err.name === "JsonWebToken") {
        const message = "Json Web Token is invalid, Try Again!";
        err = new Errorhandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is invalid, Try Again!";
        err = new Errorhandler(message, 400);
    }
    if (err.name === "castError") {
        const message = `Invalid ${err.path}`;
        err = new Errorhandler(message, 400);
    }

    const errorMessage = err.erros ? Object.values(err.erros)
        .map(error => error.message)
        .join(" ")
        : err.message;

    return res.status(err.statuscode).json({
        sucess: false,
        message: errorMessage
    });
};

module.exports = Errormiddleware