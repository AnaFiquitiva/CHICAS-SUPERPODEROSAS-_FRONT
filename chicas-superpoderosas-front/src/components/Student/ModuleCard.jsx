export default function ModuleCard({ title, description, icon, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                background: "#fff",
                padding: "18px 15px", // 🔽 menos padding
                borderRadius: "14px",
                height: "150px", // 🔽 define un alto más corto
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center", // 🔽 centra verticalmente el contenido
                textAlign: "center",
                transition: "all 0.25s ease",
                border: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                e.currentTarget.style.border = "1px solid #99000033";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
                e.currentTarget.style.border = "1px solid transparent";
            }}
        >
            <div style={{ marginBottom: 10 }}>{icon}</div>
            <h3
                style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#100F0F",
                    marginBottom: 4,
                    fontFamily: "Work Sans, sans-serif",
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    fontWeight: 400,
                    fontFamily: "Work Sans, sans-serif",
                }}
            >
                {description}
            </p>
        </div>
    );
}
