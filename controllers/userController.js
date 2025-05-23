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

// userController.js

module.exports.login = async(req, res) => {
    try {
        const { name, password } = req.body;
        let user = await userModel.findOne({ name });

        if (user) {
            let isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                let payload = {
                    name: user.name,
                    email: user.email,
                    role: user.role // Add role to the payload
                };

                let token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

                res.cookie('token', token); // Optional cookie storage for token
                res.set('Authorization', 'Bearer ' + token);

                // Redirect to role-specific dashboard
                if (user.role === 'admin') {
                    return res.redirect('/admin/dashboard');
                } else {
                    return res.redirect('/user/dashboard');
                }
            } else {
                return res.status(401).json("Wrong Password!..");
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.verifyUser = (req, res) => {
    return res.status(200).json({
        message: "User Verified Successfully!",
        username: req.user.name,
        role: req.user.role
    });
};


module.exports.userdelete = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(202).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
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
