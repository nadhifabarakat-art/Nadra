import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/sidebar.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://nadra-kr80.onrender.com", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("البريد الإلكتروني أو كلمة المرور غلط");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">تسجيل الدخول</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          className="beauty-input"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="beauty-input"
          placeholder="كلمة المرور"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn-edit" onClick={handleLogin}>
          دخول
        </button>
      </div>
    </div>
  );
};

export default Login;
