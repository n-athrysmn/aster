import "../Styles/login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg";
import { Link, useNavigate } from "react-router-dom";

function Login({ loggedin }) {
  const navigate = useNavigate();

  const handleLogin = (values, { setSubmitting }) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("@user", JSON.stringify(response.config.data));
          navigate("/");
          window.location.reload(); // auto reload the page
        } else {
          alert(response.data.msg);
        }
        setSubmitting(false); // set submitting to false to enable button again
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while logging in");
        setSubmitting(false); // set submitting to false to enable button again
      });
  };

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "A password should be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Picture" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!loggedin && <Link to="/" className="active-link">Login</Link>}
            </div>

            <div className="user-link-cad">
              {!loggedin && <Link to="/register">Register</Link>}
            </div>
          </div>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
          {(formikBag) => (
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Email</label>

                <Field
                  name="email"
                  type="email"
                  className="form-field"
                  placeholder="Email"
                />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}

              <div className="form-group">
                <label form="email">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-field"
                  placeholder="Password"
                />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

                <button className="button" type="submit" disabled={formikBag.isSubmitting}>
                    {formikBag.isSubmitting ? "Loading..." : "LOGIN"}
                </button>
            </Form>
          )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
