import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { getCategories } from "../../helper";
import NoProfileImage from "../../assets/NoProfile.svg";
import { Button, Grid, TextField } from "@material-ui/core";
import {
	FormLabel,
	FormControl,
	FormControlLabel,
	FormGroup,
} from "@material-ui/core";
import NegotiateModal from "../PostFull/NegotiateModal";
import DeleteModal from "../PostFull/DeleteModal";

export default class Home extends Component {
	render() {
		const categories = getCategories();
		return (
			<>
				<Breakpoint large up>
					<div className="home">
						<div className="home__ttl" style={{ paddingTop: "5rem" }}>
							Find what you need
						</div>
						<div className="home__ttl">sell what you don't</div>
						<Grid container direction="row" className="home__btm">
							<Grid item xs={4}>
								<div className="home__btm__fs">
									<h4>Declutter</h4>
									<h6>
										Breathe new life into your home and sell last year’s go-tos.
									</h6>
								</div>
							</Grid>
							<Grid item xs={4}>
								<div className="home__btm__fs">
									<h4>Discover</h4>
									<h6>
										Shop one-of-a-kind treasures and all of your favorite
										brands.{" "}
									</h6>
								</div>
							</Grid>
							<Grid item xs={4}>
								<div className="home__btm__fs">
									<h4>All from home</h4>
									<h6>
										Make your space feel more like home without ever leaving it.
									</h6>
								</div>
							</Grid>
						</Grid>
					</div>
				</Breakpoint>

				<Breakpoint medium down>
					<div className="home">
						<div className="home__ttl" style={{ paddingTop: "5rem" }}>
							Find what you need
						</div>
						<div className="home__ttl">sell what you don't</div>
						<Grid container direction="row" className="home__btm">
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<div className="home__btm__fs">
									<h4>Declutter</h4>
									<h6>
										Breathe new life into your home and sell last year’s go-tos.
									</h6>
								</div>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<div className="home__btm__fs">
									<h4>Discover</h4>
									<h6>
										Shop one-of-a-kind treasures and all of your favorite
										brands.{" "}
									</h6>
								</div>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<div className="home__btm__fs">
									<h4>All from home</h4>
									<h6>
										Make your space feel more like home without ever leaving it.
									</h6>
								</div>
							</Grid>
						</Grid>
					</div>
				</Breakpoint>
			</>
		);
	}
}
