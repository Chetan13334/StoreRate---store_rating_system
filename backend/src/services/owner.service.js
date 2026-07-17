const db = require("../config/db");

exports.getDashboard = async (ownerId) => {

    const [stores] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            address
        FROM stores
        WHERE owner_id = ?
        `,
        [ownerId]
    );

    if (stores.length === 0) {
        throw new Error("No store assigned");
    }

    const store = stores[0];

    const [[avg]] = await db.query(
        `
        SELECT
            ROUND(IFNULL(AVG(rating),0),1) AS average_rating,
            COUNT(*) AS total_ratings
        FROM ratings
        WHERE store_id = ?
        `,
        [store.id]
    );

    return {
        store,
        average_rating: avg.average_rating,
        total_ratings: avg.total_ratings
    };
};

exports.getRatings = async (ownerId) => {

    const [stores] = await db.query(
        "SELECT id FROM stores WHERE owner_id=?",
        [ownerId]
    );

    if (!stores.length) {
        throw new Error("No store assigned");
    }

    const storeId = stores[0].id;

    const [ratings] = await db.query(
        `
        SELECT
            u.name,
            u.email,
            r.rating,
            r.created_at
        FROM ratings r

        JOIN users u
            ON r.user_id=u.id

        WHERE r.store_id=?

        ORDER BY r.created_at DESC
        `,
        [storeId]
    );

    return ratings;
};