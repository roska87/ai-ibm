const getPing = async (req, res) => {
    res.status(200);
    res.send({
        success: true,
        message: 'pong',
        params: req.params,
        body: req.body,
        query: req.query,
        ip: req.ip,
        hostname: req.hostname
    });
};

const postPing = async (req, res) => {
    console.log(req.body);
    let body = req.body;
    res.status(200).send(body);
};

module.exports = {
    getPing,
    postPing
};