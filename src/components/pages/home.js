import React from "react";

import LoginForm from "../forms/login-form";

export default function home(props) {
	return (
		<div className="home-wrapper">
			<LoginForm
				changeRoute={props.history.push}
				handleSetUser={props.handleSetUser}
			/>
		</div>
	);
}
