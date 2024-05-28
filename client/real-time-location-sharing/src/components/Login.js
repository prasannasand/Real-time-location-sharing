// components/Login.js
import React, { useState } from "react";
import axios from "axios";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:8080/login", {
				username,
				password,
			});
			console.log(response.data); // Process login response
		} catch (error) {
			console.error("Login error", error.response);
		}
	};

	return (
		<div>
			<h1>Login</h1>
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
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
