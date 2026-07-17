const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    next();
};

const createUserValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be between 8 and 16 characters"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),

    body("role")
        .optional()
        .isIn(["ADMIN", "USER", "STORE_OWNER"])
        .withMessage("Invalid role"),

    validate,
];

module.exports = {
    createUserValidator,
};