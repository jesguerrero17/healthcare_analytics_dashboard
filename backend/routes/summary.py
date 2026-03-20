from flask import Blueprint, jsonify, current_app

summary_bp = Blueprint("summary", __name__)

@summary_bp.route("/feature-importance", methods=["GET"])
def feature_importance():
    model = current_app.config["MODEL"]

    preprocessor = model.named_steps["preprocess"]
    rf = model.named_steps["rf"]

    feature_names = preprocessor.get_feature_names_out()
    importances = rf.feature_importances_

    # Build list of dicts
    importance_list = [
        {"feature": feature_names[i], "importance": float(importances[i])}
        for i in range(len(importances))
    ]

    # Sort by importance descending
    importance_list = sorted(
        importance_list,
        key=lambda x: x["importance"],
        reverse=True
    )

    return jsonify(importance_list)

from db.connection import get_connection

@summary_bp.route("/region-stats", methods=["GET"])
def region_stats():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT region, AVG(predicted_charges)
        FROM predictions
        GROUP BY region
        ORDER BY region;
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    # Convert to list of dicts
    results = [
        {"region": row[0], "avg_predicted_charges": float(row[1])}
        for row in rows
    ]

    return jsonify(results)

@summary_bp.route("/usage", methods=["GET"])
def usage_stats():
    conn = get_connection()
    cur = conn.cursor()

    # Count predictions
    cur.execute("SELECT COUNT(*) FROM predictions;")
    total_predictions = cur.fetchone()[0]

    # Count risk assessments
    cur.execute("SELECT COUNT(*) FROM risk_assessments;")
    total_risk_assessments = cur.fetchone()[0]

    # Last prediction timestamp
    cur.execute("SELECT MAX(timestamp) FROM predictions;")
    last_prediction = cur.fetchone()[0]

    # Last risk assessment timestamp
    cur.execute("SELECT MAX(timestamp) FROM risk_assessments;")
    last_risk_assessment = cur.fetchone()[0]

    cur.close()
    conn.close()

    return jsonify({
        "total_predictions": total_predictions,
        "total_risk_assessments": total_risk_assessments,
        "last_prediction": str(last_prediction) if last_prediction else None,
        "last_risk_assessment": str(last_risk_assessment) if last_risk_assessment else None
    })

@summary_bp.route("/patient-stats", methods=["GET"])
def patient_stats():
    conn = get_connection()
    cur = conn.cursor()

    # Age distribution (min, max, avg)
    cur.execute("""
        SELECT MIN(age), MAX(age), AVG(age)
        FROM patients;
    """)
    age_min, age_max, age_avg = cur.fetchone()

    # BMI distribution (min, max, avg)
    cur.execute("""
        SELECT MIN(bmi), MAX(bmi), AVG(bmi)
        FROM patients;
    """)
    bmi_min, bmi_max, bmi_avg = cur.fetchone()

    # Smoker breakdown
    cur.execute("""
        SELECT smoker, COUNT(*)
        FROM patients
        GROUP BY smoker;
    """)
    smoker_rows = cur.fetchall()
    smoker_stats = {str(row[0]): row[1] for row in smoker_rows}

    # Sex distribution
    cur.execute("""
        SELECT sex, COUNT(*)
        FROM patients
        GROUP BY sex;
    """)
    sex_rows = cur.fetchall()
    sex_stats = {row[0]: row[1] for row in sex_rows}

    # Region distribution
    cur.execute("""
        SELECT region, COUNT(*)
        FROM patients
        GROUP BY region;
    """)
    region_rows = cur.fetchall()
    region_stats = {row[0]: row[1] for row in region_rows}

    cur.close()
    conn.close()

    return jsonify({
        "age": {
            "min": age_min,
            "max": age_max,
            "avg": float(age_avg) if age_avg else None
        },
        "bmi": {
            "min": bmi_min,
            "max": bmi_max,
            "avg": float(bmi_avg) if bmi_avg else None
        },
        "smoker_breakdown": smoker_stats,
        "sex_distribution": sex_stats,
        "region_distribution": region_stats
    })