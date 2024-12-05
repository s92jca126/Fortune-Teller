from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, initialize_app

# Initialize Firebase Admin SDK
cred = credentials.Certificate("server/config/serviceAccountKey.json")
initialize_app(cred)

# Blueprint import
from routes import bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins='*')  # Allow CORS for all origins (configure for production)

    # Register your routes
    app.register_blueprint(bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=8080)
