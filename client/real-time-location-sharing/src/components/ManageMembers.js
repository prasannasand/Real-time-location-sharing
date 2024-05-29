import React, { useState, useEffect } from "react";
import {
	getFamilyMembers,
	getPendingRequests,
	addFamilyMember,
	acceptFamilyMemberRequest,
	declineFamilyMemberRequest,
	deleteFamilyMember,
} from "./api";

const ManageMembers = () => {
	const [familyMembers, setFamilyMembers] = useState([]);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [newMember, setNewMember] = useState({ memberId: "" });
	const [searchTerm, setSearchTerm] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchFamilyMembers();
		fetchPendingRequests();
	}, []);

	const fetchFamilyMembers = async () => {
		try {
			const members = await getFamilyMembers();
			setFamilyMembers(members);
		} catch (err) {
			console.error("Failed to fetch family members:", err);
			setError("Failed to fetch family members.");
		}
	};

	const fetchPendingRequests = async () => {
		try {
			const requests = await getPendingRequests();
			setPendingRequests(requests);
		} catch (err) {
			console.error("Failed to fetch pending requests:", err);
			setError("Failed to fetch pending requests.");
		}
	};

	const handleAddFamilyMember = async () => {
		try {
			await addFamilyMember(newMember);
			setNewMember({ memberId: "" });
			fetchFamilyMembers();
			fetchPendingRequests();
		} catch (err) {
			console.error("Failed to add family member:", err);
			setError("Failed to add family member.");
		}
	};

	const handleAcceptRequest = async (id) => {
		try {
			await acceptFamilyMemberRequest(id);
			fetchPendingRequests();
			fetchFamilyMembers();
		} catch (err) {
			console.error("Failed to accept family member request:", err);
			setError("Failed to accept family member request.");
		}
	};

	const handleDeclineRequest = async (id) => {
		try {
			await declineFamilyMemberRequest(id);
			fetchPendingRequests();
		} catch (err) {
			console.error("Failed to decline family member request:", err);
			setError("Failed to decline family member request.");
		}
	};

	const handleDeleteFamilyMember = async (id) => {
		try {
			await deleteFamilyMember(id);
			fetchFamilyMembers();
		} catch (err) {
			console.error("Failed to delete family member:", err);
			setError("Failed to delete family member.");
		}
	};

	const filteredMembers = familyMembers.filter(
		(member) =>
			member.memberId &&
			member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h2>Manage Family Members</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input
				type="text"
				placeholder="Search members..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<ul>
				{filteredMembers.map((member) => (
					<li key={member.id}>
						{member.memberId}
						<button
							onClick={() => handleDeleteFamilyMember(member.id)}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h3>Add Family Member</h3>
			<input
				type="text"
				placeholder="User ID"
				value={newMember.memberId}
				onChange={(e) =>
					setNewMember({ ...newMember, memberId: e.target.value })
				}
			/>
			<button onClick={handleAddFamilyMember}>Add</button>
			<h3>Pending Requests</h3>
			<ul>
				{pendingRequests.map((request) => (
					<li key={request.id}>
						{request.userId} wants to add you as a family member
						<button onClick={() => handleAcceptRequest(request.id)}>
							Accept
						</button>
						<button
							onClick={() => handleDeclineRequest(request.id)}
						>
							Decline
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageMembers;
