def compute_risk_score(age, bmi, smoker):
    score = 0

    # Age contribution
    if age < 30:
        score += 10
    elif age < 45:
        score += 20
    elif age < 60:
        score += 30
    else:
        score += 40

    # BMI contribution
    if bmi < 18.5:
        score += 5
    elif bmi < 25:
        score += 10
    elif bmi < 30:
        score += 20
    else:
        score += 30

    # Smoking contribution
    if smoker:
        score += 40

    return score


def risk_level(score):
    if score < 20:
        return "Low"
    elif score < 50:
        return "Medium"
    else:
        return "High"