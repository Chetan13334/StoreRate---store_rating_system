const ownerService = require("../services/owner.service");

exports.dashboard = async (req, res) => {

    try {

        const data = await ownerService.getDashboard(req.user.id);

        res.json({
            success: true,
            data
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

exports.getRatings = async (req, res) => {

    try {

        const ratings = await ownerService.getRatings(req.user.id);

        res.json({
            success: true,
            data: ratings
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};