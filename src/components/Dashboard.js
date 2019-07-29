import React from "react";
import { Link } from "react-router-dom";

import customFetch from "../utils/customFetch";
import auth from "../utils/auth";
import NewEvent from "./NewEvent";

export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			eventList: []
		};
	}

	componentDidMount() {
		this.populateEvents();
	}

	populateEvents = () => {
		customFetch(
			"http://localhost:3000/api/events/user",
			null,
			auth.getToken(),
			"GET"
		).then(data => {
			// console.log(data.eventList);
			this.setState({ eventList: data.eventList || [] });
		});
	};

	addEvent = event => {
		// let eventList = this.state.eventList.slice();
		// eventList.push(event);
		// this.setState({ eventList });
		this.populateEvents();
	};

	deleteEvent = slug => {
		if (window.confirm("Are you sure to delete")) {
			customFetch(
				`http://localhost:3000/api/events/${slug}`,
				null,
				auth.getToken(),
				"DELETE"
			).then(data => {
				console.log(data);
				this.populateEvents();
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className="column is-10 is-offset-1">
					<div className="base column is-three-fifths is-offset-one-fifth">
						<div className="box create-btn">
							<NewEvent addEvent={this.addEvent} />
						</div>
						<nav className="panel">
							<p className="panel-heading">Events</p>
							{this.state.eventList.reverse().map((event, i) => {
								const { slug } = event;
								return (
									<div className="event-item control has-icons-left" key={i}>
										<Link
											className="event-link panel-block  has-icons-left"
											to={{
												pathname: "/wishList",
												state: {
													slug: slug,
													event: event
												}
											}}
										>
											<span className="">
												<i className="fas fa-star" aria-hidden="true" />
											</span>
											<span className="event-name">{event.eventName}</span>
										</Link>
										<div className="event-delete">
											<button
												className="button delete-btn"
												onClick={() => this.deleteEvent(slug)}
											>
												<i className="fas fa-trash-alt" />
											</button>
										</div>
									</div>
								);
							})}
						</nav>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
