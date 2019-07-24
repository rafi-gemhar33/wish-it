import React from "react";
import { Link, withRouter } from "react-router-dom";

export default class Address extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			phone: "",
			pin: "",
			line1: "",
			line2: "",
			city: "",
			state: "",
			message: ""
		};
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	render() {
		const { name, phone, pin, line1, line2, city, state, message } = this.state;
		return (
			<React.Fragment>
				<div className="column is-8 is-offset-2">
					<div className="column is-6 is-offset-3">
						<div className="sign-header">
							<h1 className="subtitle is-1 ">Address</h1>
						</div>
						<div className="field">
							<div className="control">
								<input
									name="name"
									className="input  is-medium"
									type="text"
									placeholder="name"
									value={name}
									onChange={this.handleInput}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<input
									name="phone"
									className="input  is-medium"
									type="number"
									placeholder="phone"
									value={phone}
									onChange={this.handleInput}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<input
									name="pin"
									className="input  is-medium"
									type="number"
									placeholder="pin"
									value={pin}
									onChange={this.handleInput}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<input
									name="line1"
									className="input  is-medium"
									type="line1"
									placeholder="line1"
									value={line1}
									onChange={this.handleInput}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<input
									name="line2"
									className="input  is-medium"
									type="text"
									placeholder="line2"
									value={line2}
									onChange={this.handleInput}
								/>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<input
									name="city"
									className="input  is-medium"
									type="text"
									placeholder="city"
									value={city}
									onChange={this.handleInput}
								/>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<input
									name="state"
									className="input  is-medium"
									type="text"
									placeholder="state"
									value={state}
									onChange={this.handleInput}
								/>
							</div>
							<p className="help is-danger">{message}</p>
						</div>

						<div className="field is-grouped">
							<div className="control">
								<button
									className="button is-info is-medium"
									onClick={this.updateProfile}
								>
									Add Address
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
