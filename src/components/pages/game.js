import React, { Component } from "react";

import loading from "../../../static/assets/loadingCoin.gif";
import generateBoard from "../../scripts/generateBoard";
import readBoard from "../../scripts/readBoard";

const tokens = ["Cat", "Dog", "Flower", "Bee", "Coin"];

export default class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			boardData: Array(25).fill("empty"),
			rentDue: 15,
			spinsLeft: 5,
			tokensList: this.calculateTokensList(),
			selectedToken: false,
			selectedTokenKey: null,
			selectedTokenName: "",
			loading: false,
			error: ""
		};

		this.handleTokenSelect = this.handleTokenSelect.bind(this);
		this.handleSpin = this.handleSpin.bind(this);
	}

	handleTokenSelect(event) {
		this.setState({
			selectedTokenName: event.target.innerHTML,
			selectedToken: true,
			selectedTokenKey: event.target.attributes.value.value
		});
	}

	handleSpin() {
		this.setState({ loading: true });

		fetch("http://127.0.0.1:5000/token/add", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				name: this.state.selectedTokenName,
				user_id: this.props.user.id
			})
		})
			.then((response) => response.json())
			.then((data) => {
				const boardData = generateBoard(data);

				fetch(`http://127.0.0.1:5000/user/update/${data.id}`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						money: data.money + boardData.earnings,
						existing_game: true
					})
				})
					.then((response) => response.json())
					.then((data) => {
						this.props.handleSetUser(data);
						this.setState({
							boardData: boardData.board,
							spinsLeft: this.state.spinsLeft - 1,
							tokensList: this.calculateTokensList(),
							selectedToken: false,
							selectedTokenKey: null,
							selectedTokenName: "",
							loading: false
						});
					})
					.catch((error) => {
						console.log("Error updating user: ", error);
						this.setState({
							loading: false,
							error: "An error occurred... try again later"
						});
					});
			})
			.catch((error) => {
				console.log("Error updating token: ", error);
				this.setState({
					loading: false,
					error: "An error occurred... try again later"
				});
			});
	}

	calculateTokensList() {
		const randomTokens = [];

		for (let i = 0; i < 3; i++) {
			randomTokens.push(
				tokens[Math.floor(Math.random() * tokens.length)]
			);
		}

		return randomTokens;
	}

	render() {
		return (
			<div className="game-wrapper">
				<div className="grid-wrapper"></div>

				<div className="display-wrapper">
					<h3>Slum Landlord</h3>
					<div className="tokens-wrapper">
						{this.state.tokensList.map((token, index) => (
							<div
								value={index}
								key={index}
								className={`token ${
									this.state.selectedTokenKey == index
										? "active"
										: "inactive"
								}`}
								onClick={this.handleTokenSelect}
							>
								{token}
							</div>
						))}
					</div>
					<p>${this.props.user.money}</p>
					<p>Rent Due: {this.state.rentDue}</p>
					<p>Spins until rent: {this.state.spinsLeft}</p>
					<button
						disabled={!this.state.selectedToken}
						onClick={this.handleSpin}
					>
						Spin
					</button>
					{this.state.loading ? <img src={loading} /> : null}
					<p>{this.state.error}</p>
				</div>
			</div>
		);
	}
}
