from flask import Flask, render_template, jsonify, request, redirect
import requests
import sqlite3

app = Flask(__name__)


def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS jokes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_joke")
def get_joke():
    url = "https://official-joke-api.appspot.com/random_joke"
    res = requests.get(url).json()
    joke = res["setup"] + " 😂 " + res["punchline"]
    return jsonify({"joke": joke})

@app.route("/save_joke", methods=["POST"])
def save_joke():
    joke = request.json["joke"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO jokes (content) VALUES (?)", (joke,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Saved!"})

@app.route("/saved")
def saved():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jokes")
    jokes = cursor.fetchall()
    conn.close()

    return render_template("saved.html", jokes=jokes)

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)