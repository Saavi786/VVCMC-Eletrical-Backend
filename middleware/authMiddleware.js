const jwt = require("jsonwebtoken");
const User = require("../Model/adminLoginSchema");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Remove "Bearer " from token string
    const jwtToken = token.replace("Bearer ", "");
    
    try {
        // Verifying the token
        const isVerified = jwt.verify(jwtToken, 'vvcm');
        console.log(isVerified)

        // Getting the complete user details without password
        const userData = await User.findOne({ Email: isVerified.user.Email }).select({
            Password: 0,
            HashPassword: 0
        });

        console.log(userData)

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach token and user data to request object
        req.token = jwtToken;
        req.user = userData;

        // Move on to the next middleware or route handler
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;
