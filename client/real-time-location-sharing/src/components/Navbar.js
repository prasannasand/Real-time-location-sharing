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
import { Link as RouterLink } from "react-router-dom";

function Navbar({ onLogout }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
						to="/Profile"
						onClick={handleClose}
					>
						Profile
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
							onLogout();
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
