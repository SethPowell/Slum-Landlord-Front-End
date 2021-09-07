import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import LoginForm from "./forms/loginForm";
import Home from "./pages/home";
import Rules from "./pages/rules";
import SignUp from "./pages/signUp";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			user: {},
			loading: true
		};

		this.handleSetUser = this.handleSetUser.bind(this);
	}

	componentDidMount() {
		if (Cookies.get("username")) {
			fetch(`http://127.0.0.1:5000/user/get/${Cookies.get("username")}`)
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						user: data,
						loading: false
					});
				})
				.catch((error) => {
					this.setState({
						loading: false
					});
					console.log("error getting user data: ", error);
				});
		} else {
			this.setState({
				loading: false
			});
		}
	}

	handleSetUser(userData) {
		this.setState({
			user: userData
		});
	}

	render() {
		return (
			<div className="app">
				{this.state.loading ? (
					<h1>Loading...</h1>
				) : (
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Home
									{...props}
									handleSetUser={this.handleSetUser}
								/>
							)}
						/>
						<Route
							path="/signup"
							render={(props) => (
								<SignUp
									{...props}
									handleSetUser={this.handleSetUser}
								/>
							)}
						/>
						<Route
							path="/rules"
							component={() => (
								<div>{`Username: ${this.state.user.username}`}</div>
							)}
						/>
						<Route path="/game" component={() => <div>Game</div>} />
						<Route
							path="/gameover"
							component={() => <div>Game Over</div>}
						/>
					</Switch>
				)}
			</div>
		);
	}
}
