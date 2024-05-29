// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemText from "@mui/material/ListItemText";
// import Avatar from "@mui/material/Avatar";
// import { Grid, Paper, Typography } from "@mui/material";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from "./api"; // Ensure the correct path to your api.js
// import "./Home.css"; // Import the CSS file

// function MapCenter({ center }) {
// 	const map = useMap();
// 	map.flyTo(center);
// 	return null;
// }

// function Home() {
// 	const navigate = useNavigate();
// 	const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
// 	const [currentUser, setCurrentUser] = useState(null); // State to store the current user
// 	const [friends, setFriends] = useState([
// 		{ id: 1, name: "Alice", location: [52.505, -0.09] },
// 		{ id: 2, name: "Bob", location: [51.515, -0.1] },
// 		{ id: 3, name: "Charlie", location: [51.525, -0.11] },
// 	]);

// 	useEffect(() => {
// 		const fetchCurrentUser = async () => {
// 			try {
// 				const user = await getCurrentUser();
// 				setCurrentUser(user);
// 			} catch (err) {
// 				console.error("Failed to fetch current user:", err);
// 			}
// 		};

// 		fetchCurrentUser();
// 	}, []);

// 	const handleFriendClick = (location) => {
// 		setMapCenter(location);
// 	};

// 	const handleLogout = () => {
// 		// Perform logout logic here
// 		console.log("Logging out...");
// 		navigate("/login"); // Redirect to login after logout
// 	};

// 	return (
// 		<div className="home-container">
// 			<Navbar onLogout={handleLogout} />
// 			<Grid
// 				container
// 				spacing={2}
// 				style={{ height: "calc(100vh - 200px)" }}
// 			>
// 				<Grid item xs={12} md={4}>
// 					<Paper className="side-section" elevation={3}>
// 						<Typography variant="h5" className="header">
// 							{currentUser
// 								? `Welcome, ${currentUser.username}!`
// 								: "Loading user information..."}
// 						</Typography>
// 						<List>
// 							{friends.map((friend) => (
// 								<ListItem
// 									key={friend.id}
// 									className="friend-item"
// 									onClick={() =>
// 										handleFriendClick(friend.location)
// 									}
// 								>
// 									<ListItemAvatar>
// 										<Avatar className="friend-avatar">
// 											{friend.name[0]}
// 										</Avatar>
// 									</ListItemAvatar>
// 									<ListItemText primary={friend.name} />
// 								</ListItem>
// 							))}
// 						</List>
// 					</Paper>
// 				</Grid>
// 				<Grid item xs={12} md={8}>
// 					<Paper className="map-container" elevation={3}>
// 						<MapContainer
// 							center={mapCenter}
// 							zoom={13}
// 							style={{ height: "100%", width: "100%" }}
// 						>
// 							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// 							{friends.map((friend) => (
// 								<Marker
// 									key={friend.id}
// 									position={friend.location}
// 								>
// 									<Popup>{friend.name}'s location</Popup>
// 								</Marker>
// 							))}
// 							<MapCenter center={mapCenter} />
// 						</MapContainer>
// 					</Paper>
// 				</Grid>
// 			</Grid>
// 		</div>
// 	);
// }

// export default Home;

// working location
// import React, { useState, useEffect } from "react";
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
// import { updateLocation } from "./api"; // Add this import

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
// 		console.log("Logging out...");
// 		navigate("/login");
// 	};

// 	// Function to get and update location
// 	const updateCurrentLocation = () => {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(async (position) => {
// 				const { latitude, longitude } = position.coords;
// 				try {
// 					await updateLocation({ latitude, longitude });
// 				} catch (error) {
// 					console.error("Failed to update location", error);
// 				}
// 			});
// 		}
// 	};

// 	// Use effect to set up regular location updates
// 	useEffect(() => {
// 		const interval = setInterval(updateCurrentLocation, 30000); // Update every 30 seconds
// 		return () => clearInterval(interval); // Clear interval on component unmount
// 	}, []);

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

///-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
//new

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
import { getCurrentUser, getFamilyMembers, getLocationByUserId } from "./api";
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
	const [familyMembers, setFamilyMembers] = useState([]); // Initialize as an array

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await getCurrentUser();
				setCurrentUser(user);
				const members = await getFamilyMembers();
				const membersWithLocations = await Promise.all(
					members.map(async (member) => {
						const location = await getLocationByUserId(
							member.memberId
						);
						if (location) {
							return {
								...member,
								latitude: location.latitude,
								longitude: location.longitude,
							};
						} else {
							return {
								...member,
								latitude: null,
								longitude: null,
							};
						}
					})
				);
				setFamilyMembers(membersWithLocations);
			} catch (err) {
				console.error("Failed to fetch data:", err);
			}
		};

		fetchData();
	}, []);

	const handleMemberClick = (location) => {
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
			<Grid
				container
				spacing={2}
				style={{ height: "calc(100vh - 200px)" }}
			>
				<Grid item xs={12} md={4}>
					<Paper className="side-section" elevation={3}>
						<Typography variant="h5" className="header">
							{currentUser
								? `Welcome, ${currentUser.username}!`
								: "Loading user information..."}
						</Typography>
						{Array.isArray(familyMembers) &&
						familyMembers.length === 0 ? (
							<Typography variant="body1">
								No family members exist. Please add from manage
								members.
							</Typography>
						) : (
							<List>
								{Array.isArray(familyMembers) &&
									familyMembers.map(
										(member) =>
											member.memberId && (
												<ListItem
													button={
														!!member.latitude &&
														!!member.longitude
													}
													key={member.id}
													onClick={() =>
														handleMemberClick([
															member.latitude,
															member.longitude,
														])
													}
												>
													<ListItemAvatar>
														<Avatar>
															{member.memberId[0]}
														</Avatar>
													</ListItemAvatar>
													<ListItemText
														primary={
															member.memberId
														}
														secondary={
															member.latitude &&
															member.longitude
																? "Location found"
																: "No location found"
														}
													/>
												</ListItem>
											)
									)}
							</List>
						)}
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
							{Array.isArray(familyMembers) &&
								familyMembers.map(
									(member) =>
										member.latitude &&
										member.longitude && (
											<Marker
												key={member.id}
												position={[
													member.latitude,
													member.longitude,
												]}
											>
												<Popup>
													{member.memberId}'s location
												</Popup>
											</Marker>
										)
								)}
							<MapCenter center={mapCenter} />
						</MapContainer>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
