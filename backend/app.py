
import chat
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

Chatbot = chat.Initialize_Model()

#Message handling requests, invokes the model and then sends the response out
@app.route('/api/message', methods=['POST'])
def send_message():
    global Chatbot
    user_input = request.json.get('message')
    response = chat.Chat_Model(Chatbot, user_input)
    return jsonify({'message': response})



if __name__ == '__main__':
    app.run(debug=True)


