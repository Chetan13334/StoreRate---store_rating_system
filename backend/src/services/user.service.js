const db = require("../config/db");

exports.getUserById = async (id) => {

    const [users] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
        WHERE id = ?
        `,
        [id]
    );

    if (!users.length) {
        throw new Error("User not found");
    }

    const user = users[0];

    if (user.role === "STORE_OWNER") {

        const [stores] = await db.query(
            `
            SELECT
                s.id,
                s.name,
                ROUND(IFNULL(AVG(r.rating),0),1) AS average_rating
            FROM stores s
            LEFT JOIN ratings r
                ON s.id = r.store_id
            WHERE s.owner_id = ?
            GROUP BY s.id
            `,
            [id]
        );

        if (stores.length) {
            user.store = {
                id: stores[0].id,
                name: stores[0].name
            };
            user.storeName = stores[0].name;
            user.averageRating = stores[0].average_rating;
        }
    }

    return user;
};
