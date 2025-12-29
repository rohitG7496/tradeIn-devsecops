import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  DialogContentText,
  FormControl,
  InputAdornment,
  IconButton,
  DialogTitle,
  FormHelperText,
  LinearProgress,
} from "@material-ui/core";
import LoginImage from "../../assets/LoginImage.svg";
import WebsiteLogo from "../../assets/WebsiteLogo.svg";
import LoginBg from "../../assets/LoginBg.svg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";
import { Link, withRouter } from "react-router-dom";
import { loginAction } from "../../redux/token/tokenActions";
import { connect } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import HttpsIcon from "@material-ui/icons/Https";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
class Login extends Component {
  state = {
    username: "",
    password: "",
    usernameValid: "",
    showPassword: false,
    passwordValid: "",
    formValid: "",
    formErrors: {
      username: "",
      password: "",
    },
  };

  onHandleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "username":
        usernameValid = value.match(/^[A-Za-z0-9_@]{3,63}$/);
        const errorMsg =
          value.length < 3 || value.length > 30
            ? "length should be between 3-30 characters"
            : !usernameValid
            ? "Characters, Numbers and Underscores are allowed"
            : "";
        fieldValidationErrors.username = errorMsg;
        break;
      case "password":
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid,
    });
  }

  onHandleSubmit = async (e) => {
    e.preventDefault();
    const { loading, success } = this.props;
    const { username, password, formValid } = this.state;

    // if (!success && !loading && formValid) {
    await this.props.loginDispatch(username, password, "login");
    // }
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleClose = () => {
    this.props.history.push(this.props.pathname);
  };

  render() {
    const { showPassword, formErrors, formValid, username, password } =
      this.state;
    const { loading, success, isLoggedIn } = this.props;
    if (
      isLoggedIn &&
      new URLSearchParams(this.props.location.search).get("login")
    ) {
      this.props.history.push(this.props.location.pathname);
    }
    if (
      isLoggedIn ||
      !new URLSearchParams(this.props.location.search).get("login")
    ) {
      return null;
    }
    return (
      <React.Fragment>
        <Breakpoint large up>
          <Dialog
            open={true}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="lg"
          >
            <DialogContent
              style={{ overflow: "hidden", height: "30rem", padding: "0" }}
            >
              <div className="login">
                <div className="login__left">
                  <div className="login__left__logo">
                    <img src={WebsiteLogo} />
                    <h1>TradeIn</h1>
                  </div>
                  <p>A better place to buy and sell products</p>
                  <h2>Welcome back!</h2>
                  <div className="login__left__loginImage">
                    <img src={LoginImage} />
                  </div>
                </div>
                <div className="login__right">
                  {loading && <LinearProgress style={{ height: "5.5px" }} />}
                  <h2>Login to your account</h2>
                  <form
                    className="login__right__myForm"
                    onSubmit={this.onHandleSubmit}
                  >
                    <div className="login__right__myForm__formData">
                      <label htmlFor="name">Username</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="username"
                        className="login__right__myForm__formData__username"
                        name="username"
                        value={username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                style={{ color: "#9e9e9e", fontSize: "1.4rem" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      ></TextField>
                      <FormHelperText className="errormessage">
                        {formErrors.username}
                      </FormHelperText>
                    </div>
                    <div className="login__right__myForm__formData">
                      <label htmlFor="pass">Password</label>
                      <br />
                      <TextField
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        placeholder="password"
                        onChange={this.onHandleChange}
                        className="login__right__myForm__formData__username"
                        variant="outlined"
                        name="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HttpsIcon
                                style={{ color: "#9e9e9e", fontSize: "1.4rem" }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                style={{ color: "#9e9e9e", fontSize: "1.4rem" }}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                      <FormHelperText className="errormessage">
                        {formErrors.password}
                      </FormHelperText>
                    </div>

                    <div className="login__right__myForm__pass">
                      Forgot Password?
                    </div>
                    <Button
                      disabled={!formValid || loading}
                      onClick={this.onHandleSubmit}
                      className={
                        !formValid || loading
                          ? "login__right__myForm__loginButton__disable"
                          : "login__right__myForm__loginButton"
                      }
                      type="submit"
                    >
                      Login
                    </Button>
                    <div className="login__right__myForm__signup">
                      New to TradeIn?&nbsp;
                      <Link to="?signup=true">Create Account</Link>
                    </div>
                    <Button
                      className="login__right__myForm__close"
                      onClick={this.handleClose}
                    >
                      Close
                    </Button>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Breakpoint>
        <Breakpoint medium down>
          <Dialog
            open={true}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            fullScreen
            maxWidth="lg"
          >
            <DialogTitle className="moboLogo__title">
              <div className="moboLogo">
                <div className="moboLogo__icon">
                  <IconButton onClick={()=>this.props.history.push(this.props.location.pathname)}>
                    <ArrowBackIosIcon />
                  </IconButton>
                </div>

                <img src={WebsiteLogo} />
                <h1>TradeIn</h1>
              </div>
              <div className="para">
                <p>A better place to buy and sell products</p>
              </div>
            </DialogTitle>

            <DialogContent
              style={{ overflow: "hidden", height: "30rem", padding: "0" }}
              dividers
            >
              <div className="login">
                <div className="login__right">
                  {loading && <LinearProgress style={{ height: "5.5px" }} />}
                  <h2>Login to your account</h2>
                  <form
                    className="login__right__myForm"
                    onSubmit={this.onHandleSubmit}
                  >
                    <div className="login__right__myForm__formData">
                      <label htmlFor="name">Username</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="username"
                        className="login__right__myForm__formData__username"
                        name="username"
                        value={username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                style={{ color: "#9e9e9e", fontSize: "1.4rem" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      ></TextField>
                      <FormHelperText className="errormessage">
                        {formErrors.username}
                      </FormHelperText>
                    </div>
                    <div className="login__right__myForm__formData">
                      <label htmlFor="pass">Password</label>
                      <br />
                      <TextField
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        placeholder="password"
                        onChange={this.onHandleChange}
                        className="login__right__myForm__formData__username"
                        variant="outlined"
                        name="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HttpsIcon
                                style={{ color: "#9e9e9e", fontSize: "1.4rem" }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                style={{ color: "#9e9e9e", fontSize: "1.4rem" }}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                      <FormHelperText className="errormessage">
                        {formErrors.password}
                      </FormHelperText>
                    </div>

                    <div className="login__right__myForm__pass">
                      Forgot Password?
                    </div>
                    <Button
                      disabled={!formValid || loading}
                      onClick={this.onHandleSubmit}
                      className={
                        !formValid || loading
                          ? "login__right__myForm__loginButton__disable"
                          : "login__right__myForm__loginButton"
                      }
                      type="submit"
                    >
                      Login
                    </Button>
                    <div className="login__right__myForm__signup">
                      New to TradeIn?&nbsp;
                      <a href="?signup=true">Create Account</a>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Breakpoint>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.token.loading,
    isLoggedIn: state.token.isLoggedIn,
    success: state.token.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch: (username, password, value) =>
      dispatch(loginAction(username, password, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
