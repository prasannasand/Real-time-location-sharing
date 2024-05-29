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
      <Navbar isNotHome={true}/>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ margin: 16, padding: 16 }}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleAddMember}>
              <TextField name="memberId" label="Add Family Member" fullWidth />
              <div style={{ height: 16 }} />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </form>
            <TextField
              label="Search Members"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredFamilyMembers.length === 0 && <p>No members added</p>}
            <List>
              {filteredFamilyMembers.map((member) => (
                <ListItem key={member.id}>
                  <ListItemAvatar>
                    <Avatar>{member.memberId[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.memberId} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ margin: 16, padding: 16 }}>
            <h3>Pending Requests</h3>
            {filteredPendingRequests.length === 0 && <p>No pending requests</p>}
            <List>
              {filteredPendingRequests.map((request) => (
                <ListItem key={request.id}>
                  <ListItemAvatar>
                    <Avatar>{request.userId[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={request.userId} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeclineRequest(request.id)}
                  >
                    Decline
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default ManageMembers;
