require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const blogRoutes = require("./blogRoutes");

const multer = require("multer");


const app = express();
const PORT = process.env.PORT || 5000;
// app.use("/api/comments", commentRoutes);
// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 
// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use("/api/blogs", blogRoutes);


app.get("/hii", async(req, res) => {
    res.send("hello")
})

app.post("/signup", async (req, res) => {
    console.log("Received a signup request"); 
    const { username, password } = req.body;
    console.log("Request body:", req.body); 

    // Check if user already exists
    db.query("SELECT * FROM user WHERE name = ?", [username], async (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword); 

        // Insert User
        db.query("INSERT INTO user (name, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ error: err.message });
            }
            console.log("User registered successfully");
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// 🟢 User Login API
app.post("/login", (req, res) => {
    console.log("hello");
    const { username, password } = req.body;

    db.query("SELECT * FROM user WHERE name = ?", [username], async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(401).json({ message: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

        // ✅ Generate JWT Token
        const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // ✅ Send token to client
        res.json({ message: "Login successful", token });
    });
});


app.post("/api/sell-pet", upload.single("image"), (req, res) => {
    try {
        const { petName, petType, breed, age, gender, vaccination, ownerName, phone, location, price, description } = req.body;
        const image = req.file ? req.file.filename : "";

        // Validate gender input
        if (!["Male", "Female"].includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value" });
        }

        // Validate vaccination status
        const validVaccinationStatus = ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated"];
        if (!validVaccinationStatus.includes(vaccination)) {
            return res.status(400).json({ message: "Invalid vaccination status" });
        }

        // Convert price to a valid decimal or set NULL if empty
        const formattedPrice = price && !isNaN(price) ? parseFloat(price) : null;

        const sql = `INSERT INTO pets_for_sale 
            (pet_name, pet_type, breed, age, gender, vaccination_status, owner_name, phone, location, price, description, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [petName, petType, breed, age, gender, vaccination, ownerName, phone, location, formattedPrice, description, image], (err, result) => {
            if (err) {
                console.error("Database Error: ", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "Pet added successfully!" });
        });

    } catch (error) {
        console.error("Server Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/pets-for-sale", (req, res) => {
    const sql = "SELECT * FROM pets_for_sale ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
});


app.post("/api/comments/add", (req, res) => {
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

  app.get("/api/comments/:blog_id", (req, res) => {
    const { blog_id } = req.params;

    const sql = "SELECT * FROM comments WHERE blog_id = ?";
    db.query(sql, [blog_id], (err, results) => {
        if (err) {
            console.error("❌ Error fetching comments:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});


// API to get pets by breed
app.get("/api/pets/:breed", (req, res) => {
  const breed = req.params.breed;
  const query = "SELECT * FROM pets_for_sale WHERE breed = ?";

  db.query(query, [breed], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
