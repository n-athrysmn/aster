import "../Styles/register.css"
import Img from "../Assets/result.svg"
import * as yup from "yup"
import { ErrorMessage, Formik, Form, Field } from "formik"
import Axios from "axios"
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'


function Register({ loggedin = false }) {

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            name: values.name,
            email: values.email,
            number: values.number,
            birthday: values.birthday,
            address: values.address,
            level: values.level,
            school: values.school,
            grade: values.grade,
            pfp: values.pfp,
            password: values.password,
        }).then((response) => {
            alert(response.data.msg)
            console.log(response)
            window.location.reload()
        })
    }

    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "A password should be at least 8 characters")
            .required("Password is required"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords are different")
            .required("Password re-type is required"),
    })

    return (
        <div className="body">
            <div className="left-register">
                <img src={Img} alt="Picture" className="chart" />
            </div>
            <div className="right-register">
                <div className="card-register">
                    <div className="user-links">
                        <div>
                            {!loggedin && <Link to="/">Login</Link>}
                        </div>

                        <div>
                            {!loggedin && <Link to="/register" className="active-link">Register</Link>}
                        </div>
                    </div>
                    <div className="card-content">
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            number: '',
                            birthday: '',
                            address: '',
                            level: '',
                            school: '',
                            grade: '',
                            pfp: '',
                            password: '',
                        }}
                        onSubmit={handleRegister}
                        validationSchema={validationsRegister}
                    >
                        <Form className="login-form">
                            
                            <div className="form-group">
                                <label form="name">Name</label>

                                <Field name="name" type='text' className="form-field" placeholder="Enter Full Name" />
                                
                            </div>

                            <Row>
                                <Col sm={12} md={12} xl={6}>

                                    <div className="form-group">
                                        <label form="email">Email</label>

                                        <Field name="email" type='email' className="form-field" placeholder="Enter Email" />

                                        <ErrorMessage
                                            component="span"
                                            name="email"
                                            className="form-error"
                                        />
                                    </div>
                                </Col>
                                <Col sm={12} md={12} xl={6}>

                                    <div className="form-group">
                                        <label form="number">Number</label>

                                        <Field name="number" type='text' className="form-field" placeholder="Enter Phone Number" />
                                        
                                    </div>
                                </Col>
                            </Row>

                            <div className="form-group">
                                <label form="birthday">Birthday</label>

                                <Field name="birthday" type='date' className="form-field" placeholder="Enter Birthday" />
                                
                            </div>

                            <div className="form-group">
                                <label form="address">Address</label>

                                <Field as='textarea' name="address" className="form-field" placeholder="Enter Address" />
                                
                            </div>

                            <Row>
                                <Col sm={12} md={12} xl={6}>
                                    <div className="form-group">
                                        <label form="level">Education Level</label>
                                        
                                        <Field as="select" name="level" className="form-field">
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
                                        </Field>
                                        
                                    </div>
                                </Col>
                                <Col sm={12} md={12} xl={6}>
                                    <div className="form-group">
                                        <label form="grade">Exam Grade</label>
                                        
                                        <Field as="select" name="grade" className="form-field">
                                            <option value="">Select your exam grade</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                            <option value="G">G</option>
                                        </Field>
                                        
                                    </div>
                                </Col>
                            </Row>

                            <div className="form-group">
                                <label form="school">School</label>

                                <Field name="school" type='text' className="form-field" placeholder="Enter School Name" />
                                
                            </div>

                            <Row>
                                <Col sm={12} md={12} xl={6}>
                                    <div className="form-group">
                                        <label form="password">Password</label>
                                        <Field name="password" type='password' className="form-field" placeholder="Enter Password" />

                                        <ErrorMessage
                                            component="span"
                                            name="password"
                                            className="form-error"
                                        />
                                    </div>
                                </Col>
                                <Col sm={12} md={12} xl={6}>
                                    <div className="form-group">
                                        <label form="confirmation">Password Confirmation</label>
                                        <Field name="confirmation" type='password' className="form-field" placeholder="Re-type password" />

                                        <ErrorMessage
                                            component="span"
                                            name="confirmation"
                                            className="form-error"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <button className="button" type="submit">
                                Register
                            </button>
                        </Form>
                    </Formik>
                    </div>
                    {!loggedin && <p className="parent-reg">Not a student? <Link to="/parent-register"> Click here to register as parent</Link></p>}
                </div>
            </div>
        </div>
    )
}

export default Register