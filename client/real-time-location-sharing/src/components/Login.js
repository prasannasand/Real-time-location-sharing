// // components/Login.js
// import React, { useState } from "react";
// import axios from "axios";

// function Login() {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");

// 	// const handleSubmit = async (event) => {
// 	// 	event.preventDefault();
// 	// 	try {
// 	// 		const response = await axios.post("http://localhost:8080/login", {
// 	// 			username,
// 	// 			password,
// 	// 		});
// 	// 		console.log(response.data); // Process login response
// 	// 	} catch (error) {
// 	// 		console.error("Login error", error.response);
// 	// 	}
// 	// };
// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		console.log(username, password);
// 		// const username = "yourUsername"; // Replace with actual username input
// 		// const password = "yourPassword"; // Replace with actual password input

// 		try {
// 			const response = await axios.post(
// 				"http://localhost:8080/login",
// 				{},
// 				{
// 					auth: {
// 						username: username,
// 						password: password,
// 					},
// 				}
// 			);
// 			console.log("Login successful", response.data);
// 			// Handle successful login here (e.g., redirect, store token)
// 		} catch (error) {
// 			console.error("Login error", error.response);
// 			// Handle error here
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>Login</h1>
// 			<form onSubmit={handleSubmit}>
// 				<label>
// 					Username:
// 					<input
// 						type="text"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 					/>
// 				</label>
// 				<label>
// 					Password:
// 					<input
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 					/>
// 				</label>
// 				<button type="submit">Login</button>
// 			</form>
// 		</div>
// 	);
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate(); // Hook to enable programmatic navigation

	const handleLogin = async () => {
		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				// Assuming the login is successful, redirect to the home page
				console.log(response);
				console.log("Login successful", response.data);
				navigate("/"); // Changed from history.push to navigate
			} else {
				// Handle errors or unsuccessful login attempts
				console.error("Login failed");
			}
		} catch (error) {
			console.error("There was an error!", error);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button onClick={handleLogin}>Log In</button>
		</div>
	);
}

export default Login;
