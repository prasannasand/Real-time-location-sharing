// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Geofencing from "./components/Geofencing";
import ManageMembers from "./components/ManageMembers";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} exact />
				<Route path="/home" element={<Home />} exact />
				<Route path="/register" element={<Register />} />
				<Route path="/Geofencing" element={<Geofencing />} />
				<Route path="/ManageMembers" element={<ManageMembers />} />
			</Routes>
		</Router>
	);
}

export default App;
