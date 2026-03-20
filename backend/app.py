from flask import Flask
from dotenv import load_dotenv
import joblib

load_dotenv()

model = joblib.load("models/cost_model.pkl")

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

if __name__ == "__main__":
    app.run(debug=True)

