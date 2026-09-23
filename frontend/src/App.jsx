import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

    fetch(`${apiUrl}/health`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHealth(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <main className="app-shell">
      <div className="card">
        <h1>MigoMap</h1>
        {error ? (
          <p className="error">Backend error: {error}</p>
        ) : health ? (
          <div>
            <p className="success">{health.message}</p>
            <small>{health.timestamp}</small>
          </div>
        ) : (
          <p>Connecting to backend...</p>
        )}
      </div>
    </main>
  );
}

export default App;