# One Day Assignment

## Overview
This is ChatAble a chatbot designed to chat about the company Able

## Setup

YOU MUST DO THIS AT LEAST ONCE

### Backend

1. Go to the `backend` folder.

    ```cd backend```

2. Place your Tavily and OpenAI API keys in the `.env` file. Tavily is free to use, aall you have to do is make an account.
    ```
    FLASK_APP=app.py
    FLASK_ENV=development
    OPENAI_API_KEY = {Place OPENAI API key here}
    TAVILY_API_KEY = {Place TAVILY API key here}
    ```

3. Create and activate your vitrual environment

   `python -m venv venv`
   
   On Windows, use:
   `venv\Scripts\activate`

4. Install the correct dependencies
    `pip install -r requirements.txt`

5. Run the Flask app

    `python app.py`

### Frontend
1. Navigate to the `frontend` folder:
   `cd frontend`
   
2. Install the required Node.js dependencies:
   `npm install`

3. Start the React app:
   `npm start`

## Running the Application
If you would like to run the application again once you have done all the initial setup you can run the scripts I've provided in the root of the directory.

For Linux/Mac:
`./start.sh`

For Windows:
`.\start.bat`