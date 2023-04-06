DROP TABLE IF EXISTS cuisines;

CREATE TABLE cuisines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cuisineType TEXT NOT NULL,
    cuisineParent TEXT NOT NULL
);

