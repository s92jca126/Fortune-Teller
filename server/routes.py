# backend/app/routes.py
from flask import Blueprint, request, jsonify
from requests import get_prediction

bp = Blueprint("main", __name__)

@bp.route("/submit", methods=["POST"])
def predict():
    try:
        # Ensure request contains JSON data
        if not request.is_json:
            return jsonify({"error": "Invalid request format. JSON expected."}), 400

        data = request.json

        # Validate and clean input
        error = validate_input(data)
        if error:
            return jsonify({"error": error}), 400


        # Extract cleaned inputs
        birth_data = data.get("birth_data")
        question = data.get("question")
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

        return jsonify({"prediction": prediction}), 200

    except Exception as e:
        # Catch unexpected errors
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500


def validate_input(data):

    if not data:
        return None, "Request body is empty or not JSON."

    # Validate 'birth_data'
    birth_data = data.get("birth_data").strip()
    if not birth_data or not isinstance(birth_data, str):
        return None, "'birth_data' is required."

    # Validate 'question'
    question = data.get("question").strip()
    if not question or not isinstance(question, str):
        return None, "'question' is required."

    # Return cleaned data
    return None