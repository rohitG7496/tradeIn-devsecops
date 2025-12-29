import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { getCategories } from "../../helper";
import NoProfileImage from "../../assets/NoProfile.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { editAddress } from "../../redux/mydetails/myDetailsActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
	Button,
	Grid,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	Divider,
	DialogContent,
	IconButton,
	FormHelperText,
} from "@material-ui/core";
import {
	FormLabel,
	FormControl,
	FormControlLabel,
	FormGroup,
} from "@material-ui/core";
import PostLoader from "../Loaders/PostLoader";
import {
	getUserDetails,
	userLoading,
} from "../../redux/profile/profileActions";

class Address extends Component {
	constructor(props) {
		super(props);

		this.state = {
			address: this.props.user.address || "",
			district: this.props.user.district || "",
			city: this.props.user.city || "",
			pincode: this.props.user.pincode || "",
			phone: this.props.user.phone || "",
			firstname: this.props.user.first_name || "",
			lastname: this.props.user.last_name || "",
			firstnameValid: true,
			lastnameValid: true,
			cityValid: true,
			districtValid: true,
			pincodeValid: true,
			addressValid: true,
			phoneValid: true,
			formValid: true,
			formErrors: {
				address: "",
				district: "",
				city: "",
				pincode: "",
				phone: "",
				firstname: "",
				lastname: "",
			},
		};
	}
	async componentDidMount() {
		// await this.props.userLoadingDispatch(true)
		await this.props.getUserDispatch(this.props.match.params.id);
	}

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
		let firstnameValid = this.state.firstnameValid;
		let lastnameValid = this.state.lastnameValid;
		let districtValid = this.state.districtValid;
		let cityValid = this.state.cityValid;
		let pincodeValid = this.state.pincodeValid;
		let addressValid = this.state.addressValid;
		let phoneValid = this.state.phoneValid;
		let errorMsg = "";
		switch (fieldName) {
			case "firstname":
				firstnameValid = value.match(/^[A-Za-z]{2,63}$/);
				errorMsg =
					value.length < 2 || value.length > 50
						? "length should be between 2-50 characters"
						: !firstnameValid
						? "only Characters are allowed"
						: "";
				fieldValidationErrors.firstname = errorMsg;
				break;
			case "lastname":
				lastnameValid = value.match(/^[A-Za-z]{2,63}$/);
				errorMsg =
					value.length < 2 || value.length > 50
						? "length should be between 2-50 characters"
						: !lastnameValid
						? "only Characters are allowed"
						: "";
				fieldValidationErrors.lastname = errorMsg;
				break;
			case "city":
				cityValid = value.match(/^[A-Za-z]{2,63}$/);
				errorMsg =
					value.length < 2 || value.length > 100
						? "length should be between 2-30 characters"
						: !cityValid
						? "only Characters are allowed"
						: "";
				fieldValidationErrors.city = errorMsg;
				break;
			case "district":
				districtValid = value.match(/^[A-Za-z]{2,63}$/);
				errorMsg =
					value.length < 2 || value.length > 30
						? "length should be between 2-30 characters"
						: !districtValid
						? "only Characters are allowed"
						: "";
				fieldValidationErrors.district = errorMsg;
				break;
			case "address":
				errorMsg =
					value.length < 2 || value.length > 100
						? "length should be between 2-100 characters"
						: "";
				addressValid = errorMsg === "";
				fieldValidationErrors.address = errorMsg;
				break;
			case "phone":
				phoneValid = value.match(/^[6-9][0-9]{9}$/);
				errorMsg =
					value.length < 10 || value.length > 10
						? "Enter 10 characters phone number"
						: !phoneValid
						? "invalid phone number"
						: "";
				fieldValidationErrors.phone = errorMsg;
				break;
			case "pincode":
				pincodeValid = value.match(/^[0-9]{6}$/);
				errorMsg =
					value.length < 6 || value.length > 10
						? "Enter 6 characters pincode"
						: !pincodeValid
						? "only numbers are allowed"
						: "";
				fieldValidationErrors.pincode = errorMsg;
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				firstnameValid: firstnameValid,
				lastnameValid: lastnameValid,
				districtValid: districtValid,
				cityValid: cityValid,
				pincodeValid: pincodeValid,
				addressValid: addressValid,
				phoneValid: phoneValid,
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid:
				this.state.firstnameValid &&
				this.state.lastnameValid &&
				this.state.districtValid &&
				this.state.cityValid &&
				this.state.pincodeValid &&
				this.state.addressValid &&
				this.state.phoneValid,
		});
	}

	onHandleSubmit = async (e) => {
		e.preventDefault();
		const { formValid } = this.state;
		const data = {
			first_name: this.state.firstname,
			last_name: this.state.lastname,
			district: this.state.district,
			city: this.state.city,
			pincode: this.state.pincode + "",
			address: this.state.address,
			phone: this.state.phone + "",
		};
		if (formValid) await this.props.editAddressDispatch(data);
	};

	render() {
		const categories = getCategories();
		const { formErrors, formValid } = this.state;
		const { user, myDetails, loading } = this.props;
		let is_mine = false;
		if (myDetails) is_mine = user.username == myDetails.username;
		// if(loading) return <PostLoader/>
		if (!user) return <div>User not found</div>;
		return (
			<Dialog
				open={true}
				// onClose={this.handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
				fullScreen
				maxWidth="lg"
			>
				<DialogTitle className="ordertitle">
					<IconButton onClick={() => this.props.history.goBack()}>
						<ArrowBackIcon />
					</IconButton>
					Edit Address
				</DialogTitle>
				<Divider />
				<DialogContent style={{ padding: "8px" }}>
					<div className="address">
						<form className="address__details">
							<Grid container spacing={2} className="address__details">
								<Grid
									item
									lg={6}
									md={6}
									sm={12}
									xs={12}
									className="address__details__district"
								>
									<div className="login__right__myForm__formData">
										<label htmlFor="name">Firstname</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="firstname"
											value={this.state.firstname}
											placeholder="Firstname"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.firstname}
										</FormHelperText>
									</div>
								</Grid>
								<Grid
									item
									lg={6}
									md={6}
									sm={12}
									xs={12}
									className="address__details__city"
								>
									<div className="login__right__myForm__formData">
										<label htmlFor="name">Lastname</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="lastname"
											value={this.state.lastname}
											placeholder="Lastname"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.lastname}
										</FormHelperText>
									</div>
								</Grid>
								<Grid item xs={12} className="address__details__add">
									<div className="login__right__myForm__formData">
										<label htmlFor="name">Address</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="address"
											value={this.state.address}
											placeholder="Address"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.address}
										</FormHelperText>
									</div>
								</Grid>
								<Grid
									item
									lg={6}
									md={6}
									sm={12}
									xs={12}
									className="address__details__district"
								>
									<div className="login__right__myForm__formData">
										<label htmlFor="name">District</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="district"
											value={this.state.district}
											placeholder="District"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.district}
										</FormHelperText>
									</div>
								</Grid>
								<Grid
									item
									lg={6}
									md={6}
									sm={12}
									xs={12}
									className="address__details__city"
								>
									<div className="login__right__myForm__formData">
										<label htmlFor="name">City</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="city"
											value={this.state.city}
											placeholder="City"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.city}
										</FormHelperText>
									</div>
								</Grid>
								<Grid
									item
									lg={6}
									md={6}
									sm={12}
									xs={12}
									className="address__details__pin"
								>
									<div className="login__right__myForm__formData">
										<label htmlFor="name">Pin Code</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="pincode"
											value={this.state.pincode}
											placeholder="Pin Code"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.pincode}
										</FormHelperText>
									</div>
								</Grid>
								<Grid
									item
									lg={6}
									md={6}
									sm={12}
									xs={12}
									className="address__details__phone"
									style={{ paddingRight: "4px" }}
								>
									<div className="login__right__myForm__formData">
										<label htmlFor="name">Phone No</label>
										<br />
										<TextField
											onChange={this.onHandleChange}
											required
											style={{ paddingTop: "10px", width: "100%" }}
											className="login__right__myForm__formData__username"
											name="phone"
											value={this.state.phone}
											placeholder="Phone No"
											variant="outlined"
											className="login__right__myForm__formData__select"
										></TextField>
										<FormHelperText className="errormessage">
											{formErrors.phone}
										</FormHelperText>
									</div>
								</Grid>
								{is_mine && (
									<Button
										disabled={!formValid}
										onClick={this.onHandleSubmit}
										className={
											!formValid
												? "login__right__myForm__loginButton__disable"
												: "login__right__myForm__loginButton"
										}
										type="submit"
									>
										Edit Address
									</Button>
								)}
							</Grid>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.profile.userLoading,
		myDetails: state.myDetails.myDetails,
		user: ownProps.match.params.id
			? state.profile.users[ownProps.match.params.id]
			: null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editAddressDispatch: (data) => dispatch(editAddress(data)),
		userLoadingDispatch: (value) => dispatch(userLoading(value)),
		getUserDispatch: (id) => dispatch(getUserDetails(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Address));
