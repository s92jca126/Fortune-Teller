import os
from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, initialize_app, firestore
from routes import bp


def create_app():
    app = Flask(__name__)
    CORS(app, origins='*')  # Allow CORS for all origins (configure for production)

    # Use an absolute path to locate the file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    service_account_path = os.path.join(current_dir, "server/config/serviceAccountKey.json")

    cred = credentials.Certificate(service_account_path)
    initialize_app(cred)
    db = firestore.client()

    # Register routes
    app.register_blueprint(bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=8080)
