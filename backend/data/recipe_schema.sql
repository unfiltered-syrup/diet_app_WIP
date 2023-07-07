DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  preference_vector TEXT NOT NULL
);