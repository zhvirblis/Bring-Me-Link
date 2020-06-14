export default {
	add: function(link, token, tid) {
		return fetch('/api/link',{
			method: "POST",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
                tid,
                link: link
			})
		});
	},
	list: function(token) {
		return fetch('/api/link',{
			method: "GET",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		});
	}
}
