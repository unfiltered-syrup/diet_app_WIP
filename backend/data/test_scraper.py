from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import urllib.request, json
import os
import pandas as pd
import random
import re
import time

def get_recipe(url, name, site):
    ua_str = UserAgent().chrome
    resp = requests.get(url,allow_redirects=True,headers={"User-Agent": ua_str} )
    soup = BeautifulSoup(resp.text, 'html.parser')
    get_img(soup, name, site)

def get_img(soup, name, site):
    ua_str = UserAgent().chrome
    try:
        img_div = soup.find_all('div', class_="hero-wrapper")[0]
    except:
        name = name.lower()
        url = site+name
        resp = requests.get(url,allow_redirects=True,headers={"User-Agent": ua_str} )
        soup = BeautifulSoup(resp.text, 'html.parser')
        img_div = soup.find_all('div', class_="hero-wrapper")[0]
    img_urls = img_div.findChildren("img", recursive=False)
    for img_url in img_urls:
        print(img_url)
        download_url = img_url.get('src')
        r = requests.get(download_url,allow_redirects=True,headers={"User-Agent": ua_str, 'referer': "https://www.google.com/"})
        with open('test_images/'+name+'.jpg', 'wb') as f:
            f.write(r.content)
            print('fetched')
    get_recipe_data(soup, name)

def get_recipe_data(soup, name):
    recipe_div = soup.find_all('ul', class_="ingred-list")[0]
    ingreds = recipe_div.findChildren("li", recursive=False)
    recipe_str = ""
    for ingred in ingreds:
        recipe_str = recipe_str + re.sub(' +', ' ', ingred.text) + ';'
    print(f"Recipe Data For {name}:")
    print(recipe_str)
    print('------------------------------------------------------------')
    #TODO put recipe_str in database

def get_jaimie_oliver(recipe_type):
    site = 'https://www.jamieoliver.com/recipes/' + recipe_type
    ua_str = UserAgent().chrome
    req = requests.get(site,allow_redirects=True,headers={"User-Agent": ua_str} )
    main_soup = BeautifulSoup(req.text, 'html.parser')
    recipe_names = main_soup.find_all('div', class_="recipe-title")
    for recipe_name in recipe_names:
        result = re.sub(' +', ' ', recipe_name.text)
        result = result.replace("’", '')
        result = result.replace("‘", '')
        result = result.replace("'", '-')
        result = re.sub("[(,)]", '', result)
        result = re.sub("[,.;@#?!&$]", '-', result)
        result = re.sub(" ", '-', result)
        result = re.sub('-+', '-', result)
        wait_time = random.randint(2, 6)
        print(f"waiting for {wait_time} seconds before requesting for {result}")
        get_recipe(site+result, result, site)
        time.sleep(wait_time)



get_jaimie_oliver('chicken-recipes/')
#get_recipe('https://www.jamieoliver.com/recipes/vegetable-recipes/kunde/')
#get_jaimie_oliver('vegetable-recipes/')
