# gik339-grupp15-projekt

Ett litet växtregister för kursen "Dynamiska Webbapplikationer" — CRUD-api med enkel webbkliens.

## Snabbstart 

1. Installera beroenden:

```bash
npm install
cd server
npm install
```

2. Starta servern i utvecklingsläge (från repo-roten):

```bash
npm --prefix server run dev
```

3. Öppna klienten:

- Öppna `client/index.html` i din webbläsare (eller använd en lokal server).

## Skript

- `npm --prefix server run dev` — starta servern med `nodemon` (auto-restart)
- `npm --prefix server run start` — starta servern med `node` i produktion

## API (exempel)

- GET /plants — hämta alla växter
- GET /plants/:id — hämta en växt
- POST /plants — skapa en växt, skicka JSON { name, species, water, height, color }
- PUT /plants — uppdatera en växt, skicka JSON { id, name, species, water, height, color }
- DELETE /plants/:id — ta bort en växt

Exempel med curl:

```bash
# Hämta alla
curl http://localhost:3000/plants

# Skapa
curl -X POST http://localhost:3000/plants -H "Content-Type: application/json" -d '{"name":"Äpple","species":"Träd","water":"Lagom","height":150,"color":"Grön"}'
```

## Utveckling & Styling

- Klienten ligger i `client/` och använder Bootstrap samt `style.css`.

5. AI-användning

I detta projekt har vi använt AI för att visa delar:

Skriva utkast kommentarer på kod
Prompt: "Lägg till kommentarer på svenska i denna del av kod som förklarar vad den gör"
Svar: "// Hämtar alla växter från servern", "// Skickar GET-request till API" och vidare...

Planera och hjälpa till med att skriva utkast på kravspecifikationen
Prompt: "Beskriv ett användarfall för en webbapplikation där användaren kan lägga till, redigera och ta bort växter i ett register. Beskriv steg för steg vad som ska hända och vilka fält som behövs."
Svar: "Användarfall: Hantera växter i ett register

Mål: Användaren ska kunna lägga till, redigera och ta bort växter.

Steg-för-steg:

Öppna webbapplikationen – användaren ser en lista med befintliga växter.

Lägg till växt – användaren klickar på "Lägg till växt" och fyller i följande fält:

Namn

Typ ()

Vattenbehov ()

Höjd ()

Färg

Spara växten – systemet sparar växten i databasen och visar den i listan.

Redigera växt – användaren klickar på "Ändra" på en befintlig växt, ändrar fälten och sparar uppdateringen.

Ta bort växt – användaren klickar på "Ta bort" och bekräftar; systemet tar bort växten från listan.

Lista uppdateras – efter varje ändring uppdateras listan automatiskt för att visa korrekt information."

Hjälp med mätning och förslag på bäst design av CSS
Prompt: "Hur kan jag använda flexbox för att centrera kort i en rad med jämnt mellanrum?"
Vi använde dessa förslag som utgångspunkt och justerade färger, transparens och typografi för att matcha projektets designmål.

"/_ Container för korten _/
.card-container {
display: flex; /_ Aktiverar flexbox _/
justify-content: space-between; /_ Jämnt mellanrum mellan korten _/
align-items: center; /_ Vertikal centrering av korten _/
flex-wrap: wrap; /_ Flyttar kort till nästa rad om det inte får plats _/
gap: 20px; /_ Extra mellanrum mellan korten (valfritt) _/
div class="card-container"
}"

Projektet refereras som GIK339 - Grupp 15.

