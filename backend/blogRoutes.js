const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
require("dotenv").config();




const router = express.Router();

// Ensure `uploads` directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Multer Storage Config for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// 📌 API: Add a New Blog
router.post("/add-blog", upload.single("media"), (req, res) => {
  console.log("hello");
  const { title, content, username } = req.body; // Get username from request body
  const blog_id = uuidv4();
  const media_path = req.file ? req.file.filename : null;
  const media_type = req.file ? (req.file.mimetype.startsWith("image") ? "image" : "video") : null;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const query = `INSERT INTO blogs (blog_id, title, content, username, media_path, media_type) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [blog_id, title, content, username, media_path, media_type], (err, result) => {
    if (err) {
      console.error("❌ Error inserting blog:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "✅ Blog added successfully", blog_id });
  });
});

// 📌 API: Fetch All Blogs
router.get("/all-blogs", (req, res) => {
  const query = "SELECT * FROM blogs ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching blogs:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.post("/add", (req, res) => {
  const { blog_id, user_name, content } = req.body;

  // Validate Input
  if (!blog_id || !user_name || !content.trim()) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // Insert Comment into MySQL
  const sql = "INSERT INTO comments (blog_id, user_name, content) VALUES (?, ?, ?)";
  db.query(sql, [blog_id, user_name, content], (err, result) => {
    if (err) {
      console.error("❌ Error inserting comment:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "✅ Comment added successfully!", comment_id: result.insertId });
  });
});

module.exports = router;
