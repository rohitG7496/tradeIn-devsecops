import { ListItem } from "@material-ui/core";
import React, { Component } from "react";
import { PostImageUrl } from "../../api/pathConstants";
import { Switch, Route } from "react-router-dom";
import OrderSummary from "../Account/OrderSummary";
import { AUTH_ORDERSUMMARY_PATH } from "../../constants/routeConstants";

export default class OrderCard extends Component {
  render() {
    const { item } = this.props;
    // console.log("slkfhd");
    return (
      <>
        <div className="card">
          {/* <div className="card__top">
         <div className="card__top__hd">SELLING</div>
       </div> */}

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
                Expired on {item.expire_date}
              </p>
              <div className="card__btm__lft__price">{item.title}</div>
              <div
                style={{ backgroundColor: "white", padding: 0 }}
                className="card__btm__lft__ship"
              >
                <a style={{ fontSize: "0.85rem" }}>View Reserve Details</a>
              </div>
            </div>
            <div className="card__btm__rgt">
              {/* <IconButton style={{padding:"0"}}> <BookmarkBorderOutlined/> </IconButton> */}
            </div>
          </div>
        </div>
        <Switch></Switch>
      </>
    );
  }
}
