import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { migrateLegacyStorage } from "./legacyStorage";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import "./styles.css";

try {
  migrateLegacyStorage(localStorage);
} catch {
  // storage blocked
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");
createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
