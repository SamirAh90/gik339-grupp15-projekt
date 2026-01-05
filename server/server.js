const sqlite = require("sqlite3").verbose();
const express = require("express");
const server = express();

const db = new sqlite.Database("./plants.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Ansluten till SQLite-databasen.");
});

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
  console.log("Server körs på http://localhost:3000");
  
  db.run(`CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      water TEXT NOT NULL,
      height INTEGER NOT NULL,
      color TEXT NOT NULL
    )`);
});

server.get("/plants", (req, res) => {
  const sql = "SELECT * FROM plants";
  db.all(sql, (err, rows) => {
    if (err) res.status(500).send(err);
    else res.send(rows);
  });
});

server.get("/plants/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM plants WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) res.status(500).send(err);
    else res.send(row);
  });
});

server.post("/plants", (req, res) => {
  const plant = req.body;
  const sql = "INSERT INTO plants(name, species, water, height, color) VALUES (?,?,?,?,?)";
  db.run(sql, [plant.name, plant.species, plant.water, plant.height, plant.color], (err) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Växten sparades" });
  });
});

server.put("/plants", (req, res) => {
  const plant = req.body;
  const sql = "UPDATE plants SET name=?, species=?, water=?, height=?, color=? WHERE id=?";
  db.run(sql, [plant.name, plant.species, plant.water, plant.height, plant.color, plant.id], (err) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Växten uppdaterades" });
  });
});

server.delete("/plants/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM plants WHERE id=?";
  db.run(sql, [id], (err) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Växten togs bort" });
  });
});