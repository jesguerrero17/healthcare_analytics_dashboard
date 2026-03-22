from flask import Blueprint, request, jsonify
from models.risk_scoring import compute_risk_score, risk_level

risk_bp = Blueprint("risk", __name__)

@risk_bp.route("/risk-score", methods=["POST"])
def risk_score():
    data = request.json

    age = data["age"]
    bmi = data["bmi"]
    smoker = data["smoker"]

    score = compute_risk_score(age, bmi, smoker)
    level = risk_level(score)

    # No database saving — return only the result
    return jsonify({
        "risk_score": score,
        "risk_level": level
    })
