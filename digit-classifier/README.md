# Handwritten Digit Classifier

A web app that predicts handwritten digits (0-9) using a neural network I trained myself.

## What it does
- Click squares on an 8x8 grid to "draw" a digit
- Click Predict to send the grid to the trained model
- See the predicted digit and the model's confidence

## Tech Stack
- **Model:** scikit-learn `MLPClassifier` (a basic neural network), trained on the
  built-in `digits` dataset (1,797 handwritten digit images, 8x8 pixels each)
- **Backend:** Python (Flask)
- **Frontend:** HTML, CSS, JavaScript (no frameworks)

## How it works
1. `train_model.py` trains a small neural network on the digits dataset and saves
   it to `model.pkl`
2. `app.py` loads that saved model and exposes a `/predict` route
3. The frontend grid is just 64 clickable squares - each one represents a pixel
   (0 = blank, 16 = fully inked in), matching the scale the model was trained on
4. When you click Predict, the 64 values are sent to `/predict`, and the model
   returns its best guess plus a confidence percentage

## How to run it
1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Train the model (only needs to be done once - this creates `model.pkl`):
   ```
   python train_model.py
   ```
3. Run the app:
   ```
   python app.py
   ```
4. Open your browser to `http://127.0.0.1:5000`

## Model accuracy
About 98% on the test set held out from the training data.

## A note on accuracy in practice
The model scores well on the training data because it was trained on clean,
centered 8x8 digit images. When you draw a digit yourself by clicking squares,
predictions can be less reliable — 8x8 is a very low resolution (each square is
a big chunk of the image), so small differences in how you draw a shape can
throw off the prediction. This is a good example of the gap between test-set
accuracy and real-world input: the data you draw by hand doesn't perfectly
match the shape and style of the training images.

## Possible improvements
- Use a full-size (28x28) MNIST dataset for higher resolution digits
- Let users draw freehand with the mouse instead of clicking a fixed grid
- Show a bar chart of confidence across all 10 digits, not just the top pick
