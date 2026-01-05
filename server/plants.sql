
DROP TABLE IF EXISTS plants;

CREATE TABLE IF NOT EXISTS plants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    water TEXT NOT NULL,
    height INTEGER NOT NULL,
    color TEXT NOT NULL
);

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

-- DROP TABLE res;
-- DROP TABLE IF EXISTS res;


SELECT * FROM plants;