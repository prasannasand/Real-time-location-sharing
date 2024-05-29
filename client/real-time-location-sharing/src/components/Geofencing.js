import React, { useState, useEffect } from "react";
import "./Geofencing.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Circle,
	useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
	Grid,
	Paper,
	Typography,
	Button,
	TextField,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import {
	getCurrentUser,
	getFamilyMembers,
	getLocationByUserId,
	getGeofences,
	addGeofence,
	deleteGeofence,
	getGeofenceLogs,
} from "./api";

function MapCenter({ center }) {
	const map = useMap();
	map.flyTo(center);
	return null;
}

function Geofencing() {
	const navigate = useNavigate();
	const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
	const [currentUser, setCurrentUser] = useState(null);
	const [familyMembers, setFamilyMembers] = useState([]);
	const [geofences, setGeofences] = useState([]);
	const [geofenceCenter, setGeofenceCenter] = useState("");
	const [geofenceRadius, setGeofenceRadius] = useState("");
	const [geofenceLogs, setGeofenceLogs] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const user = await getCurrentUser();
			setCurrentUser(user);
			await fetchFamilyMembers();
			await fetchGeofences();
			await fetchGeofenceLogs();
		};

		fetchData();
	}, []);

	useEffect(() => {
		const updateLocation = async () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					const { latitude, longitude } = position.coords;
					await updateLocation({ latitude, longitude });
				});
			}
		};

		const locationInterval = setInterval(updateLocation, 5000); // Update location every 5 seconds

		return () => clearInterval(locationInterval);
	}, []);

	const fetchFamilyMembers = async () => {
		const members = await getFamilyMembers();
		const membersWithLocations = await Promise.all(
			members.map(async (member) => {
				const location = await getLocationByUserId(member.memberId);
				return {
					...member,
					location,
				};
			})
		);
		setFamilyMembers(membersWithLocations);
	};

	const fetchGeofences = async () => {
		const geofences = await getGeofences();
		setGeofences(Array.isArray(geofences) ? geofences : []);
	};

	const fetchGeofenceLogs = async () => {
		const logs = await getGeofenceLogs();
		setGeofenceLogs(logs);
	};

	const handleAddGeofence = async () => {
		if (!geofenceCenter || !geofenceRadius) {
			alert("Please provide both center and radius for the geofence.");
			return;
		}

		const [latitude, longitude] = geofenceCenter.split(",").map(Number);

		try {
			const newGeofence = await addGeofence({
				latitude,
				longitude,
				radius: parseFloat(geofenceRadius),
			});
			setGeofences((prevGeofences) => [...prevGeofences, newGeofence]);
			setGeofenceCenter("");
			setGeofenceRadius("");
		} catch (error) {
			console.error("Failed to add geofence", error);
		}
	};

	const handleDeleteGeofence = async (geofenceId) => {
		try {
			await deleteGeofence(geofenceId);
			setGeofences((prevGeofences) =>
				prevGeofences.filter((geofence) => geofence.id !== geofenceId)
			);
		} catch (error) {
			console.error("Failed to delete geofence", error);
		}
	};

	const handleFriendClick = async (userId) => {
		const location = await getLocationByUserId(userId);
		if (location) {
			setMapCenter([location.latitude, location.longitude]);
		}
	};

	const handleLogout = () => {
		navigate("/");
	};

	return (
		<div className="geofencing-container">
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
						<List>
							{familyMembers.length > 0 ? (
								familyMembers.map((member) => (
									<ListItem
										key={member.memberId}
										className="friend-item"
										onClick={() =>
											handleFriendClick(member.memberId)
										}
									>
										<ListItemAvatar>
											<Avatar className="friend-avatar">
												{member.memberId[0]}
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={member.memberId}
											secondary={
												member.location
													? "Location found"
													: "No location found"
											}
										/>
									</ListItem>
								))
							) : (
								<Typography>
									No family members found. Please add from
									manage members.
								</Typography>
							)}
						</List>
						<TextField
							label="Geofence Center (lat,lng)"
							value={geofenceCenter}
							onChange={(e) => setGeofenceCenter(e.target.value)}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Geofence Radius (meters)"
							value={geofenceRadius}
							onChange={(e) => setGeofenceRadius(e.target.value)}
							fullWidth
							margin="normal"
						/>
						<Button
							onClick={handleAddGeofence}
							variant="contained"
							color="primary"
						>
							Add Geofence
						</Button>
						<Typography variant="h6" style={{ marginTop: 20 }}>
							Current Geofences:
						</Typography>
						<List>
							{geofences.length > 0 ? (
								geofences.map((geofence) => (
									<ListItem
										key={geofence.id}
										onClick={() =>
											setMapCenter([
												geofence.latitude,
												geofence.longitude,
											])
										}
									>
										<ListItemText
											primary={`Center: (${geofence.latitude}, ${geofence.longitude})`}
											secondary={`Radius: ${geofence.radius} meters`}
										/>
										<Button
											variant="contained"
											color="secondary"
											onClick={() =>
												handleDeleteGeofence(
													geofence.id
												)
											}
										>
											Remove
										</Button>
									</ListItem>
								))
							) : (
								<Typography>No available geofences.</Typography>
							)}
						</List>
						<Typography variant="h6" style={{ marginTop: 20 }}>
							Geofence Logs:
						</Typography>
						<List>
							{geofenceLogs.length > 0 ? (
								geofenceLogs.map((log, index) => (
									<ListItem key={index}>
										<ListItemText
											primary={`${log.memberId} ${log.action}`}
											secondary={new Date(
												log.timestamp
											).toLocaleString()}
										/>
									</ListItem>
								))
							) : (
								<Typography>
									No geofence logs available.
								</Typography>
							)}
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
							{familyMembers.map(
								(member) =>
									member.location && (
										<Marker
											key={member.memberId}
											position={[
												member.location.latitude,
												member.location.longitude,
											]}
										>
											<Popup>
												{member.memberId}'s location
											</Popup>
										</Marker>
									)
							)}
							{Array.isArray(geofences) &&
								geofences.map((geofence, index) => (
									<Circle
										key={index}
										center={[
											geofence.latitude,
											geofence.longitude,
										]}
										radius={geofence.radius}
										color="red"
									/>
								))}
							<MapCenter center={mapCenter} />
						</MapContainer>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Geofencing;
