import React from "react";

// import customFetch from "../customFetch";
// import auth from "./auth";

import { UserContext } from '../utils/UserContext'
import auth from "../utils/auth";
import customFetch from "../utils/customFetch";

export default class EditUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			username: "",
			bio: "",
			image: "",
			password: "",
			message: ""
		};
	}
	componentDidMount() {

		customFetch(
			"http://localhost:3000/api/users/user",
			null,
			auth.getToken(),
			"GET"
		).then(data => {
			if(data.user) {
				const user = data.user;
				this.setState(data.user);
			}
		});
	}
	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	updateValue = () => {
		console.log(this.props.loggedUser.email);
		
	}



	updateProfile = (fetchUser) => {

		const { email, username } = this.state;

		if (email.length > 0 && username.length > 0) {
			let user = {};
			for (let i in this.state) {
				if (this.state[i].length > 0) {
					user[i] = this.state[i];
				}
			}

			const userData = {
				user: user
			};

			const upadteUserAPI = "http://localhost:3000/api/users/user";

			

			customFetch(upadteUserAPI, JSON.stringify(userData), auth.getToken(), "PUT")
				.then(userData => {
					if (!userData.errors) {
						
						fetchUser();
						this.props.history.push("/");
					} else {
						this.setState({ message: "email or password is invalid" });
					}
				})
				.catch(error => console.error(error));
		} else {
			this.setState({ message: "Email or username cannot be empty" });
		}
	};

	render() {
		const { email, username, bio, image, password, message } = this.state;
		// console.log(this.state)
		return (
			<UserContext.Consumer>
				 {({loggedUser, fetchUser}) => (

						<div className="column is-8 is-offset-2">
							<div className="column is-8 is-offset-2">
								<div className="sign-header">
									<h1 className="subtitle is-1 ">Edit Profile</h1>
								</div>
								<div className="field">
									<div className="control">
										<input
											name="image"
											className="input "
											type="text"
											placeholder="URL of profile picture"
											value={image}
											onChange={this.handleInput}
										/>
									</div>
								</div>

								<div className="field">
									<div className="control">
										<input
											name="username"
											className="input "
											type="text"
											placeholder="Username"
											value={username}
											onChange={this.handleInput}
										/>
									</div>
								</div>

								<div className="field">
									<div className="control">
										<textarea
											name="bio"
											className="textarea "
											placeholder="Short bio about you"
											rows="5"
											value={bio}
											onChange={this.handleInput}
										/>
									</div>
								</div>

								<div className="field">
									<div className="control">
										<input
											name="email"
											className="input "
											type="email"
											placeholder="Email"
											value={email}
											onChange={this.handleInput}
										/>
									</div>
								</div>

								<div className="field">
									<div className="control">
										<input
											name="password"
											className="input "
											type="text"
											placeholder="New password"
											value={password}
											onChange={this.handleInput}
										/>
									</div>
									<p className="help is-danger">{message}</p>
								</div>

								<div className="field is-grouped">
									<div className="control">
										<button
											className="button is-info "
											onClick={() => this.updateProfile(fetchUser, loggedUser)}
										>
											Update Settings
										</button>
									</div>
								</div>
							</div>
						</div>
				 )}
			</UserContext.Consumer>
		);
	}
}
