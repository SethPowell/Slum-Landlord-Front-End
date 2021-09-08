import React, { Component } from "react";

const tokens = ["cat", "dog", "flower", "bee", "coin"];

export default class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rentDue: 25,
			spinsLeft: 5,
			tokensList: this.calculateTokensList(),
			selectedToken: false,
			selectedTokenKey: null,
			selectedTokenName: ""
		};

		this.handleTokenSelect = this.handleTokenSelect.bind(this);
	}

	handleTokenSelect(event) {
		this.setState({
			selectedTokenName: event.target.innerHTML,
			selectedToken: true,
			selectedTokenKey: event.target.attributes.value.value
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
										: ""
								}`}
								onClick={this.handleTokenSelect}
							>
								{token}
							</div>
						))}
					</div>
					{/* <p>{this.props.user.money}</p> */}
					<p>Rent Due: {this.state.rentDue}</p>
					<p>Spins until rent: {this.state.spinsLeft}</p>
					<button disabled={!this.state.selectedToken}>Spin</button>
				</div>
			</div>
		);
	}
}
