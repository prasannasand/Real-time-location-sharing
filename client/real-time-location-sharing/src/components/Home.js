// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemText from "@mui/material/ListItemText";
// import Avatar from "@mui/material/Avatar";
// import { Grid, Paper } from "@mui/material";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";

// function MapCenter({ center }) {
// 	const map = useMap();
// 	map.flyTo(center);
// 	return null;
// }

// function Home() {
// 	const navigate = useNavigate();
// 	const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
// 	const friends = [
// 		{ id: 1, name: "Alice", location: [52.505, -0.09] },
// 		{ id: 2, name: "Bob", location: [51.515, -0.1] },
// 		{ id: 3, name: "Charlie", location: [51.525, -0.11] },
// 	];

// 	const handleFriendClick = (location) => {
// 		setMapCenter(location);
// 	};

// 	const handleLogout = () => {
// 		// Perform logout logic here
// 		console.log("Logging out...");
// 		navigate("/login"); // Redirect to login after logout
// 	};

// 	return (
// 		<>
// 			<Navbar onLogout={handleLogout} />
// 			<Grid container spacing={2}>
// 				<Grid item xs={12} md={4}>
// 					<Paper
// 						elevation={3}
// 						style={{
// 							margin: 16,
// 							padding: 16,
// 							height: "90vh",
// 							overflow: "auto",
// 						}}
// 					>
// 						<List>
// 							{friends.map((friend) => (
// 								<ListItem
// 									button
// 									key={friend.id}
// 									onClick={() =>
// 										handleFriendClick(friend.location)
// 									}
// 								>
// 									<ListItemAvatar>
// 										<Avatar>{friend.name[0]}</Avatar>
// 									</ListItemAvatar>
// 									<ListItemText primary={friend.name} />
// 								</ListItem>
// 							))}
// 						</List>
// 					</Paper>
// 				</Grid>
// 				<Grid item xs={12} md={8}>
// 					<MapContainer
// 						center={mapCenter}
// 						zoom={13}
// 						style={{ height: "90vh", width: "100%" }}
// 					>
// 						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// 						{friends.map((friend) => (
// 							<Marker key={friend.id} position={friend.location}>
// 								<Popup>{friend.name}'s location</Popup>
// 							</Marker>
// 						))}
// 						<MapCenter center={mapCenter} />
// 					</MapContainer>
// 				</Grid>
// 			</Grid>
// 		</>
// 	);
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Grid, Paper } from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./api"; // Ensure the correct path to your api.js

function MapCenter({ center }) {
	const map = useMap();
	map.flyTo(center);
	return null;
}

function Home() {
	const navigate = useNavigate();
	const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
	const [currentUser, setCurrentUser] = useState(null); // State to store the current user
	const [friends, setFriends] = useState([
		{ id: 1, name: "Alice", location: [52.505, -0.09] },
		{ id: 2, name: "Bob", location: [51.515, -0.1] },
		{ id: 3, name: "Charlie", location: [51.525, -0.11] },
	]);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const user = await getCurrentUser();
				setCurrentUser(user);
			} catch (err) {
				console.error("Failed to fetch current user:", err);
			}
		};

		fetchCurrentUser();
	}, []);

	const handleFriendClick = (location) => {
		setMapCenter(location);
	};

	const handleLogout = () => {
		// Perform logout logic here
		console.log("Logging out...");
		navigate("/login"); // Redirect to login after logout
	};

	return (
		<>
			<Navbar onLogout={handleLogout} />
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<Paper
						elevation={3}
						style={{
							margin: 16,
							padding: 16,
							height: "90vh",
							overflow: "auto",
						}}
					>
						{currentUser ? (
							<div>
								<p>Welcome, {currentUser.username}!</p>
								<p>User Info:</p>
								<ul>
									<li>Username: {currentUser.username}</li>
									<li>Email: {currentUser.email}</li>
								</ul>
							</div>
						) : (
							<p>Loading user information...</p>
						)}
						<List>
							{friends.map((friend) => (
								<ListItem
									button
									key={friend.id}
									onClick={() =>
										handleFriendClick(friend.location)
									}
								>
									<ListItemAvatar>
										<Avatar>{friend.name[0]}</Avatar>
									</ListItemAvatar>
									<ListItemText primary={friend.name} />
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
				<Grid item xs={12} md={8}>
					<MapContainer
						center={mapCenter}
						zoom={13}
						style={{ height: "90vh", width: "100%" }}
					>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						{friends.map((friend) => (
							<Marker key={friend.id} position={friend.location}>
								<Popup>{friend.name}'s location</Popup>
							</Marker>
						))}
						<MapCenter center={mapCenter} />
					</MapContainer>
				</Grid>
			</Grid>
		</>
	);
}

export default Home;
