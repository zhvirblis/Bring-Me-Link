export default function(userName, email, password, password2) {
	return fetch('/api/reg',{
		method: "POST",
	        credentials: "same-origin",
	        headers: {
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	        login: userName,
            email: email,
	        password: password,
            password2: password2
		 })
	});
}
