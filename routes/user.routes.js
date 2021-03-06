const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Orign, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/all", controller.allAccess);

    app.get("/api/authenticate/user", [authJwt.verifyToken], controller.userBoard)

    app.get(
        "/api/authenticate/manager",
        [authJwt.verifyToken, authJwt.isManager],
        controller.moderatorBoard
    );

    app.get(
        "/api/authenticate/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};
