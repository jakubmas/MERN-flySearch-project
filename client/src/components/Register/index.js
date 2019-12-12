import React, {useState} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {register} from "../../redux/actions/auth";
import {setAlert} from "../../redux/actions/alert";
import PropTypes from "prop-types";

import Input from "../Input";
import Alert from "../Alert";

const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 3000);
    } else if (!name) {
      setAlert("Name is required", "danger", 3000);
    } else {
      register({name, email, password});
    }
  };
  //Redirect if registered
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <section className="section--register">
      <div className="register--container">
        <div className="register--main">
          <div className="alert--container">
            <Alert />
          </div>
          <div className="register__form">
            <form
              action=""
              className="form"
              onSubmit={e => onSubmit(e)}
              autoComplete="off"
            >
              <Input
                value={name}
                onChangeHandler={onChange}
                type="name"
                name="name"
                placeholder="Name"
                id="name-register"
                htmlFor="name-register"
              />
              <Input
                value={email}
                onChangeHandler={onChange}
                type="text"
                name="email"
                placeholder="Email Address"
                id="email-login"
                htmlFor="email-login"
              />
              <Input
                value={password}
                onChangeHandler={onChange}
                type="password"
                name="password"
                placeholder="Password"
                id="password-register"
                htmlFor="password-register"
              />
              <Input
                value={password2}
                onChangeHandler={onChange}
                type="password"
                name="password2"
                placeholder="Repeat your password"
                id="password-repeat-register"
                htmlFor="password-repeat-register"
              />
              <input type="submit" className="btn--small" value="Register" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {register, setAlert})(Register);
