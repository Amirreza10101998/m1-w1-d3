export const badRequest = (err, req, res, next) => {
    if (err && err.status === 400) {
            res.status(400).send({message: err.message || "Bad Request!"})
    }
    next();
};

export const unauthorized = (err, req, res, next) => {
    if (err && err.status === 401) {
            res.status(401).send({message: err.message || "Unauthorized!"})
    }
    next();
};

export const forbidden = (err, req, res, next) => {
    if (err && err.status === 403) {
            res.status(403).send({message: err.message || "Forbidden!"})
    }
    next();
};

export const notFound = (err, req, res, next) => {
    if (err && err.status === 404) {
            res.status(404).send({message: err.message || "Not found!"})
    }
    next();
};

export const cathcAllErrorHandler = (err, req, res, next) => {
    if (err) {
        if(!res.headersSent) {
            res
              .status(err.status || 500)
              .send({message: err.message || "Somthing has gone wrong!"})
        }
    }
    next();
}