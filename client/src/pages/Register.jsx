import React, { useState } from 'react'
import '../style.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [inputs, setInputs] = useState({
        name:"",
        number:"",
        birthday:"",
        address:"",
        school:"",
        level:"",
        grade:"",
        pfp:"",
        email:"",
        password:"",
    })
    const [err, setError] = useState(null)
    console.log(inputs)

    const navigate = useNavigate()
    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const [fileName, setFileName] = useState("Upload profile picture")
  
    const handleFileSelect = e => {
      const selectedFile = e.target.files[0]
      if (selectedFile) {
        setFileName(selectedFile.name)
      }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post("/auth/register", inputs)
            navigate("/")
        }catch(err){
            setError(err.response.data)
        }
    }
  
    return (
      <div className="auth">
        <h1>Register</h1>
        <div className="form-container">
          <form>
            <input name={"name"} onChange={handleChange} type={"text"} placeholder={"Enter full name"} />
            <input name={"number"} onChange={handleChange} type={"tel"} placeholder={"Enter phone number"} />
            <input name={"birthday"} onChange={handleChange} type={"date"} placeholder={"Enter birthday"} />
            <textarea name={"address"} onChange={handleChange} placeholder={"Enter address"} />
            <input name={"school"} onChange={handleChange} type={"text"} placeholder={"Enter school name"} />
            <select name="level" onChange={handleChange}>
              <option value="">Select your education level</option>
              <optgroup label="Form">
                <option value="Form-1">Form 1</option>
                <option value="Form-2">Form 2</option>
                <option value="Form-3">Form 3</option>
                <option value="Form-4">Form 4</option>
                <option value="Form-5">Form 5</option>
              </optgroup>
              <optgroup label="Grade">
                <option value="Grade-1">Grade 1</option>
                <option value="Grade-2">Grade 2</option>
                <option value="Grade-3">Grade 3</option>
                <option value="Grade-4">Grade 4</option>
                <option value="Grade-5">Grade 5</option>
                <option value="Grade-6">Grade 6</option>
              </optgroup>
            </select>
            <select name="grade" onChange={handleChange}>
              <option value="">Select your grade for Mathematics</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
            <input
              type={"file"}
              id={"file"}
              style={{ display: "none" }}
              onChange={(event) => {
                handleFileSelect(event)
                handleChange(event)
              }}
              name={"pfp"}
            />
            <label htmlFor="file">{fileName}</label>
            <input name={"email"} onChange={handleChange} type={"email"} placeholder={"Enter email"} />
            <input name={"password"} onChange={handleChange} type={"password"} placeholder={"Enter password"} />
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>
              Not a student? <Link to="/role">Change role here</Link>
            </span>
            <span>
              Already registered? <Link to="/">Login here</Link>
            </span>
          </form>
        </div>
      </div>
    )
  }
  

export default Register