import { useNavigate, Link } from "react-router";

function Register() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <section className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <legend className="sr-only">Register Credentials</legend>

          <div className="input-group">
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter email address" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" required />
          </div>

          <button type="submit" className="button primary-button">Register</button>

        </form>

        <p>Already have an account?
          <Link to={"/login"}>
            Login
          </Link>  
        </p>
      </section>
    </main>
  )
}

export default Register
