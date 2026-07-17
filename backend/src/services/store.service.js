const db = require("../config/db");

exports.createStore = async ({ name, email, address, owner_id }) => {

    const [store] = await db.query(
        "SELECT id FROM stores WHERE email = ?",
        [email]
    );

    if (store.length > 0) {
        throw new Error("Store already exists");
    }

    const [owners] = await db.query(
        "SELECT id, role FROM users WHERE id = ?",
        [owner_id]
    );

    if (owners.length === 0) {
        throw new Error("Store owner not found");
    }

    if (owners[0].role !== "STORE_OWNER") {
        throw new Error("Selected user is not a store owner");
    }

    const [result] = await db.query(
        `INSERT INTO stores(name,email,address,owner_id)
         VALUES(?,?,?,?)`,
        [name, email, address, owner_id]
    );

    return {
        id: result.insertId,
        name,
        email,
        address,
        owner_id,
    };
};


exports.getAllStores = async (
    search = "",
    sortBy = "id",
    order = "DESC"
) => {

    const allowedSort = [
        "id",
        "name",
        "email",
        "address",
        "average_rating"
    ];

    if (!allowedSort.includes(sortBy)) {
        sortBy = "id";
    }

    order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    let query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            ROUND(IFNULL(AVG(r.rating), 0), 1) AS average_rating,
            u.name AS owner_name
        FROM stores s
        LEFT JOIN ratings r
            ON s.id = r.store_id
        LEFT JOIN users u
            ON s.owner_id = u.id
    `;

    const values = [];

    if (search) {
        query += `
            WHERE s.name LIKE ?
               OR s.email LIKE ?
               OR s.address LIKE ?
        `;

        const keyword = `%${search}%`;
        values.push(keyword, keyword, keyword);
    }

    query += `
        GROUP BY s.id
        ORDER BY ${sortBy === "average_rating" ? "average_rating" : `s.${sortBy}`} ${order}
    `;

    const [stores] = await db.query(query, values);

    return stores;
};

exports.getAllStoresForUser = async (
    userId,
    search = "",
    sortBy = "id",
    order = "DESC"
) => {

    const allowedSort = [
        "id",
        "name",
        "email",
        "address",
        "average_rating"
    ];

    if (!allowedSort.includes(sortBy)) {
        sortBy = "id";
    }

    order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    let query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            ROUND(IFNULL(AVG(r.rating), 0), 1) AS average_rating,
            ur.rating AS user_rating
        FROM stores s
        LEFT JOIN ratings r
            ON s.id = r.store_id
        LEFT JOIN ratings ur
            ON s.id = ur.store_id AND ur.user_id = ?
    `;

    const values = [userId];

    if (search) {
        query += `
            WHERE
                s.name LIKE ?
                OR s.address LIKE ?
        `;

        const keyword = `%${search}%`;
        values.push(keyword, keyword);
    }

    query += `
        GROUP BY s.id, ur.rating
        ORDER BY ${sortBy === "average_rating" ? "average_rating" : `s.${sortBy}`} ${order}
    `;

    const [stores] = await db.query(query, values);

    return stores.map((store) => ({
        ...store,
        userRating: store.user_rating
    }));
};
