from flask import Blueprint, request, jsonify
from firebase_admin import auth, firestore
from custom_requests import get_prediction
from datetime import datetime


bp = Blueprint("main", __name__)

@bp.route("/")
def home():
    return "Backend is running!", 200

@bp.route("/submit", methods=["POST"])
def predict():
    try:
        # Ensure request contains JSON data
        if not request.is_json:
            return jsonify({"error": "Invalid request format. JSON expected."}), 400

        # Parse and validate the input
        data = request.json
        validation_error, cleaned_data = validate_input(data)
        if validation_error:
            return jsonify({"error": validation_error}), 400

        # Extract cleaned inputs
        birth_data = cleaned_data["birth_data"]
        question = cleaned_data["question"]

        # Call get_prediction and handle potential errors
        try:
            prediction = get_prediction(birth_data, question)
        except ValueError as ve:
            return jsonify({"error": f"Prediction error: {str(ve)}"}), 500
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

        # Ensure the prediction is a string (or appropriately formatted)
        if not isinstance(prediction, str):
            return jsonify({"error": "Invalid prediction format returned."}), 500

        # Prepare log data for storage
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "user_input": {
                "question": question
            },
            "prediction": prediction
        }
        db = firestore.client()
        db.collection("conversations").add(log_data)

        return jsonify({"prediction": prediction}), 200

    except Exception as e:
        # Catch unexpected errors
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500


# Route: Firebase Authentication Signup
@bp.route("/signup", methods=["POST"])
def signup():
    """
    Handles user signup with Firebase Authentication.
    """
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Create a new user in Firebase Authentication
        user = auth.create_user(email=email, password=password)
        return jsonify({"uid": user.uid, "email": user.email}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route: Firebase Authentication Login (Token Verification)
@bp.route("/login", methods=["POST"])
def login():
    """
    Verifies a Firebase Authentication token sent by the client for login.
    """
    token = request.json.get("token")
    if not token:
        return jsonify({"error": "Token is required"}), 400

    try:
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]  # Extract the user ID from the token
        return jsonify({"uid": uid}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401


# Helper Function: Validate and Clean Input Data
def validate_input(data):
    """
    Validates and cleans input data for the prediction endpoint.

    :param data: The JSON data from the client request.
    :return: A tuple (error_message, cleaned_data).
             If validation succeeds, error_message is None and cleaned_data contains sanitized input.
             If validation fails, error_message contains the reason and cleaned_data is None.
    """
    if not data:
        return "Request body is empty or not JSON.", None

    # Validate 'birth_data'
    birth_data = data.get("birth_data")
    if not birth_data or not isinstance(birth_data, str) or not birth_data.strip():
        return "'birth_data' is required and must be a non-empty string.", None

    # Validate 'question'
    question = data.get("question")
    if not question or not isinstance(question, str) or not question.strip():
        return "'question' is required and must be a non-empty string.", None

    # Return cleaned data if validation succeeds
    cleaned_data = {
        "birth_data": birth_data.strip(),
        "question": question.strip(),
    }
    return None, cleaned_data
