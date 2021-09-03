import React, { Component } from "react";
import Cookies from "js-cookie";

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		fetch("http://127.0.0.1:5000/user/verification", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data === "User Verified") {
					this.props.handleSetUser(this.state.username);
					Cookies.set("username", this.state.username);
					this.props.changeRoute("/rules");
				}
			})
			.catch((error) => console.log("error logging in", error));
	}

	handleChange(event) {
		this.setState({
			[event.target.placeholder]: event.target.value,
		});
	}

	render() {
		return (
			<form className="login-form">
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

				<button type="submit" onClick={this.handleSubmit}>
					Log In
				</button>
			</form>
		);
	}
}
