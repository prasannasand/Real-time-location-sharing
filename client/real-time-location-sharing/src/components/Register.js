// components/Register.js
import React, { useState } from "react";
import axios from "axios";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8080/register",
				{ username, email, password }
			);
			console.log(response.data); // Handle registration response
		} catch (error) {
			console.error("Registration error", error.response);
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Register;
