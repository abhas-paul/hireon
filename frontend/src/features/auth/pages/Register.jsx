import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth';

function Register() {
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <main>
      <section className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <legend className="sr-only">Register Credentials</legend>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="button primary-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>Already have an account?
          <Link to={"/login"}> Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;