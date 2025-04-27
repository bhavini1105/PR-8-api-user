const { default: mongoose } = require("mongoose");

require('dotenv').config();
const url = process.env.MONGODB_URL;

module.exports.db = async()=>{
    try {
        mongoose.connect(url);
        console.log("Database connected....");
    } catch (error) {
        console.log(error.message);
    }
}
