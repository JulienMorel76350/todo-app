const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database
async function initializeDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Todo text is required" });
    }

    const result = await pool.query(
      "INSERT INTO todos (text) VALUES ($1) RETURNING *",
      [text]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await pool.query(
      "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start server
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await initializeDb();
});
