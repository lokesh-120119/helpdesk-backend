const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Helpdesk Backend Server Running");
});


app.get("/health", (req, res) => {
  res.json({ server: "running", database: "connected" });
});

app.get("/tickets", (req, res) => {
  console.log("GET /tickets API hit");
  const sql = "SELECT * FROM tickets";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("DB error:", err);
      return res.status(500).json({ error: "Failed to fetch tickets" });
    }
    res.json(results);
  });
});

app.post("/tickets", (req, res) => {
  const { user_id, title, description } = req.body;

  if (!user_id || !title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO tickets (user_id, title, description, status) VALUES (?, ?, ?, 'open')";

  db.query(sql, [user_id, title, description], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Ticket creation failed" });
    }
    res.json({
      message: "Ticket created successfully",
      ticketId: result.insertId,
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});