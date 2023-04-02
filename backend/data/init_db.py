import sqlite3
conn = sqlite3.connect('database.db')

with open('schema.sql') as f:
    conn.executescript(f.read())

cur = conn.cursor()

cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)", ('Test Post', 'This is a test. Only a test.'))
cur.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", ('admin', 'password', 'jw6058@nyu.edu'))
conn.commit()
conn.close()