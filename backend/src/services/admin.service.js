const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.getDashboard = async () => {

    const [[users]] = await db.query(
        "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[stores]] = await db.query(
        "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [[ratings]] = await db.query(
        "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    const [[owners]] = await db.query(
        "SELECT COUNT(*) AS totalOwners FROM users WHERE role = 'STORE_OWNER'"
    );

    return {
        totalUsers: users.totalUsers,
        totalStores: stores.totalStores,
        totalRatings: ratings.totalRatings,
        totalOwners: owners.totalOwners
    };
};

exports.getUsers = async (
    search = "",
    sortBy = "id",
    order = "DESC"
) => {

    const allowedSort = ["id", "name", "email", "address", "role"];

    if (!allowedSort.includes(sortBy)) {
        sortBy = "id";
    }

    order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    let query = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
    `;

    const values = [];

    if (search) {

        query += `
            WHERE
                name LIKE ?
                OR email LIKE ?
                OR address LIKE ?
                OR role LIKE ?
        `;

        const keyword = `%${search}%`;

        values.push(keyword, keyword, keyword, keyword);
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    const [users] = await db.query(query, values);

    return users;
};

exports.getStores = async (
    search = "",
    sortBy = "id",
    order = "DESC"
) => {

    const allowedSort = [
        "id",
        "name",
        "email",
        "address"
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
            u.name AS owner_name,
            ROUND(IFNULL(AVG(r.rating),0),1) AS average_rating
        FROM stores s

        LEFT JOIN users u
            ON s.owner_id=u.id

        LEFT JOIN ratings r
            ON s.id=r.store_id
    `;

    const values = [];

    if (search) {

        query += `
            WHERE
                s.name LIKE ?
                OR s.email LIKE ?
                OR s.address LIKE ?
                OR u.name LIKE ?
        `;

        const keyword = `%${search}%`;

        values.push(keyword, keyword, keyword, keyword);
    }

    query += `
        GROUP BY s.id
        ORDER BY s.${sortBy} ${order}
    `;

    const [stores] = await db.query(query, values);

    return stores;
};

exports.createUser = async ({
    name,
    email,
    password,
    address,
    role,
}) => {
    const normalizedRole = (role || "USER").toUpperCase();

    const [existing] = await db.query(
        "SELECT id FROM users WHERE email=?",
        [email]
    );

    if (existing.length) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
        `
        INSERT INTO users
        (name,email,password,address,role)
        VALUES (?,?,?,?,?)
        `,
        [
            name,
            email,
            hashedPassword,
            address,
            normalizedRole,
        ]
    );

    return {
        id: result.insertId,
        name,
        email,
        address,
        role: normalizedRole,
    };
};


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

            user.averageRating = stores[0].average_rating;
        }
    }

    return user;
};
