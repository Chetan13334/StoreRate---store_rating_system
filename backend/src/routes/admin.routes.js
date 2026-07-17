const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const { authenticate } = require("../middleware/auth.middleware");

const { authorize } = require("../middleware/role.middleware");

const {
    createUserValidator,
} = require("../validators/admin.validator");

router.get(
    "/dashboard",
    authenticate,
    authorize("ADMIN"),
    adminController.dashboard
);

router.get(
    "/users",
    authenticate,
    authorize("ADMIN"),
    adminController.getUsers
);

router.get(
    "/stores",
    authenticate,
    authorize("ADMIN"),
    adminController.getStores
);

router.post(
    "/users",
    authenticate,
    authorize("ADMIN"),
    createUserValidator,
    adminController.createUser
);


router.get(
    "/users/:id",
    authenticate,
    authorize("ADMIN"),
    adminController.getUserById
);

module.exports = router;