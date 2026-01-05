# gik339-grupp15-projekt

Ett litet växtregister för kursen "Dynamiska Webbapplikationer" — CRUD-api med enkel webbkliens.

## Snabbstart ✅

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
