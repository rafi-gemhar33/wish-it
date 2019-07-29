import React from "react";
import { Link, withRouter } from "react-router-dom";

import customFetch from "../utils/customFetch";
import auth from "../utils/auth";
import Address from "./Address";

export default class NewEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			occasion: "wedding",
			eventName: "funerals with cake",
			date: "20/11/11",
			message: ""
		};
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	submitForm = address => {
		const { occasion, eventName, date, message } = this.state;

		if (occasion.length > 0 && eventName.length > 0 && date.length > 0) {
			const eventData = {
				event: {
					occasion,
					eventName,
					date
				},
				eventAddress: address
			};
			customFetch(
				"http://localhost:3000/api/events",
				JSON.stringify(eventData),
				auth.getToken()
			)
				.then(data => {
					if (!data.errors) {
						this.props.addEvent(data);
					} else {
						this.setState({ message: "Eventname is already taken. It should be unique" });
					}
				})
				.catch(error => console.error(error));
		} else {
			this.setState({ message: "All fields are Mandatory" });
		}
	};

	render() {
		return (
			<div className="">
				<div className="">
					<div className="sign-header">
						<h1 className="subtitle is-2">Add New Event</h1>
					</div>

					{/* <div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="occasion"
								className="input is-medium"
								type="text"
								placeholder="occasion"
								onChange={this.handleInput}
								value={this.state.occasion}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-gifts" />
							</span>
						</div>
					</div> */}
					<div className="field">
						<div class="control has-icons-left has-icons-right">
							<div class="select is-medium">
								<span className="icon is-small is-left">
									<i className="fas fa-gifts" />
								</span>
								<select name="occasion" onChange={this.handleInput} value={this.state.occasion}>
								
									<option selected="selected" >Wedding</option>
									<option>Birthday</option>
									
									<option>Anniversary</option>
									<option>Others</option>
								</select>
							</div>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="eventName"
								className="input is-medium"
								type="text"
								placeholder="Event Name"
								onChange={this.handleInput}
								value={this.state.eventName}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-mask" />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left">
							<input
								name="date"
								className="input is-medium"
								type="date"
								placeholder="date"
								onChange={this.handleInput}
								value={this.state.date}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-calendar-alt" />
							</span>
							<p className="help is-danger">{this.state.message}</p>
						</div>
					</div>

					<Address submitForm={this.submitForm} />
					{/* <div className="field">
						<div className="control"> */}
					{/* <button
								className="button is-info is-medium "
								type="submit"
								onClick={this.submitForm}
							>
								<span className="icon">
									<i className="fas fa-plus" />
								</span>
								<span>New Event</span>
							</button> */}
					{/* </div>
					</div> */}
				</div>
			</div>
		);
	}
}
