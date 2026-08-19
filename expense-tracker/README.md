# Expense Tracker

A simple web app for logging expenses and seeing where your money goes.

## What it does
- Add an expense with a description, amount, category, and date
- See a running total of everything you've spent
- See a bar chart of spending broken down by category
- Delete expenses you no longer want tracked

## Tech Stack
- **Backend:** Python (Flask)
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript (plain canvas for the chart, no chart library)

## How it works
- Flask serves the pages and handles form submissions
- Expenses are stored in a local SQLite database (`expenses.db`, created automatically the first time you run the app)
- The `/summary` route returns spending totals per category as JSON, which the frontend fetches and uses to draw a bar chart
- The chart is drawn manually using the HTML canvas API

## How to run it
1. Install Flask:
   ```
   pip install -r requirements.txt
   ```
2. Run the app:
   ```
   python app.py
   ```
3. Open your browser to `http://127.0.0.1:5000`

## Possible improvements
- Add user accounts/login
- Add monthly budget limits with alerts
- Export expenses to CSV
