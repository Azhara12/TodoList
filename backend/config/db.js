const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    try {
        // Set DNS servers to Google/Cloudflare to resolve MongoDB SRV records
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB Connection Error details: ", error);
        process.exit(1);
    }
}

module.exports = connectDB;