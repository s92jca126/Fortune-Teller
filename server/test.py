import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, json
from routes import bp

class TestRoutes(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(bp)
        self.client = self.app.test_client()

    @patch("routes.validate_input")
    @patch("routes.get_prediction")
    def test_predict_success(self, mock_get_prediction, mock_validate_input):
        mock_validate_input.return_value = (None, {"birth_data": "2000-01-01", "question": "What is my fortune?"})
        mock_get_prediction.return_value = "You'll be in luck."

        response = self.client.post("/submit", json={"birth_data": "2000-01-01", "question": "What is my fortune?"})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"prediction": "You'll be in luck."})
        mock_validate_input.assert_called_once()
        mock_get_prediction.assert_called_once_with("2000-01-01", "What is my fortune?")

    def test_predict_invalid_json(self):
        response = self.client.post("/submit", data="plain text", content_type="text/plain")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Invalid request format. JSON expected."})

    @patch("routes.validate_input")
    def test_predict_validation_error(self, mock_validate_input):
        mock_validate_input.return_value = ("Validation failed.", None)

        response = self.client.post("/submit", json={"birth_data": "", "question": ""})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Validation failed."})
        mock_validate_input.assert_called_once()

    @patch("routes.validate_input")
    @patch("routes.get_prediction")
    def test_predict_prediction_error(self, mock_get_prediction, mock_validate_input):
        mock_validate_input.return_value = (None, {"birth_data": "2000-01-01", "question": "What is my fortune?"})
        mock_get_prediction.side_effect = ValueError("Prediction service failed.")

        response = self.client.post("/submit", json={"birth_data": "2000-01-01", "question": "What is my fortune?"})

        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, {"error": "Prediction error: Prediction service failed."})
        mock_validate_input.assert_called_once()
        mock_get_prediction.assert_called_once_with("2000-01-01", "What is my fortune?")

    @patch("routes.validate_input")
    @patch("routes.get_prediction")
    def test_predict_unexpected_error(self, mock_get_prediction, mock_validate_input):
        mock_validate_input.return_value = (None, {"birth_data": "2000-01-01", "question": "What is my fortune?"})

        mock_get_prediction.side_effect = Exception("Something went wrong.")

        response = self.client.post("/submit", json={"birth_data": "2000-01-01", "question": "What is my fortune?"})

        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, {"error": "Unexpected error: Something went wrong."})
        mock_validate_input.assert_called_once()
        mock_get_prediction.assert_called_once_with("2000-01-01", "What is my fortune?")


if __name__ == "__main__":
    unittest.main()
