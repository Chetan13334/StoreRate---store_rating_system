const storeService = require("../services/store.service");

exports.createStore = async (req, res) => {
    try {

        const store = await storeService.createStore(req.body);

        res.status(201).json({
            success: true,
            message: "Store created successfully",
            data: store,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};



exports.getAllStores = async (req, res) => {

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