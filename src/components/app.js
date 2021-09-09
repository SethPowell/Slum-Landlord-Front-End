import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Game from "./pages/game";
import LoginForm from "./forms/loginForm";
import Home from "./pages/home";
import Rules from "./pages/rules";
import SignUp from "./pages/signUp";
import GameOver from "./pages/gameover";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			user: {},
			loading: true,
			error: ""
		};

		this.handleSetUser = this.handleSetUser.bind(this);
		this.handleSetError = this.handleSetError.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
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
						error: "It seems there was an error getting your data... Please try again later."
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

	handleSetError(errorData) {
		this.setState({ error: errorData });
	}

	handleLogout() {
		Cookies.remove("username");
		this.setState({ user: {} });
	}

	render() {
		return (
			<div className="app">
				{this.state.user.id ? (
					<FontAwesomeIcon
						icon={faSignOutAlt}
						onClick={this.handleLogout}
					/>
				) : null}
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
							render={(props) => (
								<Rules
									{...props}
									user={this.state.user}
									handleSetUser={this.handleSetUser}
									handleSetError={this.handleSetError}
								/>
							)}
						/>
						<Route
							path="/game"
							render={(props) => (
								<Game
									{...props}
									user={this.state.user}
									handleSetUser={this.handleSetUser}
								/>
							)}
						/>
						<Route
							path="/gameover"
							render={(props) => (
								<GameOver
									{...props}
									user={this.state.user}
									handleSetUser={this.handleSetUser}
									handleSetError={this.handleSetError}
								/>
							)}
						/>
					</Switch>
				)}
				<p>{this.state.error}</p>
			</div>
		);
	}
}
