import { Link, useLocation } from "react-router-dom";

export default function SidebarLayout({ children }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "500",
    color: location.pathname === path ? "white" : "#1e293b",
    background: location.pathname === path ? "#4f46e5" : "transparent",
    transition: "0.2s",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f2f4f7" }}>
      
      {/* Sidebar */}
<aside
  style={{
    width: "230px",
    background: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    padding: "25px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    position: "fixed",        // ⭐ keeps sidebar in place
    top: 0,                    // ⭐ stick to top
    left: 0,                   // ⭐ stick to left
    bottom: 0,                 // ⭐ stretch full height
    overflowY: "auto",         // ⭐ scroll inside sidebar if needed
  }}
>
        {/* App Name */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#1e293b",
            margin: 0,
          }}
        >
          HealthDash
        </h2>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="/" style={linkStyle("/")}>
            Dashboard
          </Link>

          <Link to="/predict" style={linkStyle("/predict")}>
            Cost Predictor
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Page Content */}
        <div style={{ padding: "40px" }}>{children}</div>
      </main>
    </div>
  );
}