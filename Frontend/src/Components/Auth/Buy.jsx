import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import {
  Button,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import PostCard from "../Card/PostCard";
import { retrieveAllPost, retrievePost } from "../../redux/post/postActions";
import { connect } from "react-redux";
import CardSkeleton from "../Skeleton/CardSkeleton";
import PostFull from "../PostFull/PostFull";
import { Link, Switch, Route } from "react-router-dom";
import { AUTH_BUY_FULL_PATH } from "../../constants/routeConstants";
import EmptyData from "../Skeleton/EmptyData";
import { Breakpoint } from "react-socks";
import Sidebar from "../Layout/Sidebar";

export function bottomDrawer(sort, handleDrawerClose) {
  return (
    <Drawer
      anchor="bottom"
      open={true}
      onClose={() => handleDrawerClose(false)}
    >
      <h3 style={{ padding: "12px 10px" }}>Sort By</h3>
      <Link
        to="/buy"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Sort by best match{" "}
      </Link>
      <Link
        to="/buy?sort=new"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Sort by newest first{" "}
      </Link>
      <Link
        to="/buy?sort=lowest"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Sort by lowest price first{" "}
      </Link>
      <Link
        to="/buy?sort=highest"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Sort by hightest price first{" "}
      </Link>
    </Drawer>
  );
}

class Buy extends Component {
  state = {
    sort: new URLSearchParams(this.props.location.search).get("sort"),
    showSidebar: false,
    bottom: false,
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
      false,
      false
    );
  }
  handleDrawer = (value) => {
    this.setState({ showSidebar: value });
  };
  handleDrawerClose = (value) => {
    this.setState({ bottom: value });
  };
  render() {
    const { loading, posts } = this.props;
    const { sort, showSidebar, bottom } = this.state;
    return (
      <div>
        <div className="buy">
          <div className="buy__head">
            Buy results{" "}
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
                  //  onChange={handleChange}
                  inputProps={{
                    name: "sort",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option
                    value={"best"}
                    onClick={() => this.props.history.push("/buy")}
                  >
                    Sort by best match
                  </option>
                  <option
                    value={"new"}
                    onClick={() => this.props.history.push("/buy?sort=new")}
                  >
                    Sort by newest first
                  </option>
                  <option
                    value={"low"}
                    onClick={() => this.props.history.push("/buy?sort=lowest")}
                  >
                    Sort by lowest price first
                  </option>
                  <option
                    value={"high"}
                    onClick={() => this.props.history.push("/buy?sort=highest")}
                  >
                    Sort by hightest price first
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
                type="buy"
                handleDrawer={this.handleDrawer}
                {...this.props}
              />
            ) : null}
            {bottom ? (
              <Sidebar
                filter={false}
                type="buy"
                buy={true}
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
                <Link to={`/buy/${item.id}`}>
                  <PostCard item={item} />
                </Link>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const posts = state.post.allPost;
  const buyPost = posts.filter((obj) => !obj.is_barter && !obj.is_donate);
  return {
    loading: state.post.loading,
    posts: buyPost,
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

export default connect(mapStateToProps, mapDispatchToProps)(Buy);
