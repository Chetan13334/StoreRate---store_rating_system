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
        .isLength({ min: 20, max: 60 })
        .withMessage("Name must be between 20 and 60 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be between 8 and 16 characters")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character"),

    body("address")
        .trim()
        .isLength({ max: 400 })
        .withMessage("Address must be at most 400 characters"),

    body("role")
        .optional()
        .isIn(["ADMIN", "USER", "STORE_OWNER"])
        .withMessage("Invalid role"),

    validate,
];

module.exports = {
    createUserValidator,
};
