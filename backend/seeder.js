const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const dns = require("dns"); // 🔥 DNS module import kiya
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    // 🔥 DNS servers ko Google/Cloudflare par set kiya taake connection error na aaye
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    console.log("DNS servers set successfully.");

    // Database connect karein
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for Seeding...");

    await User.deleteMany();
    console.log("Old users cleared.");

    // Passwords ko hash (secure) karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // Teenon required users ka data
    const users = [
      { name: "Adnan", email: "adnan@example.com", password: hashedPassword },
      { name: "Azhar", email: "azhar@example.com", password: hashedPassword },
      { name: "Shahzad", email: "shahzad@example.com", password: hashedPassword }
    ];

    // Database mein insert karein
    await User.insertMany(users);
    console.log("Database Seeded Successfully! Accounts are ready.");
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  }
};

seedUsers();