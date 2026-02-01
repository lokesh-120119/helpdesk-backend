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

app.put("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const sql = "UPDATE tickets SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Update failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket status updated successfully" });
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

app.get("/tickets", (req, res) => {
  const sql = "SELECT * FROM tickets";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch tickets" });
    }
    res.json(results);
  });
});

app.get("/tickets/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM tickets WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch ticket" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(results[0]);
  });
});

app.delete("/tickets/:id", (req, res) => {
  const ticketId = req.params.id;

  const sql = "DELETE FROM tickets WHERE id = ?";

  db.query(sql, [ticketId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Ticket delete failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});