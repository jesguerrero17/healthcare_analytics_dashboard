import { useEffect, useState } from "react";
import API from "../api/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RegionStatsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/region-stats").then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Average Charges by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="avg_predicted_charges" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}