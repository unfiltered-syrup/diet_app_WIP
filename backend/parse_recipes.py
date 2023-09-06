import pandas as pd 
import sqlite3
import numpy as np
from fuzzywuzzy import process
import re


def get_db(dbname):
    conn = sqlite3.connect('data/'+ dbname +'.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_features():
    conn = get_db('recipe')

    cur = conn.cursor()
    cur.execute("SELECT * FROM features")
    rows = cur.fetchall()
    conn.close()
    data = [dict(row) for row in rows]
    df = pd.DataFrame(data)
    return df

def get_recipes():
    conn = get_db('recipe')

    cur = conn.cursor()
    cur.execute("PRAGMA table_info(recipes)")
    columns = [column[1] for column in cur.fetchall()]
    if 'encoding' not in columns:
        cur.execute("ALTER TABLE recipes ADD COLUMN encoding TEXT")
    cur.execute("SELECT * FROM recipes")
    rows = cur.fetchall()
    conn.close()
    data = [dict(row) for row in rows]
    df = pd.DataFrame(data)
    return df

def is_float(s):
    return re.fullmatch(r"[-+]?\d+\.\d+|\d+", s) is not None

def get_unit_quantities(ingredients):
    #create a list of all measurement units
    measurement_units = [
        'Gram', 'Kilogram', 'Milliliter', 'Liter', 'Centiliter', 'Deciliter',
        'Ounce', 'Pound', 'Fluid Ounce', 'Pint', 'Quart', 'Gallon', 'Cup', 'Teaspoon', 
        'Tablespoon', 'Dash', 'Pinch', 'Smidgen', 'Drop', 'Stick', 'Slice', 'Piece', 
        'Bundle', 'Bunch', 'Whole', 'Half', 'Quarter', 'Eighth', 'Scoop', 'Packet', 
        'Sheet', 'Sprig', 'Clove', 'Wedge', 'Cube', 'Nibble', 'Handful', 'Dollop', 
        'Splash', 'Knob', 'Sprigs'
    ]

    abbreviations = [
        'g', 'kg', 'ml', 'L', 'cl', 'dl', 
        'oz', 'lb', 'fl oz', 'pt', 'qt', 'gal', 'c', 'tsp', 
        'tbsp', 'dash', 'pinch', 'smdg', 'dr', 'stick', 'slice', 'piece', 
        'bundle', 'bunch', 'whole', 'half', 'quarter', 
        'eighth', 'scoop', 'pkt', 'sheet', 'sprig', 'clove', 
        'wedge', 'cube', 'nibble', 'handful', 'dollop', 'splash', 'knob', 'sprigs'
    ]

    all_ingreds = []
    for ingred in ingredients.split(';'): #iterate through each ingredient
        item = ''
        num = False
        unit = False
        for word in ingred.split(' '): #parse each word in the ingredient
            print("parsing: ", word)
            if word.isnumeric() or is_float(word): #identify if the word is a number
                print('found number: ', word)
                num = word
            elif word in abbreviations or word in measurement_units or word.capitalize() in measurement_units or word[:-1] in measurement_units or word[:-1].capitalize() in measurement_units: #identify if word is a unit
                print('found unit: ', word)
                unit = word
            elif num and unit: #if the unit and number have been identified, the rest of the word is treated as ingredient
                item = item + ' ' + word

            if len(item) > 2:
                all_ingreds.append({'ingredient': item, 'unit':unit, 'num':num})
        if item == '': #if the ingredient is empty, manually input the data
            if ingred != '' or ingred != ' ':
                print('item is empty: ', ingred)
                num = input("Enter number(type 's' to skip, type 'd' to default): ")
                if num == 's':
                    continue
                unit = input("Enter unit(type 's' to skip, type 'd' to default): ")
                item = input("Enter ingredient(type 's' to skip): ")
                if item != 's':
                    all_ingreds.append({'ingredient': item, 'unit':unit, 'num':num})
        print('---------------------8')

    result = []
    for i in range(len(all_ingreds)):
        if i < len(all_ingreds) - 1:
            if all_ingreds[i]['ingredient'] not in all_ingreds[i+1]['ingredient']:
                result.append(all_ingreds[i])
        else:
            result.append(all_ingreds[i])
    
    result = pd.DataFrame(result)
    print(result)
    return result

def create_new_feature(feature_name, group_id):
    conn = get_db('recipe')
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM features")
    row_count = cur.fetchone()[0]
    cur.execute("INSERT INTO features (id, name, fdc_id, group_id) VALUES (?, ?, ?, ?)", (row_count+1, feature_name, 'none', group_id))
    conn.commit()
    conn.close()

def save_recipe_binary(recipe_id, feature_encoding):
    conn = get_db('recipe')
    cur = conn.cursor()
    cur.execute("UPDATE recipes SET encoding = ? WHERE id = ?",(feature_encoding, recipe_id+1))
    conn.commit()
    conn.close()


def generate_binary_array(features, top_matches, best_match, score, index, row, feature_arr):
    print('---------------------')
    print('item: ', row['ingredient'],'|', 'best match: ', best_match, 'score: ', score, 'index: ', index)
    decision = input("Is this a match? (y/n): ") 
    if decision == 'y':
        print('this is a match')
        best_match_index = features[features['name']==best_match].index[0]
        feature_arr[best_match_index] = 1
    elif decision == 's':
        print('skipping this match')
    else:
        iter = 0
        try: 
            while decision != 'y': #iterate through top matches until a match is found
                iter += 1
                print("how about this?:")
                print(top_matches[iter])
                decision = input("Is this a match? (y/n): ")
                if decision == 'y':
                    best_match = top_matches[iter]
                    best_match_index = features[features['name']==best_match].index[0]
                    feature_arr[best_match_index] = 1
        except IndexError:
            print("no more matches") #if no more matches, ask user to save to features
            #m for manual save, which asks for input of new feature name and group id
            #a for automatic save, which asks for input of group id
            save_to_features = input("Save to features? (m for manual save, a for automatic save, n for not save): ")
            if save_to_features == 'm':
                new_feature_name = input("Enter new feature name: ")
                group_id = input("Enter group id: ")
                create_new_feature(new_feature_name, group_id)
                feature_arr = np.concatenate((feature_arr, np.array([1])))
            elif save_to_features == "a":
                group_id = input("Enter group id: ")
                create_new_feature(row['ingredient'], group_id)
                feature_arr = np.concatenate((feature_arr, np.array([1])))
            elif save_to_features == "n":
                print("not saving this feature")
            decision = 'y'
    return feature_arr

def match_to_features(unit_quantities_df):
    features = get_features()
    feature_arr = np.zeros(len(features))
    for index, row in unit_quantities_df.iterrows():
        print(row['ingredient'])
        #fuzzy string matching
        #best_match, score, score2 = process.extractOne(row['ingredient'], features['name'])
        top_matches = process.extract(row['ingredient'], features['name'], limit=5)
        best_match, score, score2 = top_matches[0]
        print("closest match:", best_match)
        print("confidence score: ",score)
        print('---------------------')
        best_match_index = features[features['name']==best_match].index[0]
        print(best_match_index, best_match, features.iloc[best_match_index]['name'])
        if(score < 90):
            feature_arr = generate_binary_array(features, top_matches, best_match, score, index, row, feature_arr)
            features = get_features()
        else:
            feature_arr[best_match_index] = 1
    return feature_arr
'''    print(feature_arr)
    for i in range(1, len(feature_arr)):
        if feature_arr[i] == 1:
            print(features.iloc[i]['name'], '/', i)'''


def parse_all_recipes(starting_position): #parse recipes from database
    recipes = get_recipes()
    for index, row in recipes.iterrows():
        if index >= starting_position:
            feature_arr = match_to_features(get_unit_quantities(row['ingredients']))
            feature_encoding = ''.join(str(feature_arr)) #convert array to string
            save_recipe_binary(index, feature_encoding) #save to database

parse_all_recipes(10)