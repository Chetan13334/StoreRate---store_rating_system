const express = require("express");

const router = express.Router();

const storeController = require("../controllers/store.controller");

const { authenticate } = require("../middleware/auth.middleware");

const { authorize } = require("../middleware/role.middleware");

const { storeValidator } = require("../validators/store.validator");

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    storeValidator,
    storeController.createStore
);

router.get(
    "/all",
    authenticate,
    authorize("USER"),
    storeController.getAllStores
);

router.get(
    "/",
    authenticate,
    authorize("USER"),
    storeController.getAllStores
);

module.exports = router;
