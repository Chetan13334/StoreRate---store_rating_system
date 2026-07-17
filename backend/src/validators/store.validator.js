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

exports.storeValidator = [
    body("name")
        .trim()
        .isLength({ min: 20, max: 60 })
        .withMessage("Store name must be between 20 and 60 characters"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),
    body("address")
        .trim()
        .isLength({ max: 400 })
        .withMessage("Address must be at most 400 characters"),
    body("owner_id").isInt().withMessage("Valid owner id is required"),
    validate,
];
