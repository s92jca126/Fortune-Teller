from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, initialize_app, firestore
from routes import bp



def create_app():
    app = Flask(__name__)
    CORS(app, origins='*')  # Allow CORS for all origins (configure for production)
    cred = credentials.Certificate("server/config/serviceAccountKey.json")
    initialize_app(cred)
    db = firestore.client()
    # Register your routes
    app.register_blueprint(bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=8080)
