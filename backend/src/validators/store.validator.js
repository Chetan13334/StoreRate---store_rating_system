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
    body("name").notEmpty().withMessage("Store name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("owner_id").isInt().withMessage("Valid owner id is required"),
    validate,
];