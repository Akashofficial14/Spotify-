const userModel = require("../models/user.model");
const customError = require("../utills/customError");
const responseUtil = require("../utills/response.utill")

const getUserDataController = async (req, res, next) => {
    try {
        // 1. Get the user ID from the authentication middleware (req.user)
        // If your middleware attaches it directly as req.userId, change this to req.userId
        const userId = req.user?._id || req.user?.id; 

        if (!userId) {
            throw new customError("Authentication failed. User session identification missing.", 401);
        }

        // 2. Fetch user from database and exclude sensitive information like password
        const user = await userModel.findById(userId).select("-password");

        // 3. Handle cases where the user data token exists but the DB document was deleted
        if (!user) {
            throw new customError("User profile record not found in system storage.", 404);
        }

        // 4. Return user profile payload via your standard application response structure
        return responseUtil.success(
            res,
            { user },
            "User profile metadata synchronized successfully."
        );

    } catch (error) {
        // Passes standard server schema rejections directly down to your errorMiddleware
        return next(error);
    }
};

// Add this line to your controller export object block!
module.exports = { getUserDataController };