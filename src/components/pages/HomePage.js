import React from "react";
import Dashboard from "../Dashboard";
import { Redirect } from "react-router-dom";

import auth from "../../utils/auth";

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			searchEvent: "",
			message: "",
			redirect: false,
			slug: "",
			event: {}
		};
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	search = () => {
		const { searchEvent } = this.state;

		if(searchEvent.length > 0){
			fetch(`http://localhost:3000/api/events/${searchEvent}`)
				.then(res => {				
					return res.json()
				})
				.then(data => {
					if (!data.error) {
						this.setState({ redirect: true, slug: data.event.slug, event:data.event });
					} else {
						this.setState({ message: data.error });
					}
				})
				.catch(err => console.log(err));
		} else {
			this.setState({ message: "Why the hell are you searching for an empty event" });
		}

	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return (
				<Redirect
					to={{
						pathname: "/wishList",
						state: {
							slug: this.state.slug,
							event: this.state.event
						}
					}}
				/>
			);
		}
	};

	render() {
		return (
			<React.Fragment>
				{this.renderRedirect()}
				<div className="columns is-mobile">
					<div className="column is-6 is-offset-3">
						<div className="search-box field is-grouped">
							<p className="control is-expanded has-icons-left">
								<input
									onChange={this.handleInput}
									className="input is-medium"
									type="text"
									placeholder="Find a Wish List"
									name="searchEvent"
									value={this.state.searchEvent}
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-search" aria-hidden="true" />
								</span>
							</p>
							<p className="control">
								<button
									onClick={this.search}
									className="button is-info is-medium"
								>
									Search
								</button>
							</p>
							
						</div>
						<p className="help is-danger">{this.state.message}</p>
					</div>
				</div>
				{auth.isLogged() ? <Dashboard /> : <></>}
			</React.Fragment>
		);
	}
}

export default HomePage;
