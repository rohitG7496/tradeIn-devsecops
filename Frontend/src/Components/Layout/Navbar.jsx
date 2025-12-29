import React, { Component } from "react";
import WebsiteLogo from "../../assets/WebsiteLogo.svg";
import NoProfileImage from "../../assets/NoProfile.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LoopIcon from "@material-ui/icons/Loop";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Breakpoint } from "react-socks";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeTokenRequest } from "../../redux/token/tokenActions";
import { ProfileImageUrl } from "../../api/pathConstants";
import { addMyDetails } from "../../redux/mydetails/myDetailsActions";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

class Navbar extends Component {

  state = {
    style: "none",
    show: "none",
  };

  logout = async () => {
    await this.props.removeTokenDispatch();
    await this.props.removeMyDetails(null);
  };
  render() {
    const { isLoggedIn, myDetails, firstName, lastName, image, username } =
      this.props;
    const { show } = this.state;
    return (
      <>
        <Breakpoint large up>
          <div className="nav">
            <div className="nav__logo">
              <a href="/">
                <img src={WebsiteLogo} />
                <h1>TradeIn</h1>
              </a>
            </div>
            <div>
            </div>
            <ul>
              <li className="nav__tab">
                <Link to="/home">HOME</Link>
              </li>
              <li className="nav__tab">
                <Link to="/buy">BUY</Link>
              </li>
              <li className="nav__tab">
                <Link to="/donate">DONATION</Link>
              </li>
              <li className="nav__tab">
                <Link to="/exchange">EXCHANGE</Link>
              </li>
              {!isLoggedIn && (
                <li className="nav__login">
                  <Link to="?login=true">Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav__tab1">
                  <a
                    href="#"
                    onMouseEnter={() => this.setState({ style: "block" })}
                    onMouseLeave={() => this.setState({ style: "none" })}
                  >
                    ADD POST <ExpandMoreIcon className="nav__expand" />{" "}
                  </a>{" "}
                  <ul
                    className="nav__dropdown"
                    style={{ display: this.state.style }}
                  >
                    <ArrowDropUpIcon className="nav__dropdown__up" />
                    <li className="nav__dropdown__list">
                      <a href="/sellproduct">
                        <LocalOfferIcon />
                        Sell
                      </a>
                    </li>
                    <li className="nav__dropdown__list">
                      <a href="/donateproduct">
                        <OfflineBoltIcon />
                        Donate
                      </a>
                    </li>
                    <li className="nav__dropdown__list">
                      <a href="/exchangeproduct">
                        <LoopIcon />
                        Exchange
                      </a>
                    </li>
                  </ul>
                </li>
              )}

              {isLoggedIn && (
                <a
                  onMouseEnter={() => this.setState({ show: "block" })}
                  onMouseLeave={() => this.setState({ show: "none" })}
                >
                  <img
                    src={image ? ProfileImageUrl + "" + image : NoProfileImage}
                    className="nav__profile"
                  />
                  <ul
                    className="nav__dropdownprofile"
                    style={{ display: this.state.show }}
                  >
                    <ArrowDropUpIcon className="nav__dropdownprofile__up" />
                    <div className="nav__dropdownprofile__head">
                      <img
                        src={
                          image ? ProfileImageUrl + "" + image : NoProfileImage
                        }
                        className="nav__profile"
                      />
                      <div>
                        <h5>{firstName + " " + lastName}</h5>
                        <h6>{username}</h6>
                      </div>
                    </div>
                    <li className="nav__dropdownprofile__list">
                      {/* <Link href="/account"><AccountCircleOutlinedIcon/>Profile</Link> */}
                      <a href={`/account/${myDetails.username}`}>
                        <AccountCircleOutlinedIcon />
                        Profile
                      </a>
                    </li>
                    {/* <li className="nav__dropdownprofile__list">
                      <Link href="#">
                        <BookmarkBorderOutlinedIcon />
                        Saved
                      </Link>
                    </li> */}
                    <li
                      className="nav__dropdownprofile__list"
                      style={{ border: "none" }}
                    >
                      <Link
                        onClick={this.logout}
                        to={
                          this.props.location
                            ? this.props.location.pathname
                            : "/"
                        }
                      >
                        <ExitToAppIcon />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </a>
              )}
            </ul>
          </div>
        </Breakpoint>
        <Breakpoint medium down>
          <div className="nav">
            <div className="nav__logo">
              <a href="/">
                <img src={WebsiteLogo} />
                <h1>TradeIn</h1>
              </a>
            </div>
            {isLoggedIn ? (
              <a
                onClick={() =>
                  this.setState({ show: show == "block" ? "none" : "block" })
                }
              >
                <img
                  src={
                    myDetails.image
                      ? ProfileImageUrl + "" + myDetails.image
                      : NoProfileImage
                  }
                  className="nav__profile"
                />
                <ul
                  className="nav__dropdownprofile"
                  style={{ display: this.state.show }}
                >
                  <ArrowDropUpIcon className="nav__dropdownprofile__up" />
                  <div className="nav__dropdownprofile__head">
                    <img
                      src={
                        myDetails.image
                          ? ProfileImageUrl + "" + myDetails.image
                          : NoProfileImage
                      }
                      className="nav__profile"
                    />
                    <div>
                      <h5>
                        {myDetails.first_name + " " + myDetails.last_name}
                      </h5>
                      <h6>{myDetails.username}</h6>
                    </div>
                  </div>
                  <li className="nav__dropdownprofile__list">
                    {/* <Link href="/account"><AccountCircleOutlinedIcon/>Profile</Link> */}
                    <a href={`/account/${myDetails.username}`}>
                      <AccountCircleOutlinedIcon />
                      Profile
                    </a>
                  </li>
                  {/* <li className="nav__dropdownprofile__list">
                    <Link href="#">
                      <BookmarkBorderOutlinedIcon />
                      Saved
                    </Link>
                  </li> */}
                  <li
                    className="nav__dropdownprofile__list"
                    style={{ border: "none" }}
                  >
                    <Link
                      onClick={this.logout}
                      to={
                        this.props.location ? this.props.location.pathname : "/"
                      }
                    >
                      <ExitToAppIcon />
                      Logout
                    </Link>
                  </li>
                </ul>
              </a>
            ):
            <ul>
               <li className="nav__login">
                  <Link to="?login=true">Login</Link>
                </li>
             </ul>   }
            {/* <ul>
          <li className="nav__tab">
            <Link to="/home">HOME</Link>
          </li>
          <li className="nav__tab">
            <Link to="/buy">BUY</Link>
          </li>
          <li className="nav__tab">
            <Link to="/donate">DONATION</Link>
          </li>
          <li className="nav__tab">
            <Link to="/exchange">EXCHANGE</Link>
          </li>
          {!isLoggedIn && <li className="nav__login">
            <Link to="?login=true">Login</Link>
          </li>}
          {isLoggedIn &&
          <li className="nav__tab1">
            <a href="#"  onMouseEnter={() => this.setState({ style: "block" })} onMouseLeave={() => this.setState({ style: "none" }) }>
              ADD POST <ExpandMoreIcon className="nav__expand"/>{" "}
            </a>{" "}
          
            <ul className="nav__dropdown" style={{ display: this.state.style }}>
              <ArrowDropUpIcon className="nav__dropdown__up"/>
              <li className="nav__dropdown__list">
                <a href="/sellproduct"><LocalOfferIcon/>Sell</a>
              </li>
              <li className="nav__dropdown__list">
                <a href="/donateproduct"><OfflineBoltIcon/>Donate</a>
              </li>
              <li className="nav__dropdown__list">
                <a href="/exchangeproduct"><LoopIcon/>Exchange</a>
              </li>
            </ul>
          </li>}



          {isLoggedIn &&  <a href="#" onMouseEnter={() => this.setState({ show: "block" })} onMouseLeave={() => this.setState({ show: "none" }) }>
          <img src={myDetails.image? ProfileImageUrl+""+myDetails.image: NoProfileImage} className="nav__profile"/>
              <ul className="nav__dropdownprofile" style={{ display: this.state.show }}>
              <ArrowDropUpIcon className="nav__dropdownprofile__up"/>
              <div className="nav__dropdownprofile__head">
              <img src={myDetails.image? ProfileImageUrl+""+myDetails.image: NoProfileImage} className="nav__profile"/>
                <div>
                <h5>{myDetails.first_name+" "+myDetails.last_name}</h5>
                <h6>{myDetails.username}</h6>
                </div>
              </div>
              <li className="nav__dropdownprofile__list">
                {/* <Link href="/account"><AccountCircleOutlinedIcon/>Profile</Link> */}
            {/* <a href={`/account/${myDetails.username}`}><AccountCircleOutlinedIcon/>Profile</a>
              </li>
              <li className="nav__dropdownprofile__list">
                <Link href="#"><BookmarkBorderOutlinedIcon/>Saved</Link>
              </li>
              <li className="nav__dropdownprofile__list" style={{border:"none"}}>
                <Link onClick={this.logout} to={this.props.location?this.props.location.pathname:"/"}><ExitToAppIcon/>Logout</Link>
              </li>
            </ul>
            </a>}
        
        </ul> */}
          </div>
        </Breakpoint>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const mydetails = state.myDetails.myDetails;
  return {
    isLoggedIn: state.token.isLoggedIn,
    myDetails: mydetails,
    firstName: mydetails ? state.myDetails.myDetails.first_name : null,
    lastName: mydetails ? state.myDetails.myDetails.last_name : null,
    username: mydetails ? state.myDetails.myDetails.username : null,
    image: mydetails ? state.myDetails.myDetails.image : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTokenDispatch: () => dispatch(removeTokenRequest()),
    removeMyDetails: (value) => dispatch(addMyDetails(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
