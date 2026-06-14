import { Link } from 'react-router';
import { useState } from 'react';

import '../auth.form.scss';
import { useAuth } from '../hooks/useAuth';

function Login() {

    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin({ email, password });

        
    }

    if (loading) {
        return (
            <main>
                <h1>Loading....</h1>
            </main>
        )
    }

    return (
        <main>
            <section className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <legend className="sr-only">Login Credentials</legend>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" placeholder="Enter email address" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" placeholder="Enter password" required />
                    </div>

                    <button type="submit" className="button primary-button">Login</button>

                </form>

                <p>Dont have an account?
                    <Link to={"/register"}>
                        Register
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;