const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { ratingValidator } = require("../validators/rating.validator");

router.post(
    "/",
    authenticate,
    authorize("USER"),
    ratingValidator,
    ratingController.addRating
);

module.exports = router;