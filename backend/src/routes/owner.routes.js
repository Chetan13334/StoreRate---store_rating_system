const express = require("express");

const router = express.Router();

const ownerController = require("../controllers/owner.controller");

const { authenticate } = require("../middleware/auth.middleware");

const { authorize } = require("../middleware/role.middleware");

router.get(
    "/dashboard",
    authenticate,
    authorize("STORE_OWNER"),
    ownerController.dashboard
);

router.get(
    "/ratings",
    authenticate,
    authorize("STORE_OWNER"),
    ownerController.getRatings
);

module.exports = router;