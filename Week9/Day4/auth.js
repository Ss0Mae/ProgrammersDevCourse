const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const ensureAuthorization = (req, res) => {
    try {
        let receivedJwt = req.headers["authorization"];
        console.log("received jwt : ", receivedJwt);

        let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
        console.log(decodedJwt);
        return decodedJwt;
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        return err;
    }
};

module.exports = ensureAuthorization;