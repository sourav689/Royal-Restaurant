import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pool from "./db.js"; // ✅ Import database connection from db.js

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Restaurant Backend</h1>");
});

// --- Fetch Menu Data ---
app.post("/restaurant/menu", async (req, res) => {
  try {
    console.log("📥 Request received for /restaurant/menu");

    const response = await pool.query("SELECT * FROM menu");
    console.log("✅ Data fetched:", response.rows);

    res.json(response.rows);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// --- Fetch Table Data ---
app.post("/restaurant/table", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM tabless");
    console.log("✅ Tables fetched:", response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ error: "Failed to fetch table data" });
  }
});

// --- Handle Table Booking ---
app.post("/booking", async (req, res) => {
  const bookingData = req.body;

  console.log("📩 Received Booking Data:", bookingData);

  const selectedTables = bookingData.selected_tables;
  const userName = bookingData.user_name;

  console.log("🪑 Selected Table IDs:", selectedTables);
  console.log("👤 User Name:", userName);

  try {
    for (const tableId of selectedTables) {
      await pool.query("UPDATE tabless SET isbook = $1 WHERE table_id = $2", [true, tableId]);
    }

    res.status(200).json({ message: "Booking received successfully." });
  } catch (error) {
    console.error("❌ Error in booking:", error);
    res.status(400).json({ message: "Some issue in booking." });
  }
});

// --- Admin Route (Unbook a Table) ---
app.post("/admin", async (req, res) => {
  const { table_id } = req.body;
  console.log("🔧 Unbooking table:", table_id);

  try {
    await pool.query("UPDATE tabless SET isbook = $1 WHERE table_id = $2", [false, table_id]);
    res.status(200).json({ message: "Successfully unbooked table." });
  } catch (error) {
    console.error("❌ Error in admin route:", error);
    res.status(400).json({ message: "Some issue in backend." });
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Restaurant server running on port ${port}`);
});
