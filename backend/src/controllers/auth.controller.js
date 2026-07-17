const authService = require("../services/auth.service");

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            ...result,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};


exports.changePassword = async (req, res) => {

    try {

        const currentPassword = req.body.currentPassword ?? req.body.oldPassword;
        const newPassword = req.body.newPassword;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        await authService.changePassword(
            req.user.id,
            currentPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};