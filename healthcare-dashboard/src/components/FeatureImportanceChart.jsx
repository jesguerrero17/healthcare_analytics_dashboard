import { useEffect, useState } from "react";
import API from "../api/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FeatureImportanceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/feature-importance").then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Top Predictors of Medical Charges</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="importance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}