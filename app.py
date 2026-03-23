from flask import Flask, render_template, jsonify, request
import requests
import os

app = Flask(__name__)

# In-memory storage (resets on restart - normal)
jokes = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_joke")
def get_joke():
    try:
        url = "https://official-joke-api.appspot.com/random_joke"
        res = requests.get(url, timeout=3)
        data = res.json()

        joke = data["setup"] + " 😂 " + data["punchline"]
        return jsonify({"joke": joke})

    except:
        return jsonify({"joke": "Joke API failed 😅 Try again!"})


def save_joke():
    data = request.get_json()

    # SAFE extraction
    joke = str(data.get("joke", "")).strip()

    # Ignore invalid / short data
    if len(joke) < 5:
        return jsonify({"message": "Invalid joke"}), 400

    jokes.append(joke)

    print("Saved:", joke)  # debug log

    return jsonify({"message": "Saved!"})

def saved():
    return render_template("saved.html", jokes=jokes)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)