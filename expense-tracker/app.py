# app.py
# This is the main Flask app for the expense tracker.
# It handles the web routes and talks to the SQLite database.

from flask import Flask, render_template, request, redirect, jsonify
import sqlite3
from datetime import date

app = Flask(__name__)
DB_NAME = "expenses.db"


def get_db_connection():
    # Opens a connection to our SQLite database file
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # lets us access columns by name
    return conn


def init_db():
    # Creates the expenses table if it doesn't already exist
    conn = get_db_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


@app.route("/")
def index():
    # Show the main page with the list of expenses
    conn = get_db_connection()
    expenses = conn.execute("SELECT * FROM expenses ORDER BY date DESC").fetchall()
    conn.close()

    # Add up the total so we can show it on the page
    total = sum(row["amount"] for row in expenses)

    return render_template("index.html", expenses=expenses, total=total)


@app.route("/add", methods=["POST"])
def add_expense():
    # Grab the form data the user submitted
    description = request.form.get("description")
    amount = request.form.get("amount")
    category = request.form.get("category")
    expense_date = request.form.get("date") or str(date.today())

    # Basic validation - make sure required fields aren't empty
    if not description or not amount or not category:
        return redirect("/")

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?)",
        (description, float(amount), category, expense_date)
    )
    conn.commit()
    conn.close()

    return redirect("/")


@app.route("/delete/<int:expense_id>", methods=["POST"])
def delete_expense(expense_id):
    # Remove one expense by its id
    conn = get_db_connection()
    conn.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
    conn.commit()
    conn.close()

    return redirect("/")


@app.route("/summary")
def summary():
    # Returns total spending per category as JSON, used to build the chart
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT category, SUM(amount) as total FROM expenses GROUP BY category"
    ).fetchall()
    conn.close()

    data = [{"category": row["category"], "total": row["total"]} for row in rows]
    return jsonify(data)


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
