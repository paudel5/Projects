# train_model.py
# This script trains a small neural network to recognize handwritten digits (0-9)
# and saves it to a file so the web app can load it later without retraining.
#
# Dataset: scikit-learn's built-in "digits" dataset - 1,797 images of handwritten
# digits, each one an 8x8 grid of grayscale pixel values (0-16).

from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
digits = load_digits()
X = digits.data      # each row is 64 numbers (8x8 pixels flattened into one row)
y = digits.target    # the correct digit (0-9) for each image

# Split into a training set and a test set, so we can check how well
# the model does on images it has never seen before
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Build a simple neural network:
# - one hidden layer with 64 neurons
# - trains for up to 300 passes over the data
model = MLPClassifier(hidden_layer_sizes=(64,), max_iter=300, random_state=42)

print("Training model...")
model.fit(X_train, y_train)

# Check accuracy on the test set (data the model didn't train on)
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Test accuracy: {accuracy * 100:.2f}%")

# Save the trained model to a file so app.py can load it later
joblib.dump(model, "model.pkl")
print("Model saved to model.pkl")
