//require the user has at least 1 credit
module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }
    next();
};
