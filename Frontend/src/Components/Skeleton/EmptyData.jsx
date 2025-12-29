import React from "react";
import { Grid } from "@material-ui/core";
import NoPost from "../../assets/NoPost.svg";
import NoBuy from "../../assets/NoBuy.svg";
import NoOrders from "../../assets/NoOrders.svg";
import NoWishlist from "../../assets/NoWishlist.svg";
export default function EmptyData(props) {
  const { type } = props;
  return (
    <Grid container className="nopost">
      <div className="nopost__image">
        <img
          src={
            type == "sell" || type == "donate" || type == "exchange" || type== "reserves"
              ? NoBuy
              : type == "orders"
              ? NoOrders
              : type == "wishlist"
              ? NoWishlist
              : NoPost
          }
        />
      </div>
      <div className="nopost__con">
        <h3>
          {type == "sell" || type == "donate" || type == "exchange" 
            ? "You didn't add any product"
            : type == "orders"
            ? "You didn't order anything"
            : type == "wishlist"
            ? "Nothing in your wishlist"
            : type == "reserves" ?
            "You didn't reserve any product"
            : "No product available"}
        </h3>
      </div>
    </Grid>
  );
}
