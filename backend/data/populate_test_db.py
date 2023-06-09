# used to populate two database
# test_preference.db is test user_preference database with 1000 users and each with one 1*1000 preference vec
# test_recipe.db is test recipe database with 1000 recipes and each with one 1*1000 vec

import sqlite3
import os
import random

# Function to generate a random preference vector
def generate_preference_vector():
    preference = [random.choice([0, 1]) for _ in range(1000)]
    return preference

# Get the current directory
current_directory = os.path.dirname(os.path.abspath(__file__))

# Specify the path for the databases
database_path = current_directory

# Generate test_preference.db
preference_db_path = os.path.join(database_path, 'test_preference.db')
preference_conn = sqlite3.connect(preference_db_path)
preference_cursor = preference_conn.cursor()

# Create table for users with columns user_name and preference_vector
preference_cursor.execute('''CREATE TABLE users (
                                user_name TEXT,
                                preference_vector TEXT
                            )''')

# Generate 1000 users with random preference vectors
for i in range(1000):
    user_name = f'user_{i}'
    preference_vector = ' '.join(str(bit) for bit in generate_preference_vector())

    # Insert user data into the table
    preference_cursor.execute('INSERT INTO users VALUES (?, ?)', (user_name, preference_vector))

preference_conn.commit()
preference_conn.close()

# Generate test_recipe.db
recipe_db_path = os.path.join(database_path, 'test_recipe.db')
recipe_conn = sqlite3.connect(recipe_db_path)
recipe_cursor = recipe_conn.cursor()

# Create table for recipes with columns id, name, and preference_vector
recipe_cursor.execute('''CREATE TABLE recipes (
                            id INTEGER PRIMARY KEY,
                            name TEXT,
                            preference_vector TEXT
                        )''')

# Generate 1000 recipes with random preference vectors
for i in range(1000):
    recipe_id = i + 1
    recipe_name = f'recipe_{i}'
    preference_vector = ' '.join(str(bit) for bit in generate_preference_vector())

    # Insert recipe data into the table
    recipe_cursor.execute('INSERT INTO recipes VALUES (?, ?, ?)', (recipe_id, recipe_name, preference_vector))

recipe_conn.commit()
recipe_conn.close()

print("Databases generated successfully.")
