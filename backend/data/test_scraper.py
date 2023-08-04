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

def get_recipe(url, name, site): #get html of recipe page
    ua_str = UserAgent().chrome
    resp = requests.get(url,allow_redirects=True,headers={"User-Agent": ua_str} )
    soup = BeautifulSoup(resp.text, 'html.parser')
    get_img(soup, name, site) #get image of recipe page

def get_img(soup, name, site): #get image and save in folder
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
    get_recipe_data(soup, name, download_url)

def get_recipe_data(soup, name, img_url): #get recipe data and save in db
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
        cur.execute("INSERT INTO recipes (name, image_name, url, ingredients) VALUES (?, ?, ?, ?)", (name, saved_image_name, img_url, recipe_str))
        print("db writing done")
    except sqlite3.Error as e:
        conn.rollback()
        print("SQLite error:", e)
    conn.commit()
    conn.close()
    print('------------------------------------------------------------')



def get_jaimie_oliver(recipe_type):
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
    site = 'https://www.jamieoliver.com/recipes/' + recipe_type
    ua_str = UserAgent().chrome
    req = requests.get(site,allow_redirects=True,headers={"User-Agent": ua_str} )
    main_soup = BeautifulSoup(req.text, 'html.parser')
    recipe_block = main_soup.find_all('div', class_="recipe-block") #find all recipe block
    for recipe in recipe_block: #iterate through all recipes
        wait_time = random.randint(2, 6)
        # print('after:' + result)
        print('recipe No. ', counter)
        counter += 1
        for child in recipe.findChildren("a", recursive=False):
            print(child['href'])
            child_url = child['href'] #get anchor tag
            name = child_url.split('/')[-2] #get last portion of the url
            print(name)
            get_recipe(site+'/' + name, name, site)
        print(f"waiting for {wait_time} seconds before requesting again") #sleep
        time.sleep(wait_time)








get_jaimie_oliver('chicken-recipes/')
#get_recipe('https://www.jamieoliver.com/recipes/vegetable-recipes/kunde/')
#get_jaimie_oliver('vegetable-recipes/')
