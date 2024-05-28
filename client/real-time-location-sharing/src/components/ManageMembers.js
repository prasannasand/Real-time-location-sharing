import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Checkbox,
	Container,
	Typography,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function ManageMembers() {
	const [currentFriends, setCurrentFriends] = useState([
		{ id: 1, name: "Alice", shareLocation: true },
		{ id: 2, name: "Bob", shareLocation: false },
	]);
	const [pendingRequests, setPendingRequests] = useState([
		{ id: 3, name: "Charlie" },
		{ id: 4, name: "David" },
	]);

	const toggleShareLocation = (id) => {
		setCurrentFriends(
			currentFriends.map((friend) =>
				friend.id === id
					? { ...friend, shareLocation: !friend.shareLocation }
					: friend
			)
		);
	};

	const removeFriend = (id) => {
		setCurrentFriends(currentFriends.filter((friend) => friend.id !== id));
	};

	const acceptRequest = (id) => {
		const request = pendingRequests.find((request) => request.id === id);
		setPendingRequests(
			pendingRequests.filter((request) => request.id !== id)
		);
		setCurrentFriends([
			...currentFriends,
			{ ...request, shareLocation: true },
		]);
	};

	const rejectRequest = (id) => {
		setPendingRequests(
			pendingRequests.filter((request) => request.id !== id)
		);
	};

	return (
		<Container>
			<Typography
				variant="h6"
				component="div"
				style={{ marginTop: "20px" }}
			>
				Current Friends
			</Typography>
			<List>
				{currentFriends.map((friend) => (
					<ListItem key={friend.id}>
						<ListItemText primary={friend.name} />
						<ListItemSecondaryAction>
							<Checkbox
								checked={friend.shareLocation}
								onChange={() => toggleShareLocation(friend.id)}
								color="primary"
							/>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => removeFriend(friend.id)}
							>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			<Typography
				variant="h6"
				component="div"
				style={{ marginTop: "20px" }}
			>
				Pending Requests
			</Typography>
			<List>
				{pendingRequests.map((request) => (
					<ListItem key={request.id}>
						<ListItemText primary={request.name} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="add"
								onClick={() => acceptRequest(request.id)}
							>
								<AddIcon />
							</IconButton>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => rejectRequest(request.id)}
							>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Container>
	);
}

export default ManageMembers;
