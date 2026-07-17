const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS status");

        res.status(200).json({
            success: true,
            message: "Database Connected Successfully",
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;