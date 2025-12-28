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

server.get("/res", (req, res) => {
  const sql = "SELECT * FROM res";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else res.send(rows);
  });
});

server.post("/res", (req, res) => {
  const resdata = req.body; // renamed to avoid conflict
  const sql =
    "INSERT INTO res (firstName, lastName, username, color) VALUES (?, ?, ?, ?)";

  db.run(sql, Object.values(resdata), function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      // Respond once with JSON including the new id and a message
      res.status(201).json({ id: this.lastID, message: "Användare tillagd" });
    }
  });
});
