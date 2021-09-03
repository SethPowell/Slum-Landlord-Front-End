import React from "react";
import Cookies from "js-cookie";

import SignupForm from "../forms/signupform";

export default function home(props) {
	if (Cookies.get("username")) {
		props.history.push("/rules");
	}

	return (
		<div className="signup-wrapper">
			<h2>
				Welcome
				<br />
				To
				<br />
				Slum Landlord
			</h2>
			<SignupForm
				changeRoute={props.history.push}
				handleSetUser={props.handleSetUser}
			/>
			<p>Already have an account?</p>
			<button onClick={() => props.history.push("/")}>Log In</button>
		</div>
	);
}
