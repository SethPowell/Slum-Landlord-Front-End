import React from "react";
import Cookies from "js-cookie";

import LoginForm from "../forms/login-form";

export default function home(props) {
	if (Cookies.get("username")) {
		props.history.push("/rules");
	}

	return (
		<div className="home-wrapper">
			<h2>
				Welcome
				<br />
				To
				<br />
				Slum Landlord
			</h2>
			<LoginForm
				changeRoute={props.history.push}
				handleSetUser={props.handleSetUser}
			/>
			<p>Don't have an account?</p>
			<button onClick={() => props.history.push("/signup")}>
				Sign Up
			</button>
		</div>
	);
}
