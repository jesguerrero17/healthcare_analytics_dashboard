import { useEffect, useState } from "react";
import API from "../api/api";

export default function UsageCards() {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    API.get("/usage").then(res => setUsage(res.data));
  }, []);

  if (!usage) return null;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className="card">
        <h3>Total Predictions</h3>
        <p>{usage.total_predictions}</p>
      </div>

      <div className="card">
        <h3>Total Risk Assessments</h3>
        <p>{usage.total_risk_assessments}</p>
      </div>

      <div className="card">
        <h3>Last Prediction</h3>
        <p>{usage.last_prediction}</p>
      </div>

      <div className="card">
        <h3>Last Risk Assessment</h3>
        <p>{usage.last_risk_assessment}</p>
      </div>
    </div>
  );
}