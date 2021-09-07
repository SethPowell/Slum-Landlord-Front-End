import React, { Component } from "react";
import Cookies from "js-cookie";

import loading from "../../../static/assets/loadingCoin.gif";

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			error: "",
			loading: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.username === "" || this.state.password === "") {
			this.setState({
				error: "Please fill in each field"
			});
		} else {
			this.setState({
				loading: true,
				error: ""
			});

			fetch("http://127.0.0.1:5000/user/verification", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);

					this.setState({
						loading: false
					});

					if (data === "Unable to verify user credentials") {
						this.setState({
							error: "Invalid Username or Password"
						});
					} else {
						this.props.handleSetUser(data);
						Cookies.set("username", this.state.username);
						this.props.changeRoute("/rules");
					}
				})
				.catch((error) => {
					console.log("Error logging in: ", error);
					this.setState({
						loading: false,
						error: "Seems like there was an error on our end, please try again later"
					});
				});
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.placeholder]: event.target.value
		});
	}

	render() {
		return (
			<form className="form-wrapper" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<input
					type="password"
					placeholder="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>

				<button type="submit" disabled={this.state.loading}>
					Log In
				</button>
				{this.state.loading ? (
					<img src={loading} />
				) : (
					<div className="spacer" />
				)}
				<p>{this.state.error}</p>
			</form>
		);
	}
}
