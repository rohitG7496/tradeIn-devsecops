import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { Link, withRouter } from "react-router-dom";
import { Button, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  DialogContent,
  Grid,
} from "@material-ui/core";
import OrderCard from "../Card/OrderCard";
import { PostImageUrl } from "../../api/pathConstants";
import { connect } from "react-redux";
import { getUserOrders } from "../../redux/profile/profileActions";
import PostLoader from "../Loaders/PostLoader";

class OrderSummary extends Component {
  async componentDidMount() {
    await this.props.ordersDispatch(this.props.match.params.id);
  }
  render() {
    const { item } = this.props;
    if (!item) return <PostLoader />;
    return (
      <>
        <Breakpoint large up></Breakpoint>

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
                    `/account/${this.props.match.params.id}/orders/`
                  )
                }
              >
                <ArrowBackIcon />
              </IconButton>
              Order Summary
            </DialogTitle>
            <Divider />
            <DialogContent style={{ padding: "8px" }}>
              <div className="ordersum">
                <div className="ordersum__id">Order ID - {item.order_id}</div>
                <Divider />
                <div className="ordersum__card">
                  <div className="card__img">
                    <img src={PostImageUrl + "" + item.image} />
                  </div>
                  <div className="card__btm">
                    <div className="card__btm__lft">
                      <p
                        style={{
                          fontSize: "1rem",
                          paddingTop: "0.4rem",
                          marginBottom: "2px",
                        }}
                        className="card__ttl"
                      >
                        Delivered on Sep 30,2020
                      </p>
                      <div className="card__btm__lft__price">
                        Samsung Galaxy M20
                      </div>
                      <div
                        style={{ backgroundColor: "white", padding: "0px" }}
                        className="card__btm__lft__ship"
                      >
                        <Link
                          style={{ fontSize: "0.85rem" }}
                          to={`/buy/${this.props.match.params.orderid}`}
                        >
                          View Product Details
                        </Link>
                      </div>
                    </div>
                    <div className="card__btm__rgt">
                      {/* <IconButton style={{padding:"0"}}> <BookmarkBorderOutlined/> </IconButton> */}
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="ordersum__shipping">
                  <h3>Shipping Details</h3>
                  <h2>{item.user_name}</h2>
                  {item.user_address}
                  <br />
                  {item.user_city} - {item.user_pincode}
                  <p>
                    <span>Phone Number:</span>&nbsp;{item.user_phone}
                  </p>
                </div>
                <Divider />
                <div className="ordersum__price">
                  <h3>Price Details</h3>
                  <Grid container className="ordersum__price__det">
                    <Grid item xs={6} className="ordersum__price__det__cat">
                      Selling Price
                    </Grid>
                    <Grid item xs={6} className="ordersum__price__det__amt">
                      &#8377;{item.price}
                    </Grid>
                  </Grid>
                  <Grid container className="ordersum__price__det">
                    <Grid item xs={6} className="ordersum__price__det__cat">
                      Shipping Charge
                    </Grid>
                    <Grid item xs={6} className="ordersum__price__det__amt">
                      &#8377;15
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: "0.55rem 0" }} />
                  <Grid container className="ordersum__price__det">
                    <Grid item xs={6} className="ordersum__price__det__cat">
                      Total Amount
                    </Grid>
                    <Grid item xs={6} className="ordersum__price__det__amt">
                      &#8377;{item.total_amount}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Breakpoint>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const ur = ownProps.match.params.id;
  const id = ownProps.match.params.orderid;
  const data = state.profile.orders[ur];
  let p = -1;
  if (data) {
    data.some((obj, index) => {
      if (obj.id == id) {
        p = index;
      }
      return;
    });
  }
  return {
    item: p != -1 ? data[p] : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ordersDispatch: (id) => dispatch(getUserOrders(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderSummary));
