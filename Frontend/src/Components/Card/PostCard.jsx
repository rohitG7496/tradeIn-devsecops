import { ListItem } from "@material-ui/core";
import React, { Component } from "react";
import { PostImageUrl } from "../../api/pathConstants";
import OrderCard from "./OrderCard";
import ReserveCard from "./ReserveCard";
import StarRateIcon from '@material-ui/icons/StarRate';
export default class PostCard extends Component {
  render() {
    const { item, type } = this.props;
    if (type == "reserves") return <ReserveCard item={item} {...this.props} />;
    if (type == "orders") return <OrderCard item={item} {...this.props} />;
    return (
      <div className="card">
        {/* <div className="card__top">
         <div className="card__top__hd">SELLING</div>
       </div> */}

 
        <div className="card__img">
          <img src={PostImageUrl + "" + item.image} />
          {item.is_premium && <StarRateIcon className="card__star"/>}
        </div>
        <div className="card__btm">
          <div className="card__btm__lft">
            <p className="card__ttl">{item.title}</p>
            <div className="card__btm__lft__price">
              {!item.is_donate && !item.is_barter ? (
                <>Rs {item.price}</>
              ) : (
                "FREE"
              )}
            </div>
            <div className="card__btm__lft__ship">+ Rs15 delivery fee</div>
          </div>
          <div className="card__btm__rgt">
            {/* <IconButton style={{padding:"0"}}> <BookmarkBorderOutlined/> </IconButton> */}
          </div>
        </div>
      </div>
    );
  }
}
