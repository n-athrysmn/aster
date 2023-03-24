import React, { useState } from 'react'
import '../style.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Teacher = () => {

    const [inputs, setInputs] = useState({
        name:"",
        number:"",
        school:"",
        address:"",
        salary:"",
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

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post("/auth/teacher-register", inputs)
            navigate("/")
        }catch(err){
            setError(err.response.data)
        }
    }

    const [fileName, setFileName] = useState("Upload profile picture")
  
    const handleFileSelect = (event) => {
      const selectedFile = event.target.files[0]
      setFileName(selectedFile.name)
    }

    return (
      <div className='auth'>
          <h1>Teacher Registration</h1>
          <div className="form-container">
            <form>
                <input type={"text"} name={"name"} onChange={handleChange} placeholder={"Enter full name"} />
                <input type={"tel"} name={"number"} onChange={handleChange} placeholder={"Enter phone number"} />
                <input type={"text"} name={"school"} onChange={handleChange} placeholder={"Enter your school name"} />
                <textarea placeholder={"Enter address"} name={"address"} onChange={handleChange} />
                <select name="salary" onChange={handleChange}>
                    <option value="">Select salary range</option>
                    <option value="T20">T20</option>
                    <option value="M40">M40</option>
                    <option value="B40">B40</option>
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
                <input type={"email"} name={"email"} onChange={handleChange} placeholder={"Enter email"} />
                <input type={"password"} name={"password"} onChange={handleChange} placeholder={"Enter password"} />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>
                    Not a teacher? <Link to="/role">Change role here</Link>
                </span>
                <span>Already registered? <Link to="/">Login here</Link></span>
            </form>
          </div>
      </div>
    )
}

export default Teacher