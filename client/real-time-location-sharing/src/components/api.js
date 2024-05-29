// const API_URL = "http://localhost:8080";

// export const getFamilyMembers = async () => {
// 	const response = await fetch(`${API_URL}/family/members`, {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		credentials: "include", // Include cookies for authentication
// 	});
// 	return response.json();
// };

// export const addFamilyMember = async (member) => {
// 	const response = await fetch(`${API_URL}/family/add`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(member),
// 		credentials: "include", // Include cookies for authentication
// 	});
// 	return response.json();
// };

// export const deleteFamilyMember = async (id) => {
// 	await fetch(`${API_URL}/family/delete/${id}`, {
// 		method: "DELETE",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		credentials: "include", // Include cookies for authentication
// 	});
// };

const API_URL = "http://localhost:8080";

export const getCurrentUser = async () => {
	const response = await fetch(`${API_URL}/appuser/current`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const getFamilyMembers = async () => {
	const response = await fetch(`${API_URL}/family/members`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const getPendingRequests = async () => {
	const response = await fetch(`${API_URL}/family/pending`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const addFamilyMember = async (member) => {
	const response = await fetch(`${API_URL}/family/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(member),
		credentials: "include", // Include cookies for authentication
	});
	return response.json();
};

export const acceptFamilyMemberRequest = async (id) => {
	await fetch(`${API_URL}/family/accept/${id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
};

export const declineFamilyMemberRequest = async (id) => {
	await fetch(`${API_URL}/family/decline/${id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
};

export const deleteFamilyMember = async (id) => {
	await fetch(`${API_URL}/family/delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for authentication
	});
};
