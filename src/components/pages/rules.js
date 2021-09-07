import Cookies from "js-cookie";
import React from "react";

export default function rules(props) {
	if (!Cookies.get("username")) {
		props.history.push("/");
	}

	return (
		<div className="rules-wrapper">
			<h1>Rules</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
				assumenda quod adipisci inventore sunt, debitis alias, quaerat
				expedita vitae officia voluptatum eaque quas atque non, nam
				eveniet eligendi soluta deleniti. Obcaecati iste doloremque
				ducimus tempora aliquid non, nulla voluptate quos ipsam neque
				quo qui iusto tenetur iure unde, similique enim beatae. Eos
				dolore eligendi ducimus ut exercitationem officia inventore
				modi! Culpa tempora eaque quidem iste et. Blanditiis ullam
				doloribus facilis dignissimos doloremque sed dolores eveniet?
				Itaque saepe corrupti accusantium amet a? Quasi consequatur odio
				tempora ratione alias ut repellat minus!
			</p>
			<div className="buttons-wrapper">
				<button onClick={() => props.history.push("/game")}>
					Play
				</button>
			</div>
		</div>
	);
}
