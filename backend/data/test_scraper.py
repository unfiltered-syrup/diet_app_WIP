from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import urllib.request, json
import os
import pandas as pd
import random

def get_recipe(url):
    ua_str = UserAgent().chrome
    resp = requests.get(url,allow_redirects=True,headers={"User-Agent": ua_str} )
    soup = BeautifulSoup(resp.text, 'html.parser')
    get_img(soup)

def get_img(soup):
    ua_str = UserAgent().chrome
    img_div = soup.find_all('div', class_="hero-wrapper")[0]
    img_urls = img_div.findChildren("img", recursive=False)
    for img_url in img_urls:
        print(img_url)
        download_url = img_url.get('src')
        r = requests.get(download_url,allow_redirects=True,headers={"User-Agent": ua_str, 'referer': "https://www.google.com/"})
        with open('test_images/'+name+'.jpg', 'wb') as f:
            f.write(r.content)
            print('fetched')
name = "test_recipe1"
get_recipe('https://www.jamieoliver.com/recipes/vegetable-recipes/kunde/')
