from flask import Flask, send_from_directory, jsonify, request, session, flash, make_response ,redirect, url_for
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
import sqlite3
import os
from flask_session import Session
from dotenv import load_dotenv
import json

# for register
import re

load_dotenv(".flaskenv")
app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'AKFJAJ1K23231KHIHII22355123K'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config.from_object(__name__)
Session(app)
CORS(app, supports_credentials=True)
api = Api(app)

def get_db(dbname):
    conn = sqlite3.connect('data/'+ dbname +'.db')
    conn.row_factory = sqlite3.Row
    return conn

#create new user preference entry in db when registering
def create_user_db(username):
    conn = get_db('Preference')
    cur = conn.cursor()
    cur.execute("""INSERT INTO user_preference (user_name) VALUES (?)""", (username,))
    conn.commit()
    conn.close()

# for register
def check_email(email) -> bool:
    # email format
    # xxxxxx@xxx.xxx
    #regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    #updated regular expression to contain more characters
    regex = r'\b[a-zA-Z0-9!?*%@#~{|}$&()\\-`.+,/\"]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    result = re.fullmatch(regex, email)
    return result

def check_password(password) -> bool:
    numeric = False
    upper = False
    lower = False
    if len(password) >= 10:
        for element in password:
            if element.isnumeric():
                numeric = True
            elif element.islower():
                lower = True
            elif element.isupper():
                upper = True
        return upper, lower, numeric

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

class HelloApiHandler(Resource):
    def get(self):
        return {'hello': 'world'}


@app.route('/api/data')
def get_data():
    conn = get_db()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    data = [dict(row) for row in posts]
    return jsonify(data)

@app.route('/api/session')
def get_session():
    print(session.get('username'))
    print(app.config['SECRET_KEY'])
    if 'username' in session:
        return jsonify({"username": session['username'],
                        ['userdata']: session['userdata']})
    return jsonify({"username": ''})


@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        name = request.json['name']
        password = request.json['password']
        conn = get_db('database')
        cur = conn.cursor()
        #print('post triggered')
        try:
            cur.execute("SELECT * FROM users WHERE username = ? AND password = ?", (name, password))
            user = cur.fetchone()
            if user is not None:
                print('Username found')
                session['logged_in'] = True
                session['username'] = name
                cur.execute("SELECT email FROM users WHERE username = ?", (name, ))
                email = cur.fetchone()[0]
                session['userdata'] = json.dumps({'username': name, 'password': password, 'email': email})
                session.modified = True
                print(session['username'] + ' is logged in')
                conn.close()
                response = make_response(jsonify({"success": 'True'}))
                response.set_cookie('isLoggedIn', 'True')
                response.set_cookie('userdata', json.dumps({'username': name, 'password': password, 'email': email}))
                return response
        except:
            conn.rollback()
        conn.close()
    return jsonify({"success": 'False'})

@app.route("/api/register", methods=['POST'])
def register():
    if request.method == 'POST':
        name = request.json['name']
        password = request.json['password']
        email = request.json['email']
        conn = get_db('database')
        cur = conn.cursor()        
        #check validity of email
        email_validity = check_email(email)
        if(not email_validity):
            response = make_response(jsonify({"success": 'False', "message": "invalid email address"}))
            return response
        password_validity = check_password(password)

        #check if password contains uppercase, lowercase, and numbers, then returns appropriate message
        msg = ''
        if(password_validity!=None):
            if(not password_validity[0]):
                msg = "Uppercase letters are required for passwords"
            elif(not password_validity[1]):
                msg = "Lowercase letters are required for passwords"
            elif(not password_validity[2]):
                msg = 'Numeric values are required for password'
        else:
            msg = "Password must be at least 10 digits long"

        if(msg == ''):
            try:
                cur.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", (name, password, email))
                conn.commit()
                conn.close()
                session['logged_in'] = True
                session['username'] = name
                session['userdata'] = json.dumps({'username': name, 'password': password, 'email': email})
                response = make_response(jsonify({"success": 'True'}))
                response.set_cookie('isLoggedIn', 'True')
                response.set_cookie('userdata', json.dumps({'username': name, 'password': password, 'email': email}))
                create_user_db(name)
                return response
            except:
                conn.rollback()
            conn.close()
    response = make_response(jsonify({"success": 'False', "message": msg}))
    return response

@app.route("/api/logout", methods=['POST'])
def logout():
    if request.method == 'POST':
        print("logout triggered")
        session.pop('username', None)
        session.pop('logged_in', None)
        print('session popped')
        response = make_response(jsonify({"success": 'True'}))
        response.set_cookie('isLoggedIn', 'False')
        return response
    return ('', 405)

@app.route("/api/cuisinelist")
def get_cuisine_list():
    conn = get_db('cuisine')
    cur = conn.cursor()
    cur.execute("SELECT cuisineType FROM cuisines")
    cuisines = cur.fetchall()
    conn.close()
    data = [dict(row) for row in cuisines]
    return [item['cuisineType'] for item in data]

if __name__ == '__main__':
    app.run(debug=True)