import PatientStats from "../components/PatientStats";
import FeatureImportanceChart from "../components/FeatureImportanceChart";
import RegionStatsChart from "../components/RegionStatsChart";
import ChartHeader from "../components/ChartHeader";

export default function Dashboard() {
  return (
    <div style={{ width: "100%" }}>

      {/* Patient Demographics */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "40px",
        }}
      >
        <ChartHeader title="Patient Demographics" icon="👥" />
        <PatientStats />
      </div>

      {/* Feature Importance */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "40px",
        }}
      >
        <ChartHeader title="Feature Importance" icon="📊" />
        <FeatureImportanceChart />
      </div>

      {/* Region Distribution */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <ChartHeader title="Regional Costs" icon="🗺️" />
        <RegionStatsChart />
      </div>
    </div>
  );
}