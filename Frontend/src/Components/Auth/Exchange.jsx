import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import {
	Button,
	Drawer,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	Select,
	TextField,
	IconButton,
} from "@material-ui/core";
import PostCard from "../Card/PostCard";
import { retrieveAllPost, retrievePost } from "../../redux/post/postActions";
import { connect } from "react-redux";
import CardSkeleton from "../Skeleton/CardSkeleton";
import PostFull from "../PostFull/PostFull";
import { Link, Switch, Route } from "react-router-dom";
import { AUTH_BUY_FULL_PATH } from "../../constants/routeConstants";
import EmptyData from "../Skeleton/EmptyData";
import Sidebar from "../Layout/Sidebar";
import { Breakpoint } from "react-socks";
import BookHeader from "../../assets/BookHeader.svg";
import SearchIcon from "@material-ui/icons/Search";
import { getBookGenres } from "../../helper";

export function bottomDrawer(sort, handleDrawerClose) {
	return (
		<Drawer
			anchor="bottom"
			open={true}
			onClose={() => handleDrawerClose(false)}
		>
			<h3 style={{ padding: "12px 10px" }}>Sort By</h3>
			<Link
				to="/exchange"
				onClick={() => handleDrawerClose(false)}
				className="bottom-link"
			>
				{" "}
				Sort by best match{" "}
			</Link>
			<Link
				to="/exchange?sort=new"
				onClick={() => handleDrawerClose(false)}
				className="bottom-link"
			>
				{" "}
				Sort by newest first{" "}
			</Link>
		</Drawer>
	);
}

class Exchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			results: [],
			show: "",
		};
	}
	onHandleChange = (e) => {
		e.preventDefault();
		const data = getBookGenres();
		let temp = [];
		const value = e.target.value;
		data.some((item) => {
			if (item.toLowerCase().indexOf(value.toLowerCase()) != -1) {
				temp.push(item);
			}
		});
		temp.sort();
		if (value == "") temp = [];
		this.setState({ search: value, results: temp });
	};
	state = {
		sort: new URLSearchParams(this.props.location.search).get("sort"),
		showSidebar: false,
		bottom: false,
		search: "",
	};
	async componentDidMount() {
		const { status, condition, category, subcategory, color, brand, min, max } =
			this.state;
		await this.props.retrieveAllPostDispatch(
			"Any",
			"Any",
			[],
			[],
			0,
			0,
			"Any",
			[],
			true,
			false
		);
	}
	handleDrawer = (value) => {
		this.setState({ showSidebar: value });
	};
	handleDrawerClose = (value) => {
		this.setState({ bottom: value });
	};
	handleClick = (item) => {
		this.setState({ show: item, search: "", results: [] });
	};
	render() {
		const { search, results, show } = this.state;
		const { loading } = this.props;
		let posts = this.props.posts;
		const { sort, showSidebar, bottom } = this.state;
		let temp = [];
		if (show != "") {
			posts.some((item) => {
				if (item.genre == show) {
					temp.push(item);
				}
			});
			posts = temp;
		}

		return (
			<div className="exchange">
				<div className="exchange__bg">
					<h2>EXCHANGE YOUR OLD BOOKS</h2>
					<div
						className="exchange__bg__search"
						style={{ position: "relative" }}
					>
						<TextField
							onChange={this.onHandleChange}
							required
							className="exchange__bg__search__text"
							name="search"
							value={this.state["search"]}
							variant="outlined"
							style={{ padding: "10.5px 14px" }}
							placeholder="Search Genre..."
							InputProps={{
								endAdornment: (
									<InputAdornment>
										<IconButton>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
						></TextField>
						{results.length > 0 && (
							<div className="exchange__dropdown">
								{results.map((item) => (
									<div
										className="exchange__dropdown__item"
										onClick={() => this.handleClick(item)}
									>
										{item}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="exchange__result">
					{show == "" ? (
						"All results"
					) : (
						<>
							Search for <span>{show}</span>
						</>
					)}
				</div>
				<Grid container spacing={3} style={{ width: "100%", margin: "0" }}>
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
					) : posts.length == 0 ? (
						<EmptyData />
					) : (
						posts.map((item) => (
							<Grid
								item
								lg={3}
								md={3}
								sm={6}
								xs={6}
								style={{ marginBottom: "1rem" }}
							>
								<Link to={`/exchange/${item.id}`}>
									<PostCard item={item} />
								</Link>
							</Grid>
						))
					)}
				</Grid>
				{/* <div className="buy">
          <div className="buy__head">
            Exchange results{" "}
            <span>
              ({posts.length}
              {posts.length <= 1 ? " result" : " results"})
            </span>
          </div>
          <Breakpoint large up>
            <div className="buy__filter">
              <div className="buy__filter__chips"></div>
              <FormControl className="buy__filter__form" variant="outlined">
                <Select
                  native
                  className="buy__filter__select"
                  value={sort}
                  inputProps={{
                    name: "sort",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option
                    value={"best"}
                    onClick={() => this.props.history.push("/donate")}
                  >
                    Sort by best match
                  </option>
                  <option
                    value={"new"}
                    onClick={() => this.props.history.push("/donate?sort=new")}
                  >
                    Sort by newest first
                  </option>
                </Select>
              </FormControl>
            </div>
          </Breakpoint>
          <Breakpoint medium down>
            <div className="buy__filter">
              <Button onClick={() => this.handleDrawer(true)}>Filters</Button>
              <Button onClick={() => this.handleDrawerClose(true)}>
                Sort by
              </Button>
            </div>
            {showSidebar ? (
              <Sidebar
                filter={true}
                type="exchange"
                handleDrawer={this.handleDrawer}
                {...this.props}
              />
            ) : null}
            {bottom ? (
              <Sidebar
                filter={false}
                type="exchange"
                handleDrawerClose={this.handleDrawerClose}
                {...this.props}
              />
            ) : null}
          </Breakpoint>
        </div>
        <Grid container spacing={3} style={{ width: "100%", margin: "0" }}>
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
          ) : posts.length == 0 ? (
            <EmptyData />
          ) : (
            posts.map((item) => (
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                style={{ marginBottom: "1rem" }}
              >
                <Link to={`/exchange/${item.id}`}>
                  <PostCard item={item} />
                </Link>
              </Grid>
            ))
          )}
        </Grid> */}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const posts = state.post.allPost;
	const exchangePost = posts.filter((obj) => obj.is_barter && !obj.is_donate);
	return {
		loading: state.post.loading,
		posts: exchangePost,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
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
export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
