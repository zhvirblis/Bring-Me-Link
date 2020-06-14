export default function(userName, password) {
	return fetch('/api/login',{
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: userName,
			password: password
		})
	});
}
