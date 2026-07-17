const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const {
    ratingValidator,
    ratingUpdateValidator
} = require("../validators/rating.validator");

router.post(
    "/",
    authenticate,
    authorize("USER"),
    ratingValidator,
    ratingController.addRating
);

router.get(
    "/my",
    authenticate,
    authorize("USER"),
    ratingController.getMyRatings
);

router.put(
    "/:storeId",
    authenticate,
    authorize("USER"),
    ratingUpdateValidator,
    ratingController.updateRating
);

module.exports = router;
