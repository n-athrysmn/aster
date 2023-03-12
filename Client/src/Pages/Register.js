import "../Styles/register.css"
import Img from "../Assets/result.svg"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';


function Register({ loggedin = false }) {

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
            window.location.reload();
        });
    };

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
    });


    return (
        <div className="body">
            <div className="left-register">
                <img src={Img} alt="Picture" className="chart" />
            </div>
            <div className="right-register">
                <div className="card-register">
                    <div className="user-links">
                        <div className="user-link-home">
                            {!loggedin && <Link to="/">Login</Link>}
                        </div>

                        <div className="user-link-cad">
                            {!loggedin && <Link to="/register" className="active-link">Register</Link>}
                        </div>
                    </div>
                    <Formik
                        initialValues={{}}
                        onSubmit={handleRegister}
                        validationSchema={validationsRegister}
                    >
                        <Form className="login-form">
                            <div className="form-group">
                                <label form="firstName">First Name</label>

                                <Field name="firstName" type='text' className="form-field" placeholder="First Name" />
                                
                            </div>

                            <div className="form-group">
                                <label form="lastName">Last Name</label>

                                <Field name="lastName" type='text' className="form-field" placeholder="Last Name" />

                            </div>

                            <div className="form-group">
                                <label form="email">Email</label>

                                <Field name="email" type='email' className="form-field" placeholder="Email" />

                                <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"
                                />
                            </div>

                            <div className="form-group">
                                <label form="email">Password</label>
                                <Field name="password" type='password' className="form-field" placeholder="Paswword" />

                                <ErrorMessage
                                    component="span"
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            <div className="form-group">
                                <label form="email">Password Confirmation</label>
                                <Field name="confirmation" type='password' className="form-field" placeholder="Re-type password" />

                                <ErrorMessage
                                    component="span"
                                    name="confirmation"
                                    className="form-error"
                                />
                            </div>
                            <button className="button" type="submit">
                                Register
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Register