import create_cuisine_tree
import sqlite3

def get_db():
    conn = sqlite3.connect('cuisine.db')
    return conn

def create_cuisine_db():
    conn = get_db()
    cur = conn.cursor()
    root = create_cuisine_tree.get_tree()
    cuisines = create_cuisine_tree.get_all_children(root)
    for cuisine in cuisines:
        if cuisine.parent is not None:
            print(f"Cuisine name: {cuisine.name}, cuisine parent: {cuisine.parent.name}")
            cur.execute("INSERT INTO cuisines (cuisineType, cuisineParent) VALUES (?, ?)", (cuisine.name, cuisine.parent.name))
    conn.commit()
    conn.close()

create_cuisine_db()