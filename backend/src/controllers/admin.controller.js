const adminService = require("../services/admin.service");


exports.dashboard = async (req, res) => {

    try {

        const data = await adminService.getDashboard();

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getUsers = async (req, res) => {

    try {
        const {
            search = "",
            sortBy = "id",
            order = "DESC"
        } = req.query;

        const users = await adminService.getUsers(
            search,
            sortBy,
            order
        );

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getStores = async (req, res) => {

    try {

        const {
            search = "",
            sortBy = "id",
            order = "DESC"
        } = req.query;

        const stores = await adminService.getStores(
            search,
            sortBy,
            order
        );

        res.status(200).json({
            success: true,
            data: stores
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


exports.createUser = async (req, res) => {

    try {

        const user = await adminService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

exports.getUserById = async (req, res) => {

    try {

        const user = await adminService.getUserById(req.params.id);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};
