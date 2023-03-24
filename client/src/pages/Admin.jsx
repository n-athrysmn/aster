import React, { useState } from "react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { admin } = useContext(AuthContext)


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (!inputs.email || !inputs.password) {
      setError('Please enter both email and password')
      return
    }
    try {
      await admin(inputs)
      navigate("/admin-dashboard")
    } catch (err) {
      setError(err.response.data)
    }
  }
  return (
    <div className="auth">
      <h1>Admin Login</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          No admin account? <Link to="/admin-register">Register here</Link>
        </span>
      </form>
    </div>
  )
}

export default AdminLogin
