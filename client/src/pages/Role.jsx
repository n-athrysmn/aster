import React from "react"
import { Link } from "react-router-dom"

const Role = () => {

  return (
    <div className="auth">
      <div className="roles">
      <h1>Choose Your Role</h1>
      <div className="role">
        <Link className="role-btn" to="/register">Student</Link>
        <Link className="role-btn" to="/parent-register">Parent</Link>
        <Link className="role-btn" to="/teacher-register">Teacher</Link>
      </div>
        <span className="log">Already registered? <Link className="link" to="/">Login here</Link></span>
        </div>
    </div>
  )
}

export default Role
