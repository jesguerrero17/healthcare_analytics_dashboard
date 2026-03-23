from flask import Blueprint, jsonify, current_app
import pandas as pd
import os

summary_bp = Blueprint("summary", __name__)

# Load dataset once (optional optimization)
DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "insurance.csv")
df = pd.read_csv(DATA_PATH)


# -----------------------------
# FEATURE IMPORTANCE
# -----------------------------
@summary_bp.route("/feature-importance", methods=["GET"])
def feature_importance():
    model = current_app.config["MODEL"]

    preprocessor = model.named_steps["preprocess"]
    rf = model.named_steps["rf"]

    feature_names = preprocessor.get_feature_names_out()
    importances = rf.feature_importances_

    importance_list = [
        {"feature": feature_names[i], "importance": float(importances[i])}
        for i in range(len(importances))
    ]

    importance_list = sorted(
        importance_list,
        key=lambda x: x["importance"],
        reverse=True
    )

    return jsonify(importance_list)


# -----------------------------
# REGION STATS (CSV-based)
# -----------------------------
@summary_bp.route("/region-stats", methods=["GET"])
def region_stats():
    region_groups = df.groupby("region")["charges"].mean().reset_index()

    results = [
        {"region": row["region"], "avg_predicted_charges": float(row["charges"])}
        for _, row in region_groups.iterrows()
    ]

    return jsonify(results)


# -----------------------------
# USAGE STATS (No DB → Static or Remove)
# -----------------------------
@summary_bp.route("/usage", methods=["GET"])
def usage_stats():
    # Since no DB exists, return placeholder values
    return jsonify({
        "total_predictions": None,
        "total_risk_assessments": None,
        "last_prediction": None,
        "last_risk_assessment": None
    })


# -----------------------------
# PATIENT STATS (CSV-based)
# -----------------------------
@summary_bp.route("/patient-stats", methods=["GET"])
def patient_stats():
    age_min = int(df["age"].min())
    age_max = int(df["age"].max())
    age_avg = float(df["age"].mean())

    bmi_min = float(df["bmi"].min())
    bmi_max = float(df["bmi"].max())
    bmi_avg = float(df["bmi"].mean())

    sdf["smoker"] = df["smoker"].astype(str).str.lower().str.strip()
    smoker_stats = df["smoker"].value_counts().to_dict()
    sex_stats = df["sex"].value_counts().to_dict()
    region_stats = df["region"].value_counts().to_dict()

    return jsonify({
        "age": {
            "min": age_min,
            "max": age_max,
            "avg": age_avg
        },
        "bmi": {
            "min": bmi_min,
            "max": bmi_max,
            "avg": bmi_avg
        },
        "smoker_breakdown": smoker_stats,
        "sex_distribution": sex_stats,
        "region_distribution": region_stats
    })
