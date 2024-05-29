import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Grid, Paper, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./api"; // Ensure the correct path to your api.js
import "./Home.css"; // Import the CSS file

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
		<div className="home-container">
			<Navbar onLogout={handleLogout} />
			<Grid container spacing={2} style={{ height: "calc(100vh - 200px)" }}>
				<Grid item xs={12} md={4}>
					<Paper className="side-section" elevation={3}>
						<Typography variant="h5" className="header">
							{currentUser ? `Welcome, ${currentUser.username}!` : "Loading user information..."}
						</Typography>
						<List>
							{friends.map((friend) => (
								<ListItem
									key={friend.id}
									className="friend-item"
									onClick={() =>
										handleFriendClick(friend.location)
									}
								>
									<ListItemAvatar>
										<Avatar className="friend-avatar">{friend.name[0]}</Avatar>
									</ListItemAvatar>
									<ListItemText primary={friend.name} />
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
				<Grid item xs={12} md={8}>
					<Paper className="map-container" elevation={3}>
						<MapContainer
							center={mapCenter}
							zoom={13}
							style={{ height: "100%", width: "100%" }}
						>
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							{friends.map((friend) => (
								<Marker
									key={friend.id}
									position={friend.location}
								>
									<Popup>
										{friend.name}'s location
									</Popup>
								</Marker>
							))}
							<MapCenter center={mapCenter} />
						</MapContainer>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
