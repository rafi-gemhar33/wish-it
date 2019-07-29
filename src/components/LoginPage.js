import React from "react";
import { Link } from "react-router-dom";

import customFetch from "../utils/customFetch";
import auth from "../utils/auth";

export default class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "grafi@gmail.com",
			password: "123456789",
			message: "prefilled for testing"
		};
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	submitForm = () => {
		const { password, email } = this.state;
		if (password.length > 0 && email.length > 0) {
			const userData = {
				user: {
					email,
					password
				}
			};

			customFetch(
				"http://localhost:3000/api/users/login",
				JSON.stringify(userData)
			)
				.then(userData => {
					if (userData.user && userData.user.token) {
						localStorage.setItem("currentUser", userData.user.token);

						if (auth.isLogged()) {
							this.props.history.push("/");
						}
					} else {
						this.setState({ message: "email or password is invalid" });
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
						<h1 className="subtitle is-1 ">Sign In</h1>
						<Link className="subtitle green-text" to="/register">
							Need an account?
						</Link>
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
						<p className="control">
							<button
								className="button is-info is-medium"
								onClick={this.submitForm}
							>
								Sign In
							</button>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
