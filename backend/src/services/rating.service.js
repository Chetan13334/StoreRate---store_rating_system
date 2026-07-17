const db = require("../config/db");

exports.addOrUpdateRating = async (userId, storeId, rating) => {

    // Check if store exists
    const [stores] = await db.query(
        "SELECT id FROM stores WHERE id = ?",
        [storeId]
    );

    if (stores.length === 0) {
        throw new Error("Store not found");
    }

    // Check if user already rated this store
    const [ratings] = await db.query(
        "SELECT id FROM ratings WHERE user_id = ? AND store_id = ?",
        [userId, storeId]
    );

    if (ratings.length > 0) {

        // Update existing rating
        await db.query(
            "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
            [rating, userId, storeId]
        );

        return {
            message: "Rating updated successfully"
        };
    }

    // Insert new rating
    await db.query(
        "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)",
        [userId, storeId, rating]
    );

    return {
        message: "Rating submitted successfully"
    };
};