// components/Navbar.js
import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ isNotHome = false }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		console.log("Logging out...");
		axios
			.post("http://localhost:8080/logout")
			.then((response) => {
				document.cookie =
					"JSESSIONID=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Logout error:", error);
			});
		navigate("/"); // Redirect to login after logout
	};

	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Real-time Location Sharing
				</Typography>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					keepMounted
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem
						component={RouterLink}
						to="/home"
						onClick={handleClose}
					>
						Home
					</MenuItem>
					<MenuItem
						component={RouterLink}
						to="/ManageMembers"
						onClick={handleClose}
					>
						Manage Members
					</MenuItem>
					<MenuItem
						component={RouterLink}
						to="/Geofencing"
						onClick={handleClose}
					>
						Set Geofencing Area
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose();
							handleLogout();
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
