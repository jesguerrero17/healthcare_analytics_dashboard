import { useState } from "react";
import API from "../api/api";

export default function PredictionForm() {
  const [form, setForm] = useState({
    age: "",
    sex: "",
    bmi: "",
    children: "",
    smoker: "",
    region: ""
  });

  const [result, setResult] = useState(null);

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    width: "100%",
    background: "#f8fafc",
    color: "#1e293b",
    appearance: "none"
  };

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/predict-cost", form);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#1f2937", fontFamily:"sans-serif", fontSize: "20pt"}}>
        Predict Medical Charges
      </h2>

      <p style={{ marginBottom: "20px", color: "#475569" }}>
        Enter patient information to estimate expected medical costs.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <select
          name="sex"
          value={form.sex}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          step="0.1"
          name="bmi"
          placeholder="BMI"
          value={form.bmi}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="number"
          name="children"
          placeholder="Number of Children"
          value={form.children}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <select
          name="smoker"
          value={form.smoker}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Smoker?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Region</option>
          <option value="southeast">Southeast</option>
          <option value="southwest">Southwest</option>
          <option value="northwest">Northwest</option>
          <option value="northeast">Northeast</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Predict Charges
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ marginBottom: "10px", color: "#1e293b" }}>
            Prediction Result
          </h2>
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "#334155" }}>
            ${Number(result.predicted_charges).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}