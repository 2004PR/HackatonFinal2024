const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/product/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addProduct);
    app.delete("/api/product/delete", [authJwt.verifyToken, authJwt.isModerator], controller.deleteProduct);
    app.get("/api/product/category", controller.productByCategory);
    app.get("/api/product/price", controller.sortProdByPrice);
    app.get("/api/product/cart", controller.addToCart);
}