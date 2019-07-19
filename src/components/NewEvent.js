import React from 'react';
import { Link, withRouter } from "react-router-dom";

export default class NewEvent extends React.Component {
	constructor() {
		super();
		this.state = {
            "occasion": "",
            "eventName" : "",
			"date": "",
			message: "",
		};
    }

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

    render() {
        return(
			<div className="column is-8 is-offset-2">
				<div className="base column is-three-fifths is-offset-one-fifth">
					<div className="sign-header">
						<h1 className="subtitle is-1 ">Event</h1>
					</div>

					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="occasion"
								className="input is-large"
								type="text"
								placeholder="occasion"
								onChange={this.handleInput}
								value={this.state.occasion}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-gifts" />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="eventName"
								className="input is-large"
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
								className="input is-large"
								type="date"
								placeholder="date"
								onChange={this.handleInput}
								value={this.state.date}
							/>
							<span className="icon is-small is-left">
                                <i className="fas fa-calendar-alt"></i>
							</span>
							<p className="help is-danger">{this.state.message}</p>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button
								className="button is-info is-large "
								type="submit"
								onClick={this.submitForm}
							>
								Add Event
							</button>
						</div>
					</div>
				</div>
			</div>
        )
    }
    
}