from flask import Blueprint, request, jsonify
from db.connection import get_connection
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

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO risk_assessments (age, bmi, smoker, risk_score, risk_level)
        VALUES (%s, %s, %s, %s, %s)
    """, (age, bmi, smoker, score, level))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({
        "risk_score": score,
        "risk_level": level
    })