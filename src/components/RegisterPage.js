import React from "react";
import { Link } from "react-router-dom";

import customFetch from "../utils/customFetch";
import auth from "../utils/auth";

export default class RegisterPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			message: ""
		};
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	submitForm = () => {
		const { username, email, password } = this.state;
		if (username.length > 1 && password.length > 1 && email.length > 1) {
			const userData = {
				user: {
					username,
					email,
					password
				}
			};

			customFetch(
				"http://localhost:3000/api/users/user",
				JSON.stringify(userData)
			)
				.then(userData => {
					if (userData.user && userData.user.token) {
						localStorage.setItem("currentUser", userData.user.token);

						if (auth.isLogged()) {
							this.props.history.push("/");
						}
					} else {
						this.setState({ message: userData.message });
					}
				})
				.catch(error => console.error(error));
		} else {
			this.setState({ message: "Email or password cannot be empty" });
		}
	};

	render() {
		return (
			<div className="column is-8 is-offset-2">
				<div className="base column is-three-fifths is-offset-one-fifth">
					<div className="sign-header">
						<h1 className="subtitle is-1 ">Sign Up</h1>
						<Link className="subtitle green-text" to="/login">
							Have an account?
						</Link>
					</div>

					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="username"
								className="input is-medium"
								type="text"
								placeholder="Username"
								onChange={this.handleInput}
								value={this.state.username}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-user" />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="email"
								className="input is-medium"
								type="email"
								placeholder="Email"
								onChange={this.handleInput}
								value={this.state.email}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-envelope" />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left">
							<input
								name="password"
								className="input is-medium"
								type="password"
								placeholder="Password"
								onChange={this.handleInput}
								value={this.state.password}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-lock" />
							</span>
							<p className="help is-danger">{this.state.message}</p>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button
								className="button is-info is-medium "
								type="submit"
								onClick={this.submitForm}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
