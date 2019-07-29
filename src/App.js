import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import EditUser from "./components/EditUser";
import WishList from "./components/WishList";
import NewEvent from "./components/NewEvent";
import Address from "./components/Address";
import auth from "./utils/auth";
import { UserContext } from "./utils/UserContext";
import customFetch from "./utils/customFetch";

import "bulma/css/bulma.css";
import "./App.css";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.fetchUser = () => {
			customFetch(
				"http://localhost:3000/api/users/user",
				null,
				auth.getToken(),
				"GET"
			).then(data => {
				if (data.user) {
					this.setState({ loggedUser: data.user });
				} else {
					this.setState({ loggedUser: {} });
				}
			});
		};
		this.state = {
			loggedUser: {},
			fetchUser: this.fetchUser
		};
	}

	componentDidMount() {
		this.fetchUser();
	}
	render() {
		return (
			<UserContext.Provider value={this.state}>
				<div className="App">
					<Header loggedUser={this.state.loggedUser} />
					{/* <Route path="/" component={Header} /> */}
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/event" component={NewEvent} />
						<Route path="/address" component={Address} />
						<Route
							path="/editUser"
							render={props => (
								<EditUser {...props} loggedUser={this.state.loggedUser} />
							)}
						/>
						<Route path="/wishList" component={WishList} />
					</Switch>
				</div>
			</UserContext.Provider>
		);
	}
}

export default App;
