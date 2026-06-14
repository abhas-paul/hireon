import { Link } from 'react-router';
import '../auth.form.scss';

function Login() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <main>
            <section className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <legend className="sr-only">Login Credentials</legend>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email address" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" required />
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