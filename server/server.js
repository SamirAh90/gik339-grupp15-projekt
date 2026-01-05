const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./gik339.db");
const express = require("express");
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

server.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

// Hämta ALLA användare
server.get("/res", (req, res) => {
  const sql = "SELECT * FROM res";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      // VIKTIG FIX: Skicka hela arrayen 'rows', inte bara 'rows[0]'
      res.send(rows);
    }
  });
});

// Hämta EN användare via ID
server.get("/res/:id", (req, res) => {
  const id = Number(req.params.id);
  const sql = "SELECT * FROM res WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      // FIX: Om ingen rad hittas, skicka 404
      res.status(404).json({ error: "Användaren hittades inte" });
    } else {
      res.json(row);
    }
  });
});

// Skapa ny användare
server.post("/res", (req, res) => {
  const body = req.body;
  const sql =
    "INSERT INTO res (firstName, lastName, username, color) VALUES (?, ?, ?, ?)";

  // FIX: Säkrare att lista variablerna explicit än att använda Object.values()
  const params = [body.firstName, body.lastName, body.username, body.color];

  db.run(sql, params, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, message: "Användare tillagd" });
    }
  });
});
