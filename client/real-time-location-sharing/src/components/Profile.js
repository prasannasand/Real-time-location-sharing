import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

function Profile() {
	const [user, setUser] = useState({
		name: "John Doe",
		email: "johndoe@example.com",
	});

	const handleChange = (prop) => (event) => {
		setUser({ ...user, [prop]: event.target.value });
	};

	const handleSubmit = () => {
		console.log("User Info Updated:", user);
		// Here you would usually make an API call to update the user information
	};

	return (
		<Container component="main" maxWidth="xs">
			<Typography component="h1" variant="h5">
				Edit Profile
			</Typography>
			<form noValidate>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Name"
					value={user.name}
					onChange={handleChange("name")}
					autoFocus
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Email"
					value={user.email}
					onChange={handleChange("email")}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Save Changes
				</Button>
			</form>
		</Container>
	);
}

export default Profile;
