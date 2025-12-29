import React, { Component } from "react";
import WebsiteLogo from "../../assets/WebsiteLogo.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LoopIcon from "@material-ui/icons/Loop";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Breakpoint } from "react-socks";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { removeTokenRequest } from "../../redux/token/tokenActions";
import {
	Checkbox,
	Radio,
	TextField,
	FormControlLabel,
	FormGroup,
	RadioGroup,
	IconButton,
	Drawer,
	Button,
} from "@material-ui/core";
import { getCategories, getColors } from "../../helper";
import {
	addPostFilters,
	getAllBrands,
	retrieveAllPost,
} from "../../redux/post/postActions";

class SideBar extends Component {
	state = {
		...this.props.filters,
		sort: new URLSearchParams(this.props.location.search).get("sort"),
		cond: ["Good", "New", "Like new", "Fair", "Poor"],
	};

	async componentDidMount() {
		await this.props.allBrandsDispatch();
		let barter = false;
		let donate = false;
		const { status, condition, category, subcategory, color, brand, min, max } =
			this.state;
		const data = {
			categoryVisible: true,
			brandVisible: true,
			conditionVisible: true,
			statusVisible: true,
			priceVisible: true,
			colorVisible: true,
			subcategVisible: true,

			status: "Any",
			condition: [],
			category: "Any",
			subcategory: "Any",
			brand: [],
			price: "0",
			color: {},
			min: 0,
			max: 0,
			bool: false,
		};
		await this.props.addPostFiltersDispatch(data);
		await this.props.retrieveAllPostDispatch(
			category,
			subcategory,
			[],
			[],
			min,
			max,
			status,
			[],
			barter,
			donate
		);
	}
	async componentDidUpdate(props, state) {
		if (
			new URLSearchParams(this.props.location.search).get("sort") != state.sort
		) {
			this.setState(
				{ sort: new URLSearchParams(this.props.location.search).get("sort") },
				this.handleFilter
			);
			return;
		}
		if (this.props.location.pathname != props.location.pathname) {
			const data = {
				categoryVisible: true,
				brandVisible: true,
				conditionVisible: true,
				statusVisible: true,
				priceVisible: true,
				colorVisible: true,
				subcategVisible: true,

				status: "Any",
				condition: [],
				category: "Any",
				subcategory: "Any",
				price: "0",
				color: {},
				brand: [],
				min: 0,
				max: 0,
				bool: false,
			};
			await this.props.addPostFiltersDispatch(data);
		} else {
			return;
		}
	}

	handleChangeColor = (item) => {
		this.setState(
			{
				color:
					item in this.state.color == false ||
					(item in this.state.color == true && this.state.color[item] == false)
						? { ...this.state.color, [item]: true }
						: { ...this.state.color, [item]: false },
			},
			this.handleFilter
		);
	};

	handleChangeCondition = (event) => {
		const item = event.target.value;
		this.setState(
			{
				condition:
					item in this.state.condition == false ||
					(item in this.state.condition == true &&
						this.state.condition[item] == false)
						? { ...this.state.condition, [item]: true }
						: { ...this.state.condition, [item]: false },
			},
			this.handleFilter
		);
	};

	handleChangeBrand = (event) => {
		const item = event.target.value;
		this.setState(
			{
				brand:
					item in this.state.brand == false ||
					(item in this.state.brand == true && this.state.brand[item] == false)
						? { ...this.state.brand, [item]: true }
						: { ...this.state.brand, [item]: false },
			},
			this.handleFilter
		);
	};

	handleClickPrice = async () => {
		await this.setState({ bool: true, price: "4" }, this.handleFilter);
		window.scrollTo(0, 0);
	};

	handleFilter = async () => {
		if (this.state.price == 4 && this.state.bool == false) return;
		await this.props.addPostFiltersDispatch(this.state);
		let barter = false;
		let donate = false;
		const {
			status,
			condition,
			category,
			subcategory,
			color,
			brand,
			min,
			bool,
			max,
			price,
		} = this.state;

		let col = [];
		await Object.keys(color).map(
			async (item) => color[item] && (await col.push(item))
		);
		let con = [];
		await Object.keys(condition).map(
			async (item) => condition[item] && (await con.push(item))
		);

		let brandData = [];
		await Object.keys(brand).map(
			async (item) => brand[item] && (await brandData.push(item))
		);

		let minp = 0,
			maxp = 0;
		if (price == 1) {
			maxp = 1000;
		} else if (price == 2) {
			minp = 1001;
			maxp = 2000;
		} else if (price == 3) {
			minp = 2001;
			maxp = 10000000000;
		} else if (price == 4) {
			minp = min;
			maxp = max;
		}

		await this.props.addPostFiltersDispatch(this.state);
		await this.props.retrieveAllPostDispatch(
			category,
			subcategory,
			brandData,
			col,
			minp,
			maxp,
			status,
			con,
			barter,
			donate,
			this.state.sort
		);
		if (price != 4) window.scrollTo(0, 0);
	};

	render() {
		const categories = getCategories();
		const colors = getColors();
		// console.log(this.state);
		const { type } = this.props;
		const {
			categoryVisible,
			brandVisible,
			conditionVisible,
			statusVisible,
			priceVisible,
			colorVisible,
			subcategVisible,
			status,
			color,
			sort,
			condition,
			category,
			cond,
			price,
			subcategory,
		} = this.state;
		return (
			<>
				<Breakpoint large up>
					<div className="sidebar">
						<div className="sidebar__head">Filter By </div>
						<form className="sidebar__cont">
							<div className="sidebar__cont__section">
								<div
									className="sidebar__cont__section__item"
									onClick={() =>
										this.setState({ categoryVisible: !categoryVisible })
									}
								>
									Category <ExpandMoreIcon />
								</div>
								{category == "Any" && (
									<div
										className="sidebar__cont__section__item__list"
										style={{ display: categoryVisible ? "block" : "none" }}
									>
										<FormGroup>
											<RadioGroup
												aria-label="category"
												name="category"
												value={category}
												onChange={async (e) =>
													await this.setState(
														{ category: e.target.value },
														this.handleFilter
													)
												}
											>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="Any"
													control={<Radio />}
													label="Any"
												/>
												{Object.keys(categories).map((item) => {
													return (
														<FormControlLabel
															className="sidebar__cont__section__item__list__label"
															value={item}
															control={<Radio />}
															label={item}
														/>
													);
												})}
											</RadioGroup>
										</FormGroup>
									</div>
								)}

								{category != "Any" && (
									<>
										<div
											className="sidebar__cont__section__item1"
											style={{
												paddingLeft: "1.6rem",
												paddingTop: "12px",
												justifyContent: "flex-start",
												display: categoryVisible ? "block" : "none",
												alignItems: "center",
											}}
										>
											<div className="sidebar__cont__section__item__icon">
												<IconButton
													style={{ padding: "0" }}
													onClick={() =>
														this.setState(
															{ category: "Any", subcategory: "Any" },
															this.handleFilter
														)
													}
												>
													<ArrowBackIosIcon />
												</IconButton>
												<div> {category}</div>
											</div>
											<div
												className="sidebar__cont__section__item__list"
												style={{
													padding: "12px 0  0 0rem",
													display: categoryVisible ? "block" : "none",
												}}
											>
												<FormGroup>
													<RadioGroup
														aria-label="subcategory"
														name="subcategory"
														value={subcategory}
														onChange={(e) =>
															this.setState(
																{ subcategory: e.target.value },
																this.handleFilter
															)
														}
													>
														<FormControlLabel
															className="sidebar__cont__section__item__list__label"
															value="Any"
															control={<Radio />}
															label="Any"
														/>

														{categories[category].map((item) => (
															<FormControlLabel
																className="sidebar__cont__section__item__list__label"
																value={item}
																control={<Radio />}
																label={item}
															/>
														))}
													</RadioGroup>
												</FormGroup>
											</div>{" "}
										</div>
									</>
								)}
							</div>

							<div
								className="sidebar__cont__section"
								style={{ borderTop: "none" }}
							>
								<div
									className="sidebar__cont__section__item"
									onClick={() => this.setState({ brandVisible: !brandVisible })}
								>
									Brand <ExpandMoreIcon />
								</div>
								<div
									className="sidebar__cont__section__item__list"
									style={{
										display: brandVisible ? "block" : "none",
										// maxHeight: "272px",
										// overflowY: "scroll",
									}}
								>
									<FormGroup onChange={this.handleChangeBrand}>
										{this.props.brands &&
											this.props.brands.map((item) => (
												<FormControlLabel
													className="sidebar__cont__section__item__list__label1"
													control={<Checkbox name={item} value={item} />}
													label={item}
												/>
											))}
									</FormGroup>
								</div>
							</div>
							<div
								className="sidebar__cont__section"
								style={{ borderTop: "none" }}
							>
								<div
									className="sidebar__cont__section__item"
									onClick={() =>
										this.setState({ conditionVisible: !conditionVisible })
									}
								>
									Condition <ExpandMoreIcon />
								</div>
								<div
									className="sidebar__cont__section__item__list"
									style={{ display: conditionVisible ? "block" : "none" }}
								>
									<FormGroup onChange={this.handleChangeCondition}>
										{cond.map((item) => (
											<FormControlLabel
												className="sidebar__cont__section__item__list__label1"
												value={item}
												control={
													item in condition && condition[item] == true ? (
														<Checkbox defaultChecked />
													) : (
														<Checkbox />
													)
												}
												label={item}
											/>
										))}
										{/* <FormControlLabel
                    className="sidebar__cont__section__item__list__label1"
                    value="New"
                    control={<Checkbox />}
                    label="New"
                  />
                  <FormControlLabel
                    className="sidebar__cont__section__item__list__label1"
                    value="Like new"
                    control={<Checkbox />}
                    label="Like new"
                  />
                  <FormControlLabel
                    className="sidebar__cont__section__item__list__label1"
                    value="Fair"
                    control={<Checkbox />}
                    label="Fair"
                  />
                  <FormControlLabel
                    className="sidebar__cont__section__item__list__label1"
                    value="Poor"
                    control={<Checkbox />}
                    label="Poor"
                  /> */}
									</FormGroup>
								</div>
							</div>
							<div
								className="sidebar__cont__section"
								style={{ borderTop: "none" }}
							>
								<div
									className="sidebar__cont__section__item"
									onClick={() =>
										this.setState({ statusVisible: !statusVisible })
									}
								>
									Status <ExpandMoreIcon />
								</div>
								<div
									className="sidebar__cont__section__item__list"
									style={{ display: statusVisible ? "block" : "none" }}
								>
									<FormGroup>
										<RadioGroup
											aria-label="status"
											name="status"
											value={status}
											onChange={(e) =>
												this.setState(
													{ status: e.target.value },
													this.handleFilter
												)
											}
										>
											<FormControlLabel
												className="sidebar__cont__section__item__list__label"
												value="Any"
												control={<Radio />}
												label="Any"
											/>
											<FormControlLabel
												className="sidebar__cont__section__item__list__label"
												value="Sold"
												control={<Radio />}
												label="Sold"
											/>
										</RadioGroup>
									</FormGroup>
								</div>
							</div>
							<div
								className="sidebar__cont__section"
								style={{ borderTop: "none" }}
							>
								<div
									className="sidebar__cont__section__item"
									onClick={() => this.setState({ colorVisible: !colorVisible })}
								>
									Color <ExpandMoreIcon />
								</div>
								<div
									className="sidebar__cont__section__item__list"
									style={{
										display: colorVisible ? "block" : "none",
										// maxHeight: "272px",
										// overflowY: "scroll",
									}}
								>
									<FormGroup>
										{colors.map((item) => (
											<FormControlLabel
												className="sidebar__cont__section__item__list__label1"
												value={item}
												control={
													item in this.state.color &&
													this.state.color[item] == true ? (
														<Checkbox
															defaultChecked
															onChange={() => this.handleChangeColor(item)}
														/>
													) : (
														<Checkbox
															onChange={() => this.handleChangeColor(item)}
														/>
													)
												}
												label={item}
											/>
										))}
									</FormGroup>
								</div>
							</div>
							{this.props.location.pathname == "/buy" && (
								<div
									className="sidebar__cont__section"
									style={{ borderTop: "none" }}
								>
									<div
										className="sidebar__cont__section__item"
										onClick={() =>
											this.setState({ priceVisible: !priceVisible })
										}
									>
										Price <ExpandMoreIcon />
									</div>
									<div
										className="sidebar__cont__section__item__list"
										style={{ display: priceVisible ? "block" : "none" }}
									>
										<FormGroup>
											<RadioGroup
												aria-label="status"
												name="price"
												value={price}
												onChange={(e) =>
													this.setState(
														{ price: e.target.value },
														this.handleFilter
													)
												}
											>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="0"
													control={<Radio />}
													label="Any"
												/>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="1"
													control={<Radio />}
													label="Under &#8377;1000"
												/>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="2"
													control={<Radio />}
													label="&#8377;1000 to &#8377;2000"
												/>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="3"
													control={<Radio />}
													label="&#8377;2000 and up"
												/>

												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="4"
													control={<Radio name="checkedF" />}
													label="Custom"
												/>
											</RadioGroup>

											<div className="sidebar__cont__section__item__list__label__custom">
												<TextField
													className="sidebar__cont__section__item__list__label__custom__tf"
													id="filled-number"
													placeholder="Min"
													type="number"
													onChange={(e) =>
														this.setState({ min: e.target.value })
													}
													disabled={price != "4"}
													InputLabelProps={{
														shrink: true,
													}}
													variant="outlined"
												/>

												<div className="sidebar__cont__section__item__list__label__custom__icon">
													_
												</div>
												<TextField
													className="sidebar__cont__section__item__list__label__custom__tf"
													id="filled-number"
													placeholder="Max"
													type="number"
													disabled={price != "4"}
													onChange={(e) =>
														this.setState({ max: e.target.value })
													}
													InputLabelProps={{
														shrink: true,
													}}
													variant="outlined"
												/>
												<div
													className="sidebar__cont__section__item__list__label__custom__btn"
													onClick={this.handleClickPrice}
												>
													Apply
												</div>
											</div>
										</FormGroup>
									</div>
								</div>
							)}
						</form>
					</div>
				</Breakpoint>
				<Breakpoint medium down>
					{this.props.filter ? (
						<Drawer anchor="left" open={true}>
							<div className="sidebar__head" style={{ marginTop: "0" }}>
								Filter By{" "}
								<Button onClick={() => this.props.handleDrawer(false)}>
									Apply
								</Button>
							</div>
							<form className="sidebar__cont">
								<div className="sidebar__cont__section">
									<div
										className="sidebar__cont__section__item"
										onClick={() =>
											this.setState({ categoryVisible: !categoryVisible })
										}
									>
										Category <ExpandMoreIcon />
									</div>
									{category == "Any" && (
										<div
											className="sidebar__cont__section__item__list"
											style={{ display: categoryVisible ? "block" : "none" }}
										>
											<FormGroup>
												<RadioGroup
													aria-label="category"
													name="category"
													value={category}
													onChange={async (e) =>
														await this.setState(
															{ category: e.target.value },
															this.handleFilter
														)
													}
												>
													<FormControlLabel
														className="sidebar__cont__section__item__list__label"
														value="Any"
														control={<Radio />}
														label="Any"
													/>
													{Object.keys(categories).map((item) => {
														return (
															<FormControlLabel
																className="sidebar__cont__section__item__list__label"
																value={item}
																control={<Radio />}
																label={item}
															/>
														);
													})}
												</RadioGroup>
											</FormGroup>
										</div>
									)}

									{category != "Any" && (
										<>
											<div
												className="sidebar__cont__section__item1"
												style={{
													paddingLeft: "1.6rem",
													paddingTop: "12px",
													justifyContent: "flex-start",
													display: categoryVisible ? "block" : "none",
													alignItems: "center",
												}}
											>
												<div className="sidebar__cont__section__item__icon">
													<IconButton
														style={{ padding: "0" }}
														onClick={() =>
															this.setState(
																{ category: "Any", subcategory: "Any" },
																this.handleFilter
															)
														}
													>
														<ArrowBackIosIcon />
													</IconButton>
													<div> {category}</div>
												</div>
												<div
													className="sidebar__cont__section__item__list"
													style={{
														padding: "12px 0  0 0rem",
														display: categoryVisible ? "block" : "none",
													}}
												>
													<FormGroup>
														<RadioGroup
															aria-label="subcategory"
															name="subcategory"
															value={subcategory}
															onChange={(e) =>
																this.setState(
																	{ subcategory: e.target.value },
																	this.handleFilter
																)
															}
														>
															<FormControlLabel
																className="sidebar__cont__section__item__list__label"
																value="Any"
																control={<Radio />}
																label="Any"
															/>

															{categories[category].map((item) => (
																<FormControlLabel
																	className="sidebar__cont__section__item__list__label"
																	value={item}
																	control={<Radio />}
																	label={item}
																/>
															))}
														</RadioGroup>
													</FormGroup>
												</div>{" "}
											</div>
										</>
									)}
								</div>

								<div
									className="sidebar__cont__section"
									style={{ borderTop: "none" }}
								>
									<div
										className="sidebar__cont__section__item"
										onClick={() =>
											this.setState({ brandVisible: !brandVisible })
										}
									>
										Brand <ExpandMoreIcon />
									</div>
									<div
										className="sidebar__cont__section__item__list"
										style={{
											display: brandVisible ? "block" : "none",
											maxHeight: "272px",
											overflowY: "scroll",
										}}
									>
										<FormGroup onChange={this.handleChangeBrand}>
											{this.props.brands &&
												this.props.brands.map((item) => (
													<FormControlLabel
														className="sidebar__cont__section__item__list__label1"
														control={<Checkbox name={item} value={item} />}
														label={item}
													/>
												))}
										</FormGroup>
									</div>
								</div>
								<div
									className="sidebar__cont__section"
									style={{ borderTop: "none" }}
								>
									<div
										className="sidebar__cont__section__item"
										onClick={() =>
											this.setState({ conditionVisible: !conditionVisible })
										}
									>
										Condition <ExpandMoreIcon />
									</div>
									<div
										className="sidebar__cont__section__item__list"
										style={{ display: conditionVisible ? "block" : "none" }}
									>
										<FormGroup onChange={this.handleChangeCondition}>
											{cond.map((item) => (
												<FormControlLabel
													className="sidebar__cont__section__item__list__label1"
													value={item}
													control={
														item in condition && condition[item] == true ? (
															<Checkbox defaultChecked />
														) : (
															<Checkbox />
														)
													}
													label={item}
												/>
											))}
										</FormGroup>
									</div>
								</div>
								<div
									className="sidebar__cont__section"
									style={{ borderTop: "none" }}
								>
									<div
										className="sidebar__cont__section__item"
										onClick={() =>
											this.setState({ statusVisible: !statusVisible })
										}
									>
										Status <ExpandMoreIcon />
									</div>
									<div
										className="sidebar__cont__section__item__list"
										style={{ display: statusVisible ? "block" : "none" }}
									>
										<FormGroup>
											<RadioGroup
												aria-label="status"
												name="status"
												value={status}
												onChange={(e) =>
													this.setState(
														{ status: e.target.value },
														this.handleFilter
													)
												}
											>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="Any"
													control={<Radio />}
													label="Any"
												/>
												<FormControlLabel
													className="sidebar__cont__section__item__list__label"
													value="Sold"
													control={<Radio />}
													label="Sold"
												/>
											</RadioGroup>
										</FormGroup>
									</div>
								</div>
								<div
									className="sidebar__cont__section"
									style={{ borderTop: "none" }}
								>
									<div
										className="sidebar__cont__section__item"
										onClick={() =>
											this.setState({ colorVisible: !colorVisible })
										}
									>
										Color <ExpandMoreIcon />
									</div>
									<div
										className="sidebar__cont__section__item__list"
										style={{
											display: colorVisible ? "block" : "none",
											// maxHeight: "272px",
											// overflowY: "scroll",
										}}
									>
										<FormGroup>
											{colors.map((item) => (
												<FormControlLabel
													className="sidebar__cont__section__item__list__label1"
													value={item}
													control={
														item in this.state.color &&
														this.state.color[item] == true ? (
															<Checkbox
																defaultChecked
																onChange={() => this.handleChangeColor(item)}
															/>
														) : (
															<Checkbox
																onChange={() => this.handleChangeColor(item)}
															/>
														)
													}
													label={item}
												/>
											))}
										</FormGroup>
									</div>
								</div>
								{this.props.location.pathname == "/buy" && (
									<div
										className="sidebar__cont__section"
										style={{ borderTop: "none" }}
									>
										<div
											className="sidebar__cont__section__item"
											onClick={() =>
												this.setState({ priceVisible: !priceVisible })
											}
										>
											Price <ExpandMoreIcon />
										</div>
										<div
											className="sidebar__cont__section__item__list"
											style={{ display: priceVisible ? "block" : "none" }}
										>
											<FormGroup>
												<RadioGroup
													aria-label="status"
													name="price"
													value={price}
													onChange={(e) =>
														this.setState(
															{ price: e.target.value },
															this.handleFilter
														)
													}
												>
													<FormControlLabel
														className="sidebar__cont__section__item__list__label"
														value="0"
														control={<Radio />}
														label="Any"
													/>
													<FormControlLabel
														className="sidebar__cont__section__item__list__label"
														value="1"
														control={<Radio />}
														label="Under &#8377;1000"
													/>
													<FormControlLabel
														className="sidebar__cont__section__item__list__label"
														value="2"
														control={<Radio />}
														label="&#8377;1000 to &#8377;2000"
													/>
													<FormControlLabel
														className="sidebar__cont__section__item__list__label"
														value="3"
														control={<Radio />}
														label="&#8377;2000 and up"
													/>

													<FormControlLabel
														className="sidebar__cont__section__item__list__label"
														value="4"
														control={<Radio name="checkedF" />}
														label="Custom"
													/>
												</RadioGroup>

												<div className="sidebar__cont__section__item__list__label__custom">
													<TextField
														className="sidebar__cont__section__item__list__label__custom__tf"
														id="filled-number"
														placeholder="Min"
														type="number"
														onChange={(e) =>
															this.setState({ min: e.target.value })
														}
														disabled={price != "4"}
														InputLabelProps={{
															shrink: true,
														}}
														variant="outlined"
													/>

													<div className="sidebar__cont__section__item__list__label__custom__icon">
														_
													</div>
													<TextField
														className="sidebar__cont__section__item__list__label__custom__tf"
														id="filled-number"
														placeholder="Max"
														type="number"
														disabled={price != "4"}
														onChange={(e) =>
															this.setState({ max: e.target.value })
														}
														InputLabelProps={{
															shrink: true,
														}}
														variant="outlined"
													/>
													<div
														className="sidebar__cont__section__item__list__label__custom__btn"
														onClick={this.handleClickPrice}
													>
														Apply
													</div>
												</div>
											</FormGroup>
										</div>
									</div>
								)}
							</form>
						</Drawer>
					) : (
						<Drawer
							anchor="bottom"
							open={true}
							onClose={() => this.props.handleDrawerClose(false)}
						>
							<h3
								style={{
									padding: "12px 10px",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								Sort By{" "}
								<IconButton
									onClick={() => this.props.handleDrawerClose(false)}
									style={{ padding: "0", paddingRight: "8px" }}
								>
									<CloseIcon />
								</IconButton>
							</h3>
							<RadioGroup
								style={{ paddingLeft: "16px", paddingBottom: "16px" }}
								aria-label="sortby"
								name="sortby"
								value={
									sort == "new"
										? "2"
										: sort == "lowest"
										? "3"
										: sort == "highest"
										? "4"
										: "1"
								}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									onClick={() => this.props.history.push(`/${type}`)}
									label="Sort by best match"
								/>
								<FormControlLabel
									value="2"
									onClick={() => this.props.history.push(`/${type}?sort=new`)}
									control={<Radio />}
									label="Sort by newest first"
								/>
								{this.props.buy && (
									<>
										<FormControlLabel
											value="3"
											onClick={() =>
												this.props.history.push(`/${type}?sort=lowest`)
											}
											control={<Radio />}
											label="Sort by lowest price first"
										/>
										<FormControlLabel
											value="4"
											onClick={() =>
												this.props.history.push(`/${type}?sort=highest`)
											}
											control={<Radio />}
											label="Sort by highest price first"
										/>
									</>
								)}
							</RadioGroup>
						</Drawer>
					)}
				</Breakpoint>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myDetails: state.myDetails.myDetails,
		filters: state.post.filters,
		brands: state.post.brands,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		allBrandsDispatch: () => dispatch(getAllBrands()),
		addPostFiltersDispatch: (data) => dispatch(addPostFilters(data)),
		retrieveAllPostDispatch: (
			category,
			subcategory,
			brand,
			color,
			min,
			max,
			status,
			condition,
			barter,
			donate,
			sort
		) =>
			dispatch(
				retrieveAllPost(
					category,
					subcategory,
					brand,
					color,
					min,
					max,
					status,
					condition,
					barter,
					donate,
					sort
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
