@echo off

:: Navigate to backend folder
cd backend

:: Activate virtual environment
call venv\Scripts\activate.bat

:: Install requirements
pip install -r requirements.txt

:: Start Flask app
start python app.py

:: Navigate to frontend folder
cd ..\frontend

:: Start React app
start npm start


