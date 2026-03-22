from flask import Blueprint, request, jsonify, current_app
import pandas as pd

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict-cost", methods=["POST"])
def predict_cost():
    data = request.json

    age = data["age"]
    sex = data["sex"]
    bmi = data["bmi"]
    children = data["children"]
    smoker = data["smoker"].lower() == "true"
    region = data["region"]

    # Use DataFrame with column names
    model_input = pd.DataFrame([{
        "age": age,
        "sex": sex,
        "bmi": bmi,
        "children": children,
        "smoker": smoker,
        "region": region
    }])

    model = current_app.config["MODEL"]
    predicted_charges = model.predict(model_input)[0]
    predicted_charges = float(predicted_charges)

    # Save to database
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO predictions (age, sex, bmi, children, smoker, region, predicted_charges)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (age, sex, bmi, children, smoker, region, predicted_charges))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({
        "predicted_charges": round(float(predicted_charges), 2)
    })

