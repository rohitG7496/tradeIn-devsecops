import React, { Component } from "react";
import WebsiteLogo from "../../assets/WebsiteLogo.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Breakpoint } from "react-socks";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import HomeIcon from "@material-ui/icons/Home";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import LoopIcon from "@material-ui/icons/Loop";
import { render } from "@testing-library/react";
import { Button, Drawer, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

export function bottomDrawer(handleDrawerClose) {
  return (
    <Drawer
      anchor="bottom"
      open={true}
      onClose={() => handleDrawerClose(false)}
    >
      <h3 style={{ padding: "12px 10px" }}>Create Ad</h3>
      <Link
        to="/sellproduct"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Sell Product
      </Link>
      <Link
        to="/donateproduct"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Donate Product{" "}
      </Link>
      <Link
        to="/exchangeproduct"
        onClick={() => handleDrawerClose(false)}
        className="bottom-link"
      >
        {" "}
        Exchange Product{" "}
      </Link>
    </Drawer>
  );
}

export default class BottomBar extends Component {
  state = {
    style: "none",
    drawer: false,
  };
  handleDrawerClose = (value) => {
    this.setState({ drawer: value });
  };
  render() {
    const { drawer } = this.state;
    return (
      <>
        <Breakpoint large up>
          <div className="btmbar"></div>
        </Breakpoint>

        <Breakpoint medium down>
          {drawer ? bottomDrawer(this.handleDrawerClose) : null}
          <div className="btmbar">
            <Link to="/" className="btmbar__home">
              <HomeIcon
                style={{
                  color:
                    this.props.location.pathname == "/" ||
                    this.props.location.pathname == "/home"
                      ? "#9147FF"
                      : "#6e6e6e",
                }}
              />
            </Link>
            <Link to="/buy" className="btmbar__home">
              <LocalOfferIcon
                style={{
                  color:
                    this.props.location.pathname == "/buy"
                      ? "#9147FF"
                      : "#6e6e6e",
                }}
              />
            </Link>
            <Button
              onClick={() => this.handleDrawerClose(true)}
              className="btmbar__home"
            >
              <AddBoxIcon
                style={{
                  color:
                    this.props.location.pathname == "/sellproduct" ||
                    this.props.location.pathname == "/donateproduct" ||
                    this.props.location.pathname == "/exchangeproduct"
                      ? "#9147FF"
                      : "#6e6e6e",
                }}
              />
            </Button>
            <Link to="/donate" className="btmbar__home">
              <OfflineBoltIcon
                style={{
                  color:
                    this.props.location.pathname == "/donate"
                      ? "#9147FF"
                      : "#6e6e6e",
                }}
              />
            </Link>
            <Link to="/exchange" className="btmbar__home">
              <LoopIcon
                style={{
                  color:
                    this.props.location.pathname == "/exchange"
                      ? "#9147FF"
                      : "#6e6e6e",
                }}
              />
            </Link>
          </div>
        </Breakpoint>
      </>
    );
  }
}
