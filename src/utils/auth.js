class Auth {
	isLogged() {
		const token = localStorage.getItem("currentUser");
		return token ? true : false;
	}

	getToken() {
		return localStorage.getItem("currentUser");
	}
}

export default new Auth();
