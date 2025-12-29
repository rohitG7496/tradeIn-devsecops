import axios from "axios";
const API_HOSTNAME = `http://${window.location.hostname}:8000/api/`;


export const Request = async (method, endpoint, token, data) => {
	return await axios({
		method,
		url: API_HOSTNAME + endpoint,
		// timeout: 20000,
		headers: token
			? {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
			  }
			: {
					"Content-Type": "application/json",
			  },
		data,
	}).catch((err) => err.response);
};
