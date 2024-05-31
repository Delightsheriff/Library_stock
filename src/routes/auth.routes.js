const AllUsers = require("../controllers/auth.controller/AllUsers");
const loginUser = require("../controllers/auth.controller/LoginUser");
const registerUser = require("../controllers/auth.controller/RegisterUser");

const authRouter = require("express").Router();

authRouter.get("/users", AllUsers);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
