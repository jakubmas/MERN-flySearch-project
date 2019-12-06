import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../../redux/actions/auth";

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
    console.log("login", login);
    console.log("email", email, "password", password);
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
              <div className="form__group">
                <input
                  type="email"
                  name="email"
                  className="form__input"
                  placeholder="Email Address"
                  id="email-login"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
                <label htmlFor="email-login" className="form__label">
                  Email addres
                </label>
              </div>
              <div className="form__group">
                <input
                  type="password"
                  name="password"
                  className="form__input"
                  placeholder="Password"
                  id="password-login"
                  value={password}
                  onChange={e => onChange(e)}
                  minLength="6"
                  required
                />
                <label htmlFor="password-login" className="form__label">
                  Password
                </label>
                <input type="submit" className="btn btn--white" value="Login" />
              </div>
            </form>
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
