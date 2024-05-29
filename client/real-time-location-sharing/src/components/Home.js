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
import {
	getCurrentUser,
	getFamilyMembers,
	getLocationByUserId,
	updateLocation,
} from "./api";
import "./Home.css";
import "leaflet/dist/leaflet.css";
import "././../leafletconfig";

function MapCenter({ center }) {
	const map = useMap();
	map.flyTo(center);
	return null;
}

function Home() {
	const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]);
	const [currentUser, setCurrentUser] = useState(null);
	const [familyMembers, setFamilyMembers] = useState([]);

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

		const updateLocationPeriodically = () => {
			navigator.geolocation.getCurrentPosition(async (position) => {
				try {
					await updateLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				} catch (err) {
					console.error("Failed to update location:", err);
				}
			});
		};

		// Update location every 10 seconds
		const intervalId = setInterval(updateLocationPeriodically, 10000);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	const handleMemberClick = (location) => {
		setMapCenter(location);
	};
	return (
		<div className="home-container">
			<Navbar isNotHome={false}/>
			<Grid container spacing={2} style={{ height: "calc(100vh - 100px)" }}>
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
