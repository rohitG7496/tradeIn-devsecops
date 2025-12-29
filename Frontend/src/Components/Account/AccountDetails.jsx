import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { Link, withRouter } from "react-router-dom";
import { Button, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Grid,
	IconButton,
} from "@material-ui/core";
import {
	getUserBuy,
	getUserDonate,
	getUserExchange,
	loading,
	getUserOrders,
	getUserWishlist,
	getUserReserve,
	userLoading,
} from "../../redux/profile/profileActions";
import { connect } from "react-redux";
import NoProfileImage from "../../assets/NoProfile.svg";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PostCard from "../Card/PostCard";
import CardSkeleton from "../Skeleton/CardSkeleton";
import EmptyData from "../Skeleton/EmptyData";
import { ProfileImageUrl } from "../../api/pathConstants";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import LoopIcon from "@material-ui/icons/Loop";
import { editImage } from "../../redux/mydetails/myDetailsActions";
import { getFormattedPath } from "../../helper";
import { AUTH_ACCOUNT_PATH } from "../../constants/routeConstants";

class AccountDetails extends Component {
	state = {
		product: "",
		img1: { image: null, file: null },
	};
	async componentDidMount() {
		await this.props.setLoading(true);
		await this.setState({ product: this.props.product });
		if (this.props.product === "sell") {
			await this.props.buyDispatch(this.props.match.params.id);
		}
		if (this.props.product === "donate") {
			await this.props.donateDispatch(this.props.match.params.id);
		}
		if (this.props.product === "exchange") {
			await this.props.exchangeDispatch(this.props.match.params.id);
		}
		if (this.props.product === "orders") {
			await this.props.ordersDispatch(this.props.match.params.id);
		}
		if (this.props.product === "wishlist") {
			await this.props.wishlistDispatch(this.props.match.params.id);
		}
		if (this.props.product === "reserves") {
			await this.props.reservesDispatch(this.props.match.params.id);
		}
	}

	async componentDidUpdate(props, state) {
		if (this.props.product != props.product) {
			await this.props.setLoading(true);
			await this.setState({ product: this.props.product });
			if (this.props.product === "sell") {
				await this.props.buyDispatch(this.props.match.params.id);
			}
			if (this.props.product === "donate") {
				await this.props.donateDispatch(this.props.match.params.id);
			}
			if (this.props.product === "exchange") {
				await this.props.exchangeDispatch(this.props.match.params.id);
			}
			if (this.props.product === "orders") {
				await this.props.ordersDispatch(this.props.match.params.id);
			}
			if (this.props.product === "reserves") {
				await this.props.reservesDispatch(this.props.match.params.id);
			}
			if (this.props.product === "wishlist") {
				await this.props.wishlistDispatch(this.props.match.params.id);
			}
		}
	}
	onImageChange = async (e) => {
		const name = e.target.name;
		if (name == "img1")
			await this.setState({
				img1: {
					image: URL.createObjectURL(e.target.files[0]),
					file: e.target.files[0],
				},
			});
		// console.log(e.target.files[0])
		const data = new FormData();
		data.append("image", e.target.files[0]);
		this.props.editImageDispatch(data);
	};
	render() {
		const { data, loading, myDetails, user, product } = this.props;
		if (!data) return null;
		let is_mine = false;
		if (myDetails) is_mine = user.username === myDetails.username;
		// console.log(this.props.location)
		return (
			<>
				<Breakpoint large up>
					<Grid container className="acc" spacing={4}>
						<Grid item xs={3}>
							<div className="acc__fs">
								<div
									style={{
										position: "relative",
										margin: "0 auto",
										width: "10rem",
										height: "10rem",
									}}
								>
									<img
										src={
											user.image
												? ProfileImageUrl + "" + user.image
												: NoProfileImage
										}
									/>
									{/* {is_mine && ( */}
									<div
										className="authhome__upper__profile__pic__cam"
										style={{ right: "6px", bottom: "0px" }}
									>
										<Button variant="contained" component="label">
											<CameraAltIcon
												style={{ color: "white", fontSize: "2rem" }}
											/>
											<input
												type="file"
												hidden
												onChange={this.onImageChange}
												name="img1"
												accept="image/png, image/jpeg"
											/>
										</Button>
									</div>
									{/* )} */}
								</div>
								<h3>
									{this.props.user.first_name + " " + this.props.user.last_name}
								</h3>
								<h5>{this.props.user.username}</h5>
								<div className="authhome__upper__profile__coinsbig">
									{" "}
									<OfflineBoltIcon style={{ color: "#ffef00" }} />
									{user.coins}{" "}
								</div>
							</div>
							<div className="acc__fs" style={{ marginTop: "12px" }}>
								{is_mine && (
									<Link
										to={`/account/${this.props.match.params.id}/orders`}
										className="authhome__menu"
									>
										<div
											className="authhome__menu__icons"
											style={{
												color: product == "orders" ? "#9147ff" : "#6e6e6e",
											}}
										>
											<ShoppingCartIcon
												style={{
													color: product == "orders" ? "#9147ff" : "#6e6e6e",
												}}
											/>
											Order
										</div>
									</Link>
								)}

								{is_mine && (
									<Link
										to={`/account/${this.props.match.params.id}/reserves`}
										className="authhome__menu"
									>
										<div
											className="authhome__menu__icons"
											style={{
												color: product == "reserves" ? "#9147ff" : "#6e6e6e",
											}}
										>
											<ShoppingCartIcon
												style={{
													color: product == "reserves" ? "#9147ff" : "#6e6e6e",
												}}
											/>
											Reserve
										</div>
									</Link>
								)}

								{is_mine && (
									<Link
										to={`/account/${this.props.match.params.id}/wishlist`}
										className="authhome__menu"
									>
										<div
											className="authhome__menu__icons"
											style={{
												color: product == "wishlist" ? "#9147ff" : "#6e6e6e",
											}}
										>
											<FavoriteIcon
												style={{
													color: product == "wishlist" ? "#9147ff" : "#6e6e6e",
												}}
											/>
											Wishlist
										</div>
									</Link>
								)}
								<Link
									to={`/account/${this.props.match.params.id}/sell`}
									className="authhome__menu"
								>
									<div
										className="authhome__menu__icons"
										style={{ color: product == "sell" ? "#9147ff" : "#6e6e6e" }}
									>
										<LocalOfferIcon
											style={{
												color: product == "sell" ? "#9147ff" : "#6e6e6e",
											}}
										/>
										Sell
									</div>
								</Link>
								<Link
									to={`/account/${this.props.match.params.id}/donate`}
									className="authhome__menu"
								>
									<div
										className="authhome__menu__icons"
										style={{
											color: product == "donate" ? "#9147ff" : "#6e6e6e",
										}}
									>
										<OfflineBoltIcon
											style={{
												color: product == "donate" ? "#9147ff" : "#6e6e6e",
											}}
										/>
										Donate
									</div>
								</Link>
								<Link
									to={`/account/${this.props.match.params.id}/exchange`}
									className="authhome__menu"
								>
									<div
										className="authhome__menu__icons"
										style={{
											color: product == "exchange" ? "#9147ff" : "#6e6e6e",
										}}
									>
										<LoopIcon
											style={{
												color: product == "exchange" ? "#9147ff" : "#6e6e6e",
											}}
										/>
										Exchange
									</div>
								</Link>
								<Link
									to={`/account/${this.props.match.params.id}/address`}
									className="authhome__menu"
									style={{ borderBottom: "none" }}
								>
									<div
										className="authhome__menu__icons"
										style={{
											color: product == "address" ? "#9147ff" : "#6e6e6e",
										}}
									>
										<OfflineBoltIcon
											style={{
												color: product == "address" ? "#9147ff" : "#6e6e6e",
											}}
										/>
										Address
									</div>
								</Link>
							</div>
						</Grid>

						<Grid
							item
							xs={9}
							style={{ display: "flex", flexWrap: "wrap" }}
							spacing={4}
						>
							{getFormattedPath(
								this.props.location.pathname,
								AUTH_ACCOUNT_PATH
							) ? (
								<Grid
									item
									xs={12}
									style={{ display: "flex", flexDirection: "column" }}
								>
									{" "}
									<img
										src={
											user.image
												? ProfileImageUrl + "" + user.image
												: NoProfileImage
										}
										style={{
											width: "30rem",
											height: "30rem",
											margin: "0 auto",
											borderRadius: "50%",
											marginTop: "1rem",
										}}
									/>
									<h2
										style={{
											margin: "0 auto",
											paddingTop: "1rem",
											fontSize: "2rem",
										}}
									>
										{user.first_name + " " + user.last_name}
									</h2>
									<h3
										style={{
											margin: "0 auto",
											paddingTop: "0.5rem",
											fontSize: "1.5rem",
											color: "#6e6e6e",
										}}
									>
										{user.username}
									</h3>
								</Grid>
							) : loading ? (
								[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
									<Grid
										item
										lg={3}
										md={3}
										sm={6}
										xs={6}
										style={{ marginBottom: "1rem", padding: "8px" }}
									>
										<CardSkeleton />
									</Grid>
								))
							) : data.length == 0 ? (
								<EmptyData type={this.props.product} />
							) : (
								data.map((item) => (
									<Grid
										item
										lg={3}
										md={3}
										sm={6}
										xs={6}
										style={{ marginBottom: "1rem", padding: "8px" }}
									>
										<Link
											to={
												this.props.product === "orders"
													? `/account/${this.props.match.params.id}/orders/${item.id}`
													: `/buy/${item.id}`
											}
										>
											<PostCard
												item={item}
												type={this.props.product}
												{...this.props}
											/>
										</Link>
									</Grid>
								))
							)}
						</Grid>
						{/* <Grid item xs={3}>

                </Grid> */}
					</Grid>
				</Breakpoint>

				<Breakpoint medium down>
					<Dialog
						open={true}
						// onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
						fullWidth
						fullScreen
						maxWidth="lg"
					>
						<DialogTitle className="ordertitle">
							<IconButton
								onClick={() =>
									this.props.history.push(
										`/account/${this.props.match.params.id}`
									)
								}
							>
								<ArrowBackIcon />
							</IconButton>
							{this.props.title}
						</DialogTitle>
						<Divider />
						<DialogContent style={{ padding: "8px" }}>
							<Grid
								container
								spacing={3}
								style={{ width: "100%", margin: "0" }}
							>
								{loading ? (
									[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
										<Grid
											item
											lg={3}
											md={3}
											sm={6}
											xs={6}
											style={{ marginBottom: "1rem" }}
										>
											<CardSkeleton />
										</Grid>
									))
								) : data.length == 0 ? (
									<EmptyData type={this.props.product} />
								) : (
									data.map((item) => (
										<Grid
											item
											lg={3}
											md={3}
											sm={6}
											xs={6}
											style={{ marginBottom: "1rem" }}
										>
											<Link
												to={
													this.props.product === "orders"
														? `/account/${this.props.match.params.id}/orders/${item.id}`
														: `/buy/${item.id}`
												}
											>
												<PostCard
													item={item}
													type={this.props.product}
													{...this.props}
												/>
											</Link>
										</Grid>
									))
								)}
							</Grid>
						</DialogContent>
					</Dialog>
				</Breakpoint>
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const ur = ownProps.match.params.id;
	return {
		myDetails: state.myDetails.myDetails,
		loading: state.profile.productLoading,
		data:
			ownProps.product == "sell" && ur in state.profile.buy == true
				? state.profile.buy[ur]
				: ownProps.product == "reserves" && ur in state.profile.reserves == true
				? state.profile.reserves[ur]
				: ownProps.product == "donate" && ur in state.profile.donate == true
				? state.profile.donate[ur]
				: ownProps.product == "exchange" && ur in state.profile.exchange == true
				? state.profile.exchange[ur]
				: ownProps.product == "orders" && ur in state.profile.orders == true
				? state.profile.orders[ur]
				: ownProps.product == "wishlist" && ur in state.profile.wishlist == true
				? state.profile.wishlist[ur]
				: [],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		buyDispatch: (id) => dispatch(getUserBuy(id)),
		editImageDispatch: (data) => dispatch(editImage(data)),
		donateDispatch: (id) => dispatch(getUserDonate(id)),
		exchangeDispatch: (id) => dispatch(getUserExchange(id)),
		ordersDispatch: (id) => dispatch(getUserOrders(id)),
		reservesDispatch: (id) => dispatch(getUserReserve(id)),
		wishlistDispatch: (id) => dispatch(getUserWishlist(id)),
		setLoading: (value) => dispatch(loading(value)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AccountDetails));
