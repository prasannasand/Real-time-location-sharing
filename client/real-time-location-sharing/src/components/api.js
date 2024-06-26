const API_URL = "http://localhost:8080";

export const getGeofenceLogs = async () => {
	const response = await fetch(`${API_URL}/geofence-log/get`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (response.ok) {
		return response.json();
	}
	return [];
};

export const getGeofences = async () => {
	const response = await fetch(`${API_URL}/geofence/all`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const addGeofence = async (geofence) => {
	const response = await fetch(`${API_URL}/geofence/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(geofence),
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const deleteGeofence = async (id) => {
	await fetch(`${API_URL}/geofence/delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
};

export const getLocationByUserId = async (userId) => {
	const response = await fetch(`${API_URL}/location/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const updateLocation = async (location) => {
	const response = await fetch(`${API_URL}/location/update`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(location),
		credentials: "include",
	});
	return response.json();
};

export const getCurrentUser = async () => {
	try {
		const response = await fetch(`${API_URL}/appuser/current`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Include cookies for authentication
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		return response.json();
	} catch (error) {
		console.error("Failed to fetch current user", error);
		return null;
	}
};

export const getFamilyMembers = async () => {
	try {
		const response = await fetch(`${API_URL}/family/members`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Include cookies for authentication
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		return response.json();
	} catch (error) {
		console.error("Failed to fetch family members", error);
		return [];
	}
};

export const getPendingRequests = async () => {
	try {
		const response = await fetch(`${API_URL}/family/pending`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Include cookies for authentication
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		return response.json();
	} catch (error) {
		console.error("Failed to fetch pending requests", error);
		return [];
	}
};

// export const addFamilyMember = async (member) => {
// 	try {
// 		const response = await fetch(`${API_URL}/family/add`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(member),
// 			credentials: "include", // Include cookies for authentication
// 		});
// 		if (!response.ok) {
// 			throw new Error(`Error: ${response.status}`);
// 		}
// 		return response.json();
// 	} catch (error) {
// 		console.error("Failed to add family member", error);
// 		return null;
// 	}
// };

export const addFamilyMember = async (member) => {
	const response = await fetch(`${API_URL}/family/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(member),
		credentials: "include", // Include cookies for authentication
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}
	return response.json();
};

export const acceptFamilyMemberRequest = async (id) => {
	try {
		const response = await fetch(`${API_URL}/family/accept/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Include cookies for authentication
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Failed to accept family member request", error);
	}
};

export const declineFamilyMemberRequest = async (id) => {
	try {
		const response = await fetch(`${API_URL}/family/decline/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Include cookies for authentication
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Failed to decline family member request", error);
	}
};

export const deleteFamilyMember = async (id) => {
	try {
		const response = await fetch(`${API_URL}/family/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Include cookies for authentication
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Failed to delete family member", error);
	}
};
