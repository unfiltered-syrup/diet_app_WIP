import pandas as pd 
import sqlite3
import numpy as np

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

def get_ingredients():
    conn = get_db('recipe')

    cur = conn.cursor()
    cur.execute("SELECT * FROM recipes")
    rows = cur.fetchall()
    conn.close()
    data = [dict(row) for row in rows]
    df = pd.DataFrame(data)
    return df


def get_measurement_unit(ingredients):
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
            if word.isnumeric(): #identify if the word is a number
                print('found number: ', word)
                num = word
            elif word in abbreviations or word in measurement_units: #identify if word is a unit
                print('found unit: ', word)
                unit = word
            elif num and unit: #if the unit and number have been identified, the rest of the word is treated as ingredient
                item = item + ' ' + word

            if len(item) > 2:
                all_ingreds.append({'ingredient': item, 'unit':unit, 'num':num})
        if item == '': #if the ingredient is empty, manually input the data
            print('item is empty: ', ingred)
            num = input("Enter number(type 's' to skip, type 'd' to default): ")
            if num == 's':
                continue
            unit = input("Enter unit(type 's' to skip, type 'd' to default): ")
            item = input("Enter ingredient(type 's' to skip): ")
            if item != 's':
                all_ingreds.append({'ingredient': item, 'unit':unit, 'num':num})

    result = []
    for i in range(len(all_ingreds)):
        if i < len(all_ingreds) - 1:
            if all_ingreds[i]['ingredient'] not in all_ingreds[i+1]['ingredient']:
                result.append(all_ingreds[i])
        else:
            result.append(all_ingreds[i])
    
    result = pd.DataFrame(result)
    print(result)

get_measurement_unit(get_ingredients().iloc[0]['ingredients'])