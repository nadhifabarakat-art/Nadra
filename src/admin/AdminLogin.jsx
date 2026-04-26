import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Falsches Passwort");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Admin Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Einloggen</button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default AdminLogin;
