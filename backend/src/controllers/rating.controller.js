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