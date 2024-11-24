from flask import Flask, jsonify
from flask_cors import CORS
from routes import bp


def create_app():
  app = Flask(__name__)
  cors = CORS(app, origins='*')
  app.register_blueprint(bp)
  return app

app = create_app()

if __name__ == "__main__":
  app.run(debug=True, port=8080)


