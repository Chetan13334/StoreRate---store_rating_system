const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

const {
    registerValidator,
    loginValidator,
    changePasswordValidator
} = require("../validators/auth.validator");

router.post("/register", registerValidator, authController.register);

router.post("/login", loginValidator, authController.login);

router.get("/profile", authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

router.get(
    "/admin",
    authenticate,
    authorize("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin"
        });
    }
);

router.put(
    "/change-password",
    authenticate,
    changePasswordValidator,
    authController.changePassword
);

module.exports = router;