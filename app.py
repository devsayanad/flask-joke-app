from flask import Flask, render_template, jsonify, request
import requests
import os

app = Flask(__name__)


jokes = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_joke")
def get_joke():
    try:
        url = "https://official-joke-api.appspot.com/random_joke"
        res = requests.get(url, timeout=5).json()
        joke = res["setup"] + " 😂 " + res["punchline"]
        return jsonify({"joke": joke})
    except:
        return jsonify({"joke": "Why did the server fail? 😂 Because it had too many bugs!"})

@app.route("/save_joke", methods=["POST"])
def save_joke():
    data = request.get_json()
    jokes.append(data["joke"])
    return jsonify({"message": "Saved!"})

@app.route("/saved")
def saved():
    return render_template("saved.html", jokes=jokes)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)