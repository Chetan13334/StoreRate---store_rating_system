import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2800,
            style: {
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.95)",
              color: "#fff",
              padding: "14px 16px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.22)",
              border: "1px solid rgba(255,255,255,0.08)",
            },
            success: {
              style: {
                background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
              },
            },
            error: {
              style: {
                background: "linear-gradient(135deg, #7f1d1d, #ef4444)",
              },
            },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
