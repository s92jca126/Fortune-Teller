from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.get_json()  # Get JSON data from the request
    date_of_birth = data.get('dateOfBirth')
    time_of_birth = data.get('timeOfBirth')
    place_of_birth = data.get('placeOfBirth')
    
    print(f"Received data: {data}")  # For debugging
    return jsonify({"message": "Form data received successfully!", "data": data}), 200

if __name__ == "__main__":
  app.run(debug=True, port=8080)