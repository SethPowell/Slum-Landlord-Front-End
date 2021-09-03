import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import LoginForm from "./forms/login-form";
import Home from "./pages/home";
import Rules from "./pages/rules";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			user: Cookies.get("username") || "",
		};

		this.handleSetUser = this.handleSetUser.bind(this);
	}

	handleSetUser(userData) {
		this.setState({
			user: userData,
		});
	}

	render() {
		return (
			<div className="app">
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
						component={() => <div>Sign Up</div>}
					/>
					<Route path="/rules" component={Rules} />
					<Route path="/game" component={() => <div>Game</div>} />
					<Route
						path="/gameover"
						component={() => <div>Game Over</div>}
					/>
				</Switch>
			</div>
		);
	}
}
