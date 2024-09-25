class Errorhandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode
    };
};

const Errormiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;

    if (err.code === 11000) {
        const message = `Duplicates ${Object.keys(err.keyValue)} Entered`;
        err = new Errorhandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid,Try Again!";
        err = new Errorhandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token Expired,Try Again!";
        err = new Errorhandler(message, 400);
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new Errorhandler(message, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
        :err.message;

    return res.status(err.statuscode).json({
        success: false,
        message: errorMessage,
    });
};

module.exports = Errormiddleware