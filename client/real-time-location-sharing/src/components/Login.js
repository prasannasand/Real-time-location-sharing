import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					username,
					password,
				}),
				credentials: "include", // Include cookies for authentication
			});

			if (response.redirected) {
				const url = new URL(response.url);
				if (url.searchParams.get("error")) {
					setError("Invalid username or password");
				} else {
					navigate("/");
				}
			} else {
				setError("Failed to log in");
			}
		} catch (err) {
			setError("Failed to log in");
			console.error("Failed to log in:", err);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleLogin}>
				<div>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
