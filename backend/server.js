require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./src/db");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as ok");
    res.json({ status: "ok", db: rows[0].ok });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      school,
      question,
      acceptedTerms,
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !school) {
      return res.status(400).json({
        message: "firstName, lastName, email, phone, and school are required.",
      });
    }

    if (acceptedTerms !== true) {
      return res.status(400).json({
        message: "You must accept the terms to register.",
      });
    }

    const emailLower = String(email).trim().toLowerCase();

    // Insert (parameterized query prevents SQL injection)
    const [result] = await pool.query(
      `
      INSERT INTO registrations
        (first_name, last_name, email, phone, school, question, accepted_terms)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        String(firstName).trim(),
        String(lastName).trim(),
        emailLower,
        String(phone).trim(),
        String(school).trim(),
        question ? String(question).trim() : null,
        1,
      ]
    );

    return res.status(201).json({
      message: "Registration saved successfully.",
      id: result.insertId,
    });
  } catch (e) {
    // Duplicate email handling
    if (e && e.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already registered." });
    }
    return res.status(500).json({ message: "Server error", error: e.message });
  }
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
})
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})
function authAdmin(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
app.get("/api/admin/registrations", authAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM registrations ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});