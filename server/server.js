// Importerar SQLite3 för databashantering och Express för webbramverket
const sqlite = require("sqlite3").verbose();
const express = require("express");
const server = express();

// Skapar en ny databasanslutning till filen "plants.db"
// Om filen inte finns skapas den automatiskt
const db = new sqlite.Database("./plants.db", (err) => {
  if (err) console.error(err.message); // Loggar fel om anslutning misslyckas
  else console.log("Ansluten till SQLite-databasen."); // Bekräftar anslutning
});

// Middleware: funktioner som körs för varje request
server
  .use(express.json()) // Gör att servern kan läsa JSON-data från klienten
  .use(express.urlencoded({ extended: false })) // Gör att servern kan läsa data från formulär
  .use((req, res, next) => {
    // Ställer in CORS (Cross-Origin Resource Sharing) så att front-end kan anropa servern från valfri adress
    res.header("Access-Control-Allow-Origin", "*"); // Tillåter alla domäner
    res.header("Access-Control-Allow-Headers", "*"); // Tillåter alla headers
    res.header("Access-Control-Allow-Methods", "*"); // Tillåter alla HTTP-metoder (GET, POST etc.)
    next(); // Fortsätt till nästa middleware eller route
  });

// Startar servern på port 3000
server.listen(3000, () => {
  console.log("Server körs på http://localhost:3000");

  // Skapar tabellen "plants" om den inte redan finns
  // Tabellens kolumner:
  // - id: unik identifierare, autoincrement
  // - name: växtens namn
  // - species: växttyp
  // - water: vattenbehov
  // - height: höjd i cm
  // - color: växtens färg
  db.run(`CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      water TEXT NOT NULL,
      height INTEGER NOT NULL,
      color TEXT NOT NULL
    )`);
});

// Route: Hämta alla växter
server.get("/plants", (req, res) => {
  const sql = "SELECT * FROM plants"; // SQL-fråga för att hämta alla rader
  db.all(sql, (err, rows) => {
    // db.all används när flera rader förväntas
    if (err) res.status(500).send(err); // Skickar 500-fel om något går fel
    else res.send(rows); // Skickar tillbaka listan med växter som JSON
  });
});

// Route: Hämta en specifik växt med ID
server.get("/plants/:id", (req, res) => {
  const id = req.params.id; // Hämtar id från URL-parametern
  const sql = "SELECT * FROM plants WHERE id = ?"; // Parametriserad SQL-fråga för säkerhet
  db.get(sql, [id], (err, row) => {
    // db.get används när en rad förväntas
    if (err) res.status(500).send(err); // Skickar 500-fel vid problem
    else res.send(row); // Skickar tillbaka växtens data som JSON
  });
});

// Route: Lägg till en ny växt
server.post("/plants", (req, res) => {
  const plant = req.body; // Hämtar data från klientens POST-request
  const sql =
    "INSERT INTO plants(name, species, water, height, color) VALUES (?,?,?,?,?)";
  // db.run används för att köra INSERT, UPDATE eller DELETE
  db.run(
    sql,
    [plant.name, plant.species, plant.water, plant.height, plant.color],
    (err) => {
      if (err) res.status(500).send(err); // Skickar 500-fel vid problem
      else res.send({ message: "Växten sparades" }); // Bekräftelsemeddelande till klienten
    }
  );
});

// Route: Uppdatera en befintlig växt
server.put("/plants", (req, res) => {
  const plant = req.body; // Hämtar uppdaterad data från klienten
  const sql =
    "UPDATE plants SET name=?, species=?, water=?, height=?, color=? WHERE id=?";
  db.run(
    sql,
    [
      plant.name,
      plant.species,
      plant.water,
      plant.height,
      plant.color,
      plant.id,
    ],
    (err) => {
      if (err) res.status(500).send(err); // Skickar 500-fel vid problem
      else res.send({ message: "Växten uppdaterades" }); // Bekräftelsemeddelande
    }
  );
});

// Route: Ta bort en växt med ID
server.delete("/plants/:id", (req, res) => {
  const id = req.params.id; // Hämtar id från URL
  const sql = "DELETE FROM plants WHERE id=?"; // SQL DELETE-fråga
  db.run(sql, [id], (err) => {
    if (err) res.status(500).send(err); // Skickar 500-fel om något går fel
    else res.send({ message: "Växten togs bort" }); // Bekräftelse till klienten
  });
});
