

class Responses {
    success(req, res, status, data, message) {
        res.status(status).json({ status, data, message });
    }

    error(req, res, status, data, message) {
        res.status(status).json({ status, data, message });
    }
}



module.exports = new Responses();