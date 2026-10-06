import React from "react";

const ServerLoading = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#f8f9fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ddd",
          borderTop: "4px solid #0d6efd",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <h4 style={{ marginTop: "20px" }}>
        Starting Task Manager...
      </h4>

      <p style={{ color: "#666" }}>
        Connecting to server. Please wait...
      </p>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ServerLoading;
