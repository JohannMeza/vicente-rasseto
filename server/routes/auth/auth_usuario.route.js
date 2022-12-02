const { Router } = require("express");
const router = Router();

const AuthController = require("../../controllers/auth/auth");
const IndexMiddleware = require("../../middleware/index.middleware")

router.post("/login", AuthController.signIn);
router.post("/register", AuthController.signUp);
router.get("/path/:id", AuthController.getPathUser);
router.get("/access", [IndexMiddleware.verifyToken, IndexMiddleware.auth], AuthController.isLogin);
router.delete("/delete/:id", AuthController.signRemove);

module.exports = router;