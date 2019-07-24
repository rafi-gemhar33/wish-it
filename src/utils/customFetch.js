export default function customFetch(
	url = "",
	data = {},
	token = "",
	method = "POST"
) {
	return fetch(url, {
		method: method,
		headers: {
			Authorization: token,
			"Content-Type": "application/json"
		},
		body: data
	}).then(res => res.json())
}
