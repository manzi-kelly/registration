require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../src/db");

async function createAdmin() {
  const email = "admin@autiva.com";
  const password = "Admin12345";

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO admins (email, password) VALUES (?, ?)",
    [email, hashed]
  );

  console.log("✅ Admin created");
  process.exit();
}

createAdmin();