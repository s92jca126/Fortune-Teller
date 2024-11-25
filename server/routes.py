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

        return jsonify({"prediction": prediction}), 200

    except Exception as e:
        # Catch unexpected errors
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500


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