import "../Styles/register.css"
import Img from "../Assets/result.svg"
import * as yup from "yup"
import { ErrorMessage, Formik, Form, Field } from "formik"
import Axios from "axios"
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'


function Parent({ loggedin = false }) {

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/parent-register", {
            name: values.name,
            email: values.email,
            number: values.number,
            job: values.job,
            address: values.address,
            salary: values.salary,
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
                            {!loggedin && <Link to="/parent-register" className="active-link">Register</Link>}
                        </div>
                    </div>
                    <div className="card-content">
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            number: '',
                            job: '',
                            address: '',
                            salary: '',
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
                                <label form="job">Occupation</label>

                                <Field name="job" type='text' className="form-field" placeholder="Enter Occupation" />
                                
                            </div>

                            <div className="form-group">
                                <label form="address">Address</label>

                                <Field as='textarea' name="address" className="form-field" placeholder="Enter Address" />
                                
                            </div>

                            <div className="form-group">
                                <label form="salary">Salary Range</label>

                                <Field as='select' name="salary" className="form-field">
                                    <option value="T20">T20</option>
                                    <option value="M40">M40</option>
                                    <option value="B40">B40</option>
                                </Field>
                                
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
                    {!loggedin && <p className="parent-reg">Not a parent? <Link to="/register">Click here to register as student</Link></p>}
                </div>
            </div>
        </div>
    )
}

export default Parent