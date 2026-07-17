const ownerService = require("../services/owner.service");

exports.dashboard = async (req, res) => {

    try {

        const data = await ownerService.getDashboard(req.user.id);

        res.json({
            success: true,
            data: {
                storeName: data.store?.name || "",
                averageRating: data.average_rating ?? 0,
                totalRatings: data.total_ratings ?? 0,
                address: data.store?.address || "",
                email: data.store?.email || "",
                ownerName: data.store?.owner_name || "",
                storeId: data.store?.id || null
            }
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