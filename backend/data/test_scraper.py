from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import urllib.request, json
import os
import pandas as pd
import random
import re
import time
import sqlite3

# for test use
# empty images in the folder_path
def empty_image_folder(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                os.remove(file_path)

def get_recipe(url, name, site, original_name):
    ua_str = UserAgent().chrome
    resp = requests.get(url,allow_redirects=True,headers={"User-Agent": ua_str} )
    soup = BeautifulSoup(resp.text, 'html.parser')
    get_img(soup, name, site, original_name)

def get_img(soup, name, site, original_name):
    ua_str = UserAgent().chrome
    try:
        img_div = soup.find_all('div', class_="hero-wrapper")[0]
    except:
        try:
            name = name.lower()
            url = site+name
            resp = requests.get(url,allow_redirects=True,headers={"User-Agent": ua_str} )
            soup = BeautifulSoup(resp.text, 'html.parser')
            img_div = soup.find_all('div', class_="hero-wrapper")[0]
        except Exception as e:
            print("Error:", str(e))
            print('------------------------------------------------------------')
            return
    img_urls = img_div.findChildren("img", recursive=False)

    for img_url in img_urls:
        # print(img_url)
        download_url = img_url.get('src')
        r = requests.get(download_url,allow_redirects=True,headers={"User-Agent": ua_str, 'referer': "https://www.google.com/"})
        with open('test_images/'+name+'.jpg', 'wb') as f:
            f.write(r.content)
            print('fetched')
    get_recipe_data(soup, name, original_name, download_url)

def get_recipe_data(soup, name, original_name, img_url):
    saved_image_name = name + '.jpg'
    recipe_div = soup.find_all('ul', class_="ingred-list")[0]
    ingreds = recipe_div.findChildren("li", recursive=False)
    recipe_str = ""
    for ingred in ingreds:
        recipe_str = recipe_str + re.sub(' +', ' ', ingred.text) + ';'
    print(f"Recipe Data For {name}:")
    # print(recipe_str)
    # print('------------------------------------------------------------')
    # connect to the database
    conn = sqlite3.connect('recipe.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO recipes (name, image_name, url, ingredients) VALUES (?, ?, ?, ?)", (original_name, saved_image_name, img_url, recipe_str))
        print("db writing done")
    except sqlite3.Error as e:
        conn.rollback()
        print("SQLite error:", e)
    conn.commit()
    conn.close()
    print('------------------------------------------------------------')



def get_jaimie_oliver(recipe_type):
    site = 'https://www.jamieoliver.com/recipes/' + recipe_type
    ua_str = UserAgent().chrome
    req = requests.get(site,allow_redirects=True,headers={"User-Agent": ua_str} )
    main_soup = BeautifulSoup(req.text, 'html.parser')
    recipe_names = main_soup.find_all('div', class_="recipe-title")

    # for test use
    counter = 0 # counter for testing use only
    empty_image_folder('test_images')
     # connect to the database
    conn = sqlite3.connect('recipe.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    # clear the table first
    cur.execute("DELETE FROM recipes")
    #end for test use

    for recipe_name in recipe_names:
        # just scrap ten for testing
        # if counter < 3:
        #     counter += 1
        # else:
        #     break
        counter += 1

        # print("before:" + recipe_name.text)
        result = re.sub(' +', ' ', recipe_name.text)
        result = result.replace("’", '')
        result = result.replace("‘", '')
        result = result.replace("'", '-')
        result = re.sub("[(,)]", '', result)
        result = re.sub("[,.;@#?!&$]", '-', result)
        result = re.sub(" ", '-', result)
        result = re.sub('-+', '-', result)
        wait_time = random.randint(2, 6)
        # print('after:' + result)
        print('recipe No. ', counter)
        print(f"waiting for {wait_time} seconds before requesting for {result}")
        get_recipe(site+result, result, site, recipe_name.text)
        time.sleep(wait_time)



get_jaimie_oliver('chicken-recipes/')
#get_recipe('https://www.jamieoliver.com/recipes/vegetable-recipes/kunde/')
#get_jaimie_oliver('vegetable-recipes/')
