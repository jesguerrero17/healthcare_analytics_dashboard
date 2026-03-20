export default function ChartHeader({ title, icon }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
        paddingBottom: "8px",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <span style={{ fontSize: "22px" }}>{icon}</span>
      <h3
        style={{
          margin: 0,
          fontSize: "18px",
          color: "#1e293b",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
    </div>
  );
}