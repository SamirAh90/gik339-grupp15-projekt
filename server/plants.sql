-- Tar bort tabellen "plants" om den redan finns, för att kunna skapa en ny
DROP TABLE IF EXISTS plants;

-- Skapar tabellen "plants" om den inte redan finns
CREATE TABLE IF NOT EXISTS plants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unikt ID som ökar automatiskt
    name TEXT NOT NULL,                     -- Växtens namn (obligatoriskt)
    species TEXT NOT NULL,                  -- Typ av växt (obligatoriskt)
    water TEXT NOT NULL,                    -- Vattenbehov (obligatoriskt)
    height INTEGER NOT NULL,                -- Höjd i cm (obligatoriskt)
    color TEXT NOT NULL                     -- Växtens färg (obligatoriskt)
);

-- Lägger till exempeldata i tabellen
INSERT INTO plants (name, species, water, height, color) VALUES
('Monstera', 'Grönväxt', 'Lagom', 80, 'Grön'),
('Rosenkalla', 'Blommande', 'Mycket', 45, 'Röd'),
('Guldpalm', 'Träd', 'Mycket', 120, 'Guld'),
('Kaktus', 'Kaktus', 'Lite', 15, 'Grön'),
('Lavendel', 'Kryddväxt', 'Lite', 30, 'Lila'),
('Orkidé', 'Blommande', 'Lite', 50, 'Vit'),
('Pelargon', 'Blommande', 'Lagom', 25, 'Rosa'),
('Aloe Vera', 'Suckulent', 'Lite', 20, 'Grön'),
('Solros', 'Blommande', 'Mycket', 150, 'Gul'),
('Murgröna', 'Grönväxt', 'Lagom', 200, 'Grön');

-- Exempel på gamla DROP TABLE-kommandon (kommenterade)
-- DROP TABLE res;
-- DROP TABLE IF EXISTS res;

-- Hämtar all data från tabellen för att se innehållet
SELECT * FROM plants;
