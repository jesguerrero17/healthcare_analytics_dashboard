import { useEffect, useState } from "react";
import API from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function PatientStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/patient-stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  const smokerRaw = stats.smoker_breakdown;

  // Normalize keys to strings
  const smokerData = [
    {
      name: "Smoker",
      value:
        smokerRaw["true"] ??
        smokerRaw["True"] ??
        smokerRaw["1"] ??
        smokerRaw[1] ??
        smokerRaw["t"] ??
        smokerRaw["T"] ??
        0
    },
    {
      name: "Non-Smoker",
      value:
        smokerRaw["false"] ??
        smokerRaw["False"] ??
        smokerRaw["0"] ??
        smokerRaw[0] ??
        smokerRaw["f"] ??
        smokerRaw["F"] ??
        0
    }
  ];

  const sexData = Object.entries(stats.sex_distribution).map(([key, value]) => ({
    name: key,
    value
  }));

  const regionData = Object.entries(stats.region_distribution).map(
    ([region, count]) => ({
      region,
      count
    })
  );

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
<div style={{ marginTop: "40px" }}>

  {/* Age & BMI Cards */}
  <div
    style={{
      display: "flex",
      justifyContent: "center",   // ⭐ centers the cards
      gap: "20px",
      marginTop: "20px",
    }}
  >
    <div className="card">
      <h3>Age Stats</h3>
      <p>Min: {stats.age.min}</p>
      <p>Max: {stats.age.max}</p>
      <p>Avg: {stats.age.avg.toFixed(1)}</p>
    </div>

    <div className="card">
      <h3>BMI Stats</h3>
      <p>Min: {stats.bmi.min}</p>
      <p>Max: {stats.bmi.max}</p>
      <p>Avg: {stats.bmi.avg.toFixed(1)}</p>
    </div>
  </div>

  {/* Smoker Pie Chart */}
  <div style={{ marginTop: "40px" }}>
    <h3>Smoker Breakdown</h3>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <ResponsiveContainer width="50%" height={250}>
        <PieChart>
          <Pie
            data={smokerData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {smokerData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Sex Pie Chart */}
  <div style={{ marginTop: "40px" }}>
    <h3>Sex Distribution</h3>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <ResponsiveContainer width="50%" height={250}>
        <PieChart>
          <Pie
            data={sexData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {sexData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

      {/* Region Bar Chart */}
      <div style={{ marginTop: "40px" }}>
        <h3>Region Distribution</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart data={regionData}>
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

