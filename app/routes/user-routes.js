module.exports = app => {
    const users = require("../controllers/user-controller")
    var router = require("express").Router();
    //middleware
    const auth = require("../middleware/auth");

    //create user
    router.post("/", users.create);

    //connexion
    router.post("/signIn", users.signIn);

    //get all
    router.get("/", auth, users.getAll);

    app.use('/api/users', router);
}