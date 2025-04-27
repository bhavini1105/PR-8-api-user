const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports.create = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashPassword, role });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.get = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await userModel.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            id: user._id,
            name: user.name,
            role: user.role,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.userdelete = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(202).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.verifyUser = (req, res) => {
    return res.status(200).json({
        message: "User Verified Successfully",
        user: req.user
    });
};

module.exports.user = (req, res) => {
    return res.json({ message: "Welcome User" });
};

module.exports.admin = (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Only Admins" });
    }
    return res.json({ message: "Welcome Admin" });
};
