import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(event.target.value);
  };

  handleLogin = () => {
    console.log(
      "Username: ",
      this.state.username,
      "Password: ",
      this.state.password
    );
    console.log("All state: ", this.state);
  };

  handleShowEyePassLogin = () => {
    // alert("EYE");
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label className="col-12">Username</label>
              <input
                type="text"
                className="col-12 form-control"
                placeholder="Enter the username"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChangeUserName(event);
                }}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label className="col-12">Password</label>
              <div className="custom-login-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="col-12 form-control"
                  placeholder="Enter the password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangePassword(event);
                  }}
                />
                <i
                  class={
                    this.state.isShowPassword
                      ? "far fa-eye"
                      : "far fa-eye-slash"
                  }
                  onClick={() => {
                    this.handleShowEyePassLogin();
                  }}
                ></i>
              </div>
            </div>
            <div className="col-12">
              <button
                className="login-btn"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot the password</span>
            </div>
            <div className="col-12 or-sign-in">
              <span className="text-or-signin">Or sign in with</span>
            </div>
            <div className="col-12 login-social">
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
