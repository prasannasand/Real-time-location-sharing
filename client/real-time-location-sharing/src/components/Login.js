import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	faUser,
	faKey,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css"; // Import the CSS file

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
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
					navigate("/home");
				}
			} else {
				setError("Failed to log in");
			}
		} catch (err) {
			setError("Failed to log in");
			console.error("Failed to log in:", err);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleRegister = () => {
		navigate("/register");
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			{error && <p className="error-message">{error}</p>}
			<form className="login-form" onSubmit={handleLogin}>
				<label>
					<FontAwesomeIcon icon={faUser} className="icon" />
					Username
				</label>
				<div className="form-group">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<label>
					<FontAwesomeIcon icon={faKey} className="icon" />
					Password
				</label>
				<div className="form-group password-input">
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<FontAwesomeIcon
						icon={showPassword ? faEyeSlash : faEye}
						className="icon"
						onClick={togglePasswordVisibility}
					/>
				</div>

				<button type="submit">Login</button>
				<button type="register" onClick={() => handleRegister()}>
					Register
				</button>
			</form>
		</div>
	);
};

export default Login;
