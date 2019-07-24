import React from "react";
import Dashboard from "./Dashboard";

import auth from "../utils/auth";

function HomePage(props) {
	return (
		<React.Fragment>
			<div className="columns is-mobile">
				<div className="column is-6 is-offset-3">
					<div className="search-box field is-grouped">
						<p className="control is-expanded has-icons-left">
							<input
								className="input is-medium"
								type="text"
								placeholder="Find a Wish List"
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-search" aria-hidden="true" />
							</span>
						</p>
						<p className="control">
							<a className="button is-info is-medium">Search</a>
						</p>
					</div>
				</div>
			</div>
			{auth.isLogged() ? <Dashboard /> : <></>}
		</React.Fragment>
	);
}

export default HomePage;
