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

def generate_random_user_data(allergic_to, likes, disklikes):
    df = get_features()
    user_pref_allergy = np.where(df['group_id'] == allergic_to, 1, 0)
    conditions = [(df['group_id'] == likes), (df['group_id'] == disklikes)]
    choices = [1, -1]
    user_pref_general = np.select(conditions, choices, default=0)
    print(user_pref_allergy)
    print(user_pref_general)

generate_random_user_data(10, 9, 14)

#TODO fill in 0 values using other user data
#TODO pick top recipes


