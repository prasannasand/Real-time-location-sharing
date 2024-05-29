import React, { useEffect, useState } from "react";
import {
	getCurrentUser,
	getFamilyMembers,
	getPendingRequests,
	addFamilyMember,
	acceptFamilyMemberRequest,
	declineFamilyMemberRequest,
	deleteFamilyMember,
} from "./api";
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Grid,
	Paper,
	Button,
	TextField,
	Alert,
} from "@mui/material";
import Navbar from "./Navbar";
import "./ManageMembers.css";

function ManageMembers() {
	const [currentUser, setCurrentUser] = useState(null);
	const [familyMembers, setFamilyMembers] = useState([]);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const user = await getCurrentUser();
			setCurrentUser(user);
			fetchFamilyMembers();
			fetchPendingRequests();
		};

		fetchData();
	}, []);

	const fetchFamilyMembers = async () => {
		const members = await getFamilyMembers();
		setFamilyMembers(members);
	};

	const fetchPendingRequests = async () => {
		const requests = await getPendingRequests();
		setPendingRequests(requests);
	};

	const handleAddMember = async (event) => {
		event.preventDefault();
		const memberId = event.target.memberId.value;

		if (currentUser.username === memberId) {
			alert("You cannot add yourself as a family member.");
			return;
		}

		try {
			await addFamilyMember({ memberId });
			fetchPendingRequests(); // Refresh the pending requests
			setError(null);
		} catch (error) {
			setError(error.message || "Failed to add family member.");
		}
	};

	const handleAcceptRequest = async (id) => {
		try {
			await acceptFamilyMemberRequest(id);
			fetchPendingRequests(); // Refresh the pending requests
			fetchFamilyMembers(); // Refresh the family members list
		} catch (error) {
			console.error("Failed to accept family member request", error);
		}
	};

	const handleDeclineRequest = async (id) => {
		try {
			await declineFamilyMemberRequest(id);
			fetchPendingRequests(); // Refresh the pending requests
		} catch (error) {
			console.error("Failed to decline family member request", error);
		}
	};

	const handleDeleteMember = async (id) => {
		try {
			await deleteFamilyMember(id);
			fetchFamilyMembers(); // Refresh the family members list
		} catch (error) {
			console.error("Failed to delete family member request", error);
		}
	};

	const filteredFamilyMembers = familyMembers.filter((member) =>
		member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredPendingRequests = pendingRequests.filter((request) =>
		request.memberId.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Navbar isNotHome={true} />
			<div className="manage-members-container">
				<Grid container spacing={2} className="MuiGrid-container">
					<Grid item xs={12} md={6} className="MuiGrid-item">
						<Paper elevation={3} className="paper">
							{error && (
								<Alert
									severity="error"
									onClose={() => setError(null)}
								>
									{error}
								</Alert>
							)}
							<form onSubmit={handleAddMember}>
								<TextField
									name="memberId"
									label="Add Family Member"
									fullWidth
								/>
								<div style={{ height: 16 }} />
								<Button
									type="submit"
									variant="contained"
									color="primary"
								>
									Request Location
								</Button>
							</form>
							<TextField
								label="Search Members"
								fullWidth
								margin="normal"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							{filteredFamilyMembers.length === 0 && (
								<p>No members added</p>
							)}
							<List className="list-container">
								{filteredFamilyMembers.map((member) => (
									<ListItem key={member.id}>
										<ListItemAvatar>
											<Avatar>
												{member.memberId[0]}
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={member.memberId}
										/>
										<Button
											variant="contained"
											color="secondary"
											onClick={() =>
												handleDeleteMember(member.id)
											}
											style={{ margin: 2 }}
										>
											Remove
										</Button>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6} className="MuiGrid-item">
						<Paper elevation={3} className="paper">
							<h3>Pending Requests</h3>
							{filteredPendingRequests.length === 0 && (
								<p>No pending requests</p>
							)}
							<List className="list-container">
								{filteredPendingRequests.map((request) => (
									<ListItem key={request.id}>
										<ListItemAvatar>
											<Avatar>{request.userId[0]}</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={request.userId}
										/>
										<Button
											variant="contained"
											color="primary"
											style={{ margin: 2 }}
											onClick={() =>
												handleAcceptRequest(request.id)
											}
										>
											Accept
										</Button>
										<Button
											variant="contained"
											color="secondary"
											style={{ margin: 2 }}
											onClick={() =>
												handleDeclineRequest(request.id)
											}
										>
											Decline
										</Button>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
export default ManageMembers;
