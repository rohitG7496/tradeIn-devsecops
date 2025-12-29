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
import {UserCheckUsername} from '../../api/pathConstants';
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";
import { Link, withRouter } from "react-router-dom";
import { loginAction, SignupAction } from "../../redux/token/tokenActions";
import { connect } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import HttpsIcon from "@material-ui/icons/Https";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { openSnackbar } from "../../redux/snackbar/snackbarActions";
import { Request } from "../../api/Request";
class SignUp extends Component {
  state = {
    username: "",
    password: "",
    email:"",
    firstname:"",
    lastname:"",
    usernameValid: "",
    showPassword: false,
    passwordValid: "",
    emailValid:"",
    firstnameValid:"",
    lastnameValid:"",
    formValid: "",
    formErrors: {
      username: "",
      email:"",
      firstname:"",
      lastname:"",
      password: "",
    },
  };

  onHandleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if(name=="username"){
      this.setState({ [name]: value }, () => {
        this.validateUsername( value);
      });
    }
    else
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  
  validateUsername = async(value) =>{
    let res = null;
    if(value=="")
      {
        this.setState({formErrors:{username:"length should be between 3-30 characters"},usernameValid:false})
        return;
      }
    await Request("GET",`${UserCheckUsername}${value}/`,null,null).then((data)=>{
    res=data
    });
    // console.log(res.status,"status",value)
    if(res && res.status==204) {
      this.setState({formErrors:{username:"User already exists"},usernameValid:false}, () => {
        this.validateField("username", value);
      })
      return false;
    }
    else if(res && res.status==200) {
       const usernameValid = value.match(/^[A-Za-z0-9_@]{3,30}$/);
       const errorMsg =
          value.length < 3 || value.length > 30
            ? "length should be between 3-30 characters"
            : !usernameValid
            ? "Characters, Numbers and Underscores are allowed"
            : "";

     this.setState({formErrors:{username:errorMsg},usernameValid:usernameValid}, () => {
      // this.validateField("username", value);
    })
      return true;
    }
    else{
     this.props.openSnackbarDispatch("Something wents wrong");
     return true;
    }
    
    
   
  }

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;
    let emailValid = this.state.emailValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const errorMsg3 = !emailValid?" invalid email id" :"";
        fieldValidationErrors.email = errorMsg3
        break;
      // case "username":
      //   usernameValid = value.match(/^[A-Za-z0-9_@]{3,30}$/);
      //   const errorMsg =
      //     value.length < 3 || value.length > 30
      //       ? "length should be between 3-30 characters"

      //       : !usernameValid
      //       ? "Characters, Numbers and Underscores are allowed"
      //       : "";
      //   fieldValidationErrors.username = errorMsg;
      //   break;
      case "firstname":
        firstnameValid = value.match(/^[A-Za-z]{3,30}$/);
        const errorMsg1 = 
            value.length<3 || value.length>30 
            ? "length should be between 3-30 characters"
            : !firstnameValid 
            ? "invalid firstname"
            : "";
            fieldValidationErrors.firstname = errorMsg1;
            break;
      case "lastname":
        lastnameValid = value.match(/^[A-Za-z]{3,30}$/);
        const errorMsg2 = 
            value.length<3 || value.length>30 
            ? "length should be between 3-30 characters"
            : !lastnameValid 
            ? "invalid lastname"
            : "";
            fieldValidationErrors.lastname = errorMsg2;
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
        firstnameValid: firstnameValid,
        lastnameValid: lastnameValid,
        emailValid:emailValid
        
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.emailValid,
    });
  }

  onHandleSubmit = async (e) => {
    e.preventDefault();
    const { loading, success } = this.props;
    const { username, password,email,firstname,lastname, formValid } = this.state;

    // if (!success && !loading && formValid) {
    await this.props.signupDispatch(username, password,email,firstname,lastname, "signup");
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
    const { showPassword, formErrors, formValid,email,firstname,lastname, username, password } =
      this.state;
    const { loading, success, isLoggedIn } = this.props;
    if (
      isLoggedIn &&
      new URLSearchParams(this.props.location.search).get("signup")
    ) {
      this.props.history.push(this.props.location.pathname);
    }
    if (
      isLoggedIn ||
      !new URLSearchParams(this.props.location.search).get("signup")
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
                  <h2>Welcome to our platform!</h2>
                  <div className="login__left__loginImage">
                    <img src={LoginImage} />
                  </div>
                </div>
                <div className="login__right" style={{overflow:"scroll"}}>
                  {loading && <LinearProgress style={{ height: "5.5px" }} />}
                  <h2>Create new account</h2>
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
                      <label htmlFor="name">Email</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="email"
                        className="login__right__myForm__formData__username"
                        name="email"
                        type="email"
                        value={email}
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
                        {formErrors.email}
                      </FormHelperText>
                    </div>
                    <div className="login__right__myForm__formData">
                      <label htmlFor="name">Firstname</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="firstname"
                        className="login__right__myForm__formData__username"
                        name="firstname"
                        value={firstname}
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
                        {formErrors.firstname}
                      </FormHelperText>
                    </div>
                    <div className="login__right__myForm__formData">
                      <label htmlFor="name">Lastname</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="lastname"
                        className="login__right__myForm__formData__username"
                        name="lastname"
                        value={lastname}
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
                        {formErrors.lastname}
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

                    {/* <div className="login__right__myForm__pass">
                      Forgot Password?
                    </div> */}
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
                      Signup
                    </Button>
                    <div className="login__right__myForm__signup" style={{marginBottom:"8px"}}>
                      Already have an account?&nbsp;
                      <Link to="?login=true">Login</Link>
                    </div>
                    {/* <Button
                      className="login__right__myForm__close"
                      onClick={this.handleClose}
                    >
                      Close
                    </Button> */}
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
              
                <div className="login__right" style={{overflow:"scroll"}}>
                  {loading && <LinearProgress style={{ height: "5.5px" }} />}
                  <h2>Create new account</h2>
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
                      <label htmlFor="name">Email</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="email"
                        className="login__right__myForm__formData__username"
                        name="email"
                        type="email"
                        value={email}
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
                        {formErrors.email}
                      </FormHelperText>
                    </div>
                    <div className="login__right__myForm__formData">
                      <label htmlFor="name">Firstname</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="firstname"
                        className="login__right__myForm__formData__username"
                        name="firstname"
                        value={firstname}
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
                        {formErrors.firstname}
                      </FormHelperText>
                    </div>
                    <div className="login__right__myForm__formData">
                      <label htmlFor="name">Lastname</label>
                      <br />
                      <TextField
                        onChange={this.onHandleChange}
                        required
                        placeholder="lastname"
                        className="login__right__myForm__formData__username"
                        name="lastname"
                        value={lastname}
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
                        {formErrors.lastname}
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

                    {/* <div className="login__right__myForm__pass">
                      Forgot Password?
                    </div> */}
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
                      Signup
                    </Button>
                    <div className="login__right__myForm__signup" style={{marginBottom:"8px"}}>
                      Already have an account?&nbsp;
                      <Link to="?login=true">Login</Link>
                    </div>
                    {/* <Button
                      className="login__right__myForm__close"
                      onClick={this.handleClose}
                    >
                      Close
                    </Button> */}
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
    signupDispatch: (username, password,email,firstname,lastname, value) =>
      dispatch(SignupAction(username, password,email,firstname,lastname, value)),
    openSnackbarDispatch:(msg) =>dispatch(openSnackbar(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
