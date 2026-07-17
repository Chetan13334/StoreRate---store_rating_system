const ratingService = require("../services/rating.service");

exports.addRating = async (req, res) => {

    try {

        const { store_id, rating } = req.body;

        const result = await ratingService.addOrUpdateRating(
            req.user.id,
            store_id,
            rating
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

exports.getMyRatings = async (req, res) => {

    try {

        const ratings = await ratingService.getMyRatings(req.user.id);

        res.status(200).json({
            success: true,
            data: ratings
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

exports.updateRating = async (req, res) => {

    try {

        const { storeId } = req.params;
        const { rating } = req.body;

        const result = await ratingService.updateRating(
            req.user.id,
            storeId,
            rating
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
