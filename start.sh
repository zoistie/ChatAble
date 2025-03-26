#!/bin/bash

# Navigate to backend folder
cd backend

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Start Flask app
gnome-terminal -- bash -c "python app.py; exec bash" &

# Navigate to frontend folder
cd ../frontend

# Start React app
npm start
