const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register User
exports.register = async (userData) => {
   const {
    name,
    email,
    password,
    address,
    role = "USER"
} = userData;

    const [existingUser] = await db.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );

    if (existingUser.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `INSERT INTO users(name,email,password,address,role)
     VALUES(?,?,?,?,?)`,
    [name, email, hashedPassword, address, role]
);

    return {
        id: result.insertId,
        name,
        email,
    };
};


exports.changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {

    const [users] = await db.query(
        `
        SELECT password
        FROM users
        WHERE id=?
        `,
        [userId]
    );

    if (!users.length) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        users[0].password
    );

    if (!isMatch) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
        `
        UPDATE users
        SET password=?
        WHERE id=?
        `,
        [hashedPassword, userId]
    );

    return;
};


// Login User
exports.login = async ({ email, password }) => {
    const [users] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};