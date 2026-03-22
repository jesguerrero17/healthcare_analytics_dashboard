from flask import Flask
import joblib


model = joblib.load(os.path.join(os.path.dirname(__file__), "models/cost_model.pkl"))

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MODEL"] = model    

from routes.predict import predict_bp
from routes.risk import risk_bp
from routes.summary import summary_bp

# Register blueprints
app.register_blueprint(predict_bp, url_prefix="/api")
app.register_blueprint(risk_bp, url_prefix="/api")
app.register_blueprint(summary_bp, url_prefix="/api")

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

