import React from "react";
import { Link } from "react-router-dom";
import FourOFour from "../../assets/FourOFour.svg";
import WebsiteLogo from "../../assets/WebsiteLogo.svg";
export default function FourOFourError() {
  return (
    <>
      {/* <div className="four__top">
        <img src={WebsiteLogo} className="four__top__img" />
        TradeIn
      </div> */}
      <div className="four">
        <img src={FourOFour} className="four__img" />
        <Link to="/" className="four__btn">
          BACK TO HOME
        </Link>
      </div>
    </>
  );
}
