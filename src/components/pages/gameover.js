import React, { Component } from "react";
import Cookies from "js-cookie";

import resetGame from "../../scripts/resetGame";

export default class GameOver extends Component {
	componentDidMount() {
		const handleReset = async () => {
			const resetData = await resetGame(this.props.user.id);

			if (resetData.error) {
				this.props.handleSetError(resetData.error);
			} else {
				this.props.handleSetUser(resetData);
			}
		};
		handleReset();
	}

	render() {
		if (!Cookies.get("username")) {
			this.props.history.push("/");
		}
		return (
			<div className="game-over-wrapper">
				<h3>Game Over</h3>
				<button onClick={() => this.props.history.push("/rules")}>
					Play Again
				</button>
			</div>
		);
	}
}
