CREATE TABLE res (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    color TEXT
);

INSERT INTO res (id, firstName, lastName, username, color) VALUES
(1, 'Zena', 'Zulauf', 'Katlynn_Brekke', 'green'),
(2, 'Muhammad', 'Torphy', 'Martina39', 'gray'),
(3, 'Carlee', 'Tromp', 'Carmen37', 'purple'),
(4, 'Taylor', 'Shanahan', 'Doyle_Legros81', 'red'),
(5, 'Estell', 'Reichel', 'Santiago.Dibbert', 'red'),
(6, 'Reece', 'Stehr', 'Destany75', 'red'),
(7, 'Kiarra', 'Beier', 'Edison87', 'yellow'),
(8, 'Alberto', 'Gibson', 'Marianna_Collins', 'green'),
(9, 'Johanna', 'Bashirian', 'Mervin.Grant', 'yellow'),
(10, 'Thalia', 'Kozey', 'Ashley22', 'yellow');

-- DROP TABLE res;
-- DROP TABLE IF EXISTS res;


select * from res;
