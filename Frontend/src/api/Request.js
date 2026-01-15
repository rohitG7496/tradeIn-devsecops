import axios from "axios";
const API_HOSTNAME = "/api/";


export const Request = async (method, endpoint, token, data) => {
	const headers = token
		? {
			Authorization: `Bearer ${token}`,
		}
		: {};

	if (!(data instanceof FormData)) {
		headers["Content-Type"] = "application/json";
	}

	return await axios({
		method,
		url: API_HOSTNAME + endpoint,
		headers,
		data,
	}).catch((err) => err.response);
};
