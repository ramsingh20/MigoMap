import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, loginUser, registerUser } from "./store/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";

function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>MigoMap</h1>
      <p>Welcome, {user?.name || "friend"}!</p>
    </div>
  );
}

function LoginPage() {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = await dispatch(loginUser(payload));

    if (loginUser.fulfilled.match(result)) {
      window.location.href = "/app";
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "420px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={{ width: "100%", padding: "0.75rem" }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={{ width: "100%", padding: "0.75rem" }}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

function RegisterPage() {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      dateOfBirth: formData.get("dateOfBirth"),
    };

    const result = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(result)) {
      window.location.href = "/app";
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "420px", margin: "0 auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            style={{ width: "100%", padding: "0.75rem" }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={{ width: "100%", padding: "0.75rem" }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={{ width: "100%", padding: "0.75rem" }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="date"
            name="dateOfBirth"
            style={{ width: "100%", padding: "0.75rem" }}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Registering..." : "Create account"}
        </button>
      </form>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;