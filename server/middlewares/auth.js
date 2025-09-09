import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}