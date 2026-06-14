import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

import '../auth.form.scss';
import { useAuth } from '../hooks/useAuth';

function Login() {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleLogin({ email, password });
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    if (loading) {
        return (
            <main>
                <h1>Loading....</h1>
            </main>
        );
    }

    return (
        <main>
            <section className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email} // 👈 Bound state here
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
                            value={password} // 👈 Bound state here
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="button primary-button">Login</button>
                </form>

                <p>Don't have an account?
                    <Link to={"/register"}> Register</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;