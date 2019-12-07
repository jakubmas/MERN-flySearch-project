import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {register} from "../../redux/actions/auth";
import PropTypes from "prop-types";

import Input from "../Input";

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
                minLength={6}
              />
              <Input
                value={email}
                onChangeHandler={onChange}
                type="email"
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
                minLength={6}
              />
              <Input
                value={password2}
                onChangeHandler={onChange}
                type="password"
                name="password2"
                placeholder="Repeat your password"
                id="password-repeat-register"
                htmlFor="password-repeat-register"
                minLength={6}
              />
              <input
                type="submit"
                className="btn btn--white"
                value="Register"
              />
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
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {register})(Register);
