from flask import Flask, send_from_directory, jsonify, request, session, flash, make_response ,redirect, url_for
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
import sqlite3
import os
from flask_session import Session
from dotenv import load_dotenv

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

def get_db():
    conn = sqlite3.connect('data/database.db')
    conn.row_factory = sqlite3.Row
    return conn

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
        return jsonify({"username": session['username']})
    return jsonify({"username": ''})


@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        name = request.json['name']
        password = request.json['password']
        conn = get_db()
        cur = conn.cursor()
        print('post triggered')
        try:
            cur.execute("SELECT * FROM users WHERE username = ? AND password = ?", (name, password))
            user = cur.fetchone()
            if user is not None:
                print('Username found')
                session['logged_in'] = True
                session['username'] = name
                session.modified = True
                print(session['username'])
                conn.close()
                response = make_response(jsonify({"success": 'True'}))
                response.set_cookie('isLoggedIn', 'True')
                return response
        except:
            conn.rollback()
        conn.close()
    return jsonify({"success": 'False'})

@app.route("/api/register", methods=['POST'])
def register():
    return jsonify({"success": 'True'})

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

if __name__ == '__main__':
    app.run(debug=True)