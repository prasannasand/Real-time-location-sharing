import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Navbar from "./Navbar";

function Geofencing() {
	const [coordinates, setCoordinates] = useState({
		latitude: "",
		longitude: "",
	});

	const handleCoordinateChange = (prop) => (event) => {
		setCoordinates({ ...coordinates, [prop]: event.target.value });
	};

	const handleSubmit = () => {
		console.log("Geofencing Coordinates Set:", coordinates);
		// Here you would usually make an API call to save the geofencing coordinates
	};

	return (
		<>
		<Navbar isNotHome={true} />
		<Container component="main" maxWidth="xs">
			<Typography component="h1" variant="h5">
				Set Geofencing Area
			</Typography>
			<form noValidate>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Latitude"
					value={coordinates.latitude}
					onChange={handleCoordinateChange("latitude")}
					autoFocus
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Longitude"
					value={coordinates.longitude}
					onChange={handleCoordinateChange("longitude")}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Set Coordinates
				</Button>
			</form>
		</Container>
		</>
	);
}

export default Geofencing;
