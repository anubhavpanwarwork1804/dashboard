from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/status')
def status():
    return jsonify({"message": "Python Service is Running ab to cicd b chl gyi or b change h"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
