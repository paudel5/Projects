# app.py
# Flask web app that loads the trained model and predicts digits
# drawn by the user on an 8x8 pixel grid in the browser.

from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the model we trained in train_model.py
model = joblib.load("model.pkl")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    # The frontend sends us a list of 64 numbers (an 8x8 grid flattened out),
    # where each number is how "dark" that pixel is (0 = blank, 16 = fully filled in)
    data = request.get_json()
    pixels = data.get("pixels")

    if not pixels or len(pixels) != 64:
        return jsonify({"error": "Expected 64 pixel values"}), 400

    # The model expects a 2D array (a list of samples), so we wrap our
    # one image in an extra list: [pixels] instead of just pixels
    image = np.array([pixels])

    prediction = model.predict(image)[0]

    # predict_proba gives us the confidence for each possible digit (0-9)
    probabilities = model.predict_proba(image)[0]
    confidence = round(max(probabilities) * 100, 1)

    return jsonify({
        "digit": int(prediction),
        "confidence": confidence
    })


if __name__ == "__main__":
    app.run(debug=True)
