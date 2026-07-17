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

exports.getMyRatings = async (userId) => {

    const [ratings] = await db.query(
        `
        SELECT
            r.id,
            r.store_id AS storeId,
            s.name AS storeName,
            s.address,
            r.rating,
            r.created_at
        FROM ratings r
        JOIN stores s
            ON r.store_id = s.id
        WHERE r.user_id = ?
        ORDER BY r.created_at DESC
        `,
        [userId]
    );

    return ratings;
};

exports.updateRating = async (userId, storeId, rating) => {

    const [existing] = await db.query(
        "SELECT id FROM ratings WHERE user_id = ? AND store_id = ?",
        [userId, storeId]
    );

    if (!existing.length) {
        throw new Error("Rating not found");
    }

    await db.query(
        "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
        [rating, userId, storeId]
    );

    return {
        message: "Rating updated successfully"
    };
};
