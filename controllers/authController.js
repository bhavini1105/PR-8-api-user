const userModel = require("../models/userModel");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
