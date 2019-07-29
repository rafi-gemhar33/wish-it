import React from "react";
import { Link, withRouter } from "react-router-dom";

export default class Address extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "XXX",
			phone: "123",
			pin: "123",
			line1: "xxx",
			line2: "xxx",
			city: "xxx",
			state: "xxx"
		};
	}

	handleInput = ev => {
		// this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	submitForm = () => {
		this.props.submitForm({ address: this.state });
	};

	render() {
		const { name, phone, pin, line1, line2, city, state } = this.state;
		return (
			<React.Fragment>
				<div className="">
					<div className="address-box">
						<div className="address-header">
							<h1 className="subtitle is-4 ">Address</h1>
						</div>
						<div className="address-row">
							<div className="field">
								<div className="control has-icons-left">
									<input
										name="name"
										className="input  is-medium"
										type="text"
										placeholder="name"
										value={name}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-user" />
									</span>
								</div>
							</div>

							<div className="field">
								<div className="control has-icons-left">
									<input
										name="phone"
										className="input  is-medium"
										type="number"
										placeholder="phone"
										value={phone}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i class="fas fa-phone-alt" />
									</span>
								</div>
							</div>
						</div>

						<div className=" address-row">
							<div className="field">
								<div className="control has-icons-left">
									<input
										name="line1"
										className="input  is-medium"
										type="line1"
										placeholder="line1"
										value={line1}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-home" />
									</span>
								</div>
							</div>

							<div className="field">
								<div className="control has-icons-left">
									<input
										name="line2"
										className="input  is-medium"
										type="text"
										placeholder="line2"
										value={line2}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-building" />
									</span>
								</div>
							</div>
						</div>

						<div className=" address-row">
							<div className="field">
								<div className="control has-icons-left">
									<input
										name="city"
										className="input  is-medium"
										type="text"
										placeholder="city"
										value={city}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-city" />
									</span>
								</div>
							</div>
							<div className="field">
								<div className="control has-icons-left">
									<input
										name="state"
										className="input  is-medium"
										type="text"
										placeholder="state"
										value={state}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i class="fas fa-globe-asia"></i>
									</span>
								</div>
							</div>
						</div>

						<div className="field address-row">
							<div className="field">
								<div className="control has-icons-left">
									<input
										name="pin"
										className="input  is-medium"
										type="number"
										placeholder="pin"
										value={pin}
										onChange={this.handleInput}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-map-pin" />
									</span>
								</div>
							</div>
						</div>

						<div className="field is-grouped">
							<div className="control ">
								{/* <p className="help is-danger">{message}</p> */}
								<button
									className="button is-info is-medium"
									onClick={this.submitForm}
								>
									<span className="icon">
										<i className="fas fa-plus" />
									</span>
									<span>New Event</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
