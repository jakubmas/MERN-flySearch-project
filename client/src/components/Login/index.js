import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../../redux/actions/auth";
import Input from "../Input";

import Alert from "../Alert";

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="section--login">
      <div className="login--container">
        <div className="login--main">
          <div>
            <div className="alert--container">
              <Alert />
            </div>

            <div className="login__form">
              <form
                action=""
                className="form"
                onSubmit={e => onSubmit(e)}
                autoComplete="off"
              >
                <div className="u-center-text u-margin--bottom-medium">
                  <h2 className="heading-secondary">Login</h2>
                </div>
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
                  id="password-login"
                  htmlFor="password-login"
                />
                <input type="submit" className="btn--small" value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
