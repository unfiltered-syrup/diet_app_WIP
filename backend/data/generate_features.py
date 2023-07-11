import pandas as pd
import sklearn
import random
from random import sample
import os


def initialize():
    file_path = 'food_data/fdc_data/food.csv'
    df = pd.read_csv(file_path)
    foods = pd.DataFrame(columns=df.columns)
    foods = pd.DataFrame(columns=df.columns)
    cat = -1 
    #keep only first two parts in description
    #keep only sample food
    for index, row in df.iterrows():
        row[2] = str(row[2])
        if row[2].split(',')[:2] not in foods['description'].to_list() and row[1]=='sample_food':
            row[2] = row[2].split(',')[:2]
            foods = pd.concat([foods, pd.DataFrame([row])],ignore_index=True)
        ##print(row[3])

    #TODO: In the future, keep the fdc id associated to the ingredients we decide to keep
    foods['parent'] = foods['description'].apply(lambda x:x[0] if x else None)
    ingredients_basic = foods['parent'].unique()
    #gets rid of brand names
    no_brand_name = [x.split('-')[1] if '- ' in x else x for x in ingredients_basic]
    #gets rid of () descriptions
    no_parenthesis = [x.split('(')[0] if '(' in x else x for x in no_brand_name]

    #get unique values, but ignore spaces when finding unique values
    unique_vals = {item.lower().replace(" ", ""): item for item in no_parenthesis}
    no_parenthesis_unique = list(unique_vals.values())
    no_parenthesis_unique = [item.lower() for item in no_parenthesis_unique]

    directory = os.getcwd()
    path = os.path.join(directory,'features_list.txt')
    with open(path, 'w') as f:
        f.write(';'.join(no_parenthesis_unique))

def generate_vegetarian_list():
    #TODO: generate a list of ingreidents allowed in a vegetarian diet
    return

#TODO: Do the same for other types of diets


initialize() #generate features list. It takes a while to write the files



    
