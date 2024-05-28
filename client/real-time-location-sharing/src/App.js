// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Geofencing from "./components/Geofencing";
import ManageMembers from "./components/ManageMembers";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} exact />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/Profile" element={<Profile />} />
				<Route path="/Geofencing" element={<Geofencing />} />
				<Route path="/ManageMembers" element={<ManageMembers />} />
			</Routes>
		</Router>
	);
}

export default App;
