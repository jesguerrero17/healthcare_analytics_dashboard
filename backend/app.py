from flask import Flask
import joblib
from flask_cors import CORS
import os

# Load model safely
model_path = os.path.join(os.path.dirname(__file__), "models", "cost_model.pkl")
model = joblib.load(model_path)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://your-frontend.vercel.app"}})

app.config["MODEL"] = model

# Register blueprints
from routes.predict import predict_bp
from routes.risk import risk_bp
from routes.summary import summary_bp

app.register_blueprint(predict_bp, url_prefix="/api")
app.register_blueprint(risk_bp, url_prefix="/api")
app.register_blueprint(summary_bp, url_prefix="/api")

# Render entry point
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
