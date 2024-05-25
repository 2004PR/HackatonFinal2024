const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");
const { createToken } = require("../controllers/payment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/token/culqui", createToken);
}