import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import auth from '../utils/auth';
import { UserContext } from '../utils/UserContext';
class Header extends React.Component {
	logout = () => {
		localStorage.clear();
		this.setState({ isLogged: auth.isLogged() });
		this.props.history.push('/');
	};

	constructor(props) {
		super(props);
		this.state = {
			isLogged: auth.isLogged(),
			isHamburger: false,
		};
	}
	render() {
		const { image } = this.props.loggedUser;

		return (
			<React.Fragment>
				<div className="columns is-mobile navbar is-dark is-spaced ">
					<div className="column is-10 is-offset-1">
						<nav className="navbar is-dark ">
							<div className="navbar-brand">
								<h1 className="title is-1">
									<Link className="navbar-item logo" to="/">
										Wish-it !
									</Link>
								</h1>

								<a
									role="button"
									className="navbar-burger burger"
									aria-label="menu"
									aria-expanded="false"
									data-target="navbarBasicExample"
								>
									<span aria-hidden="true" />
									<span aria-hidden="true" />
									<span aria-hidden="true" />
								</a>
							</div>

							<div id="navbarBasicExample" className=" navbar navbar-menu is-dark">

								<div className="navbar-end">
									<div className="navbar-item">
										<div className="navbar-right field is-grouped">
											<p className="control">
												<Link className="button is-info " to="/">
													<span>Home</span>
												</Link>
											</p>

											{!auth.isLogged() ? (
												<>
													<p className="control">
														<Link className="button is-info " to="/login">
															<span>Login</span>
														</Link>
													</p>
													<p className="control">
														<Link className="button is-info " to="/register">
															<span>Sign Up</span>
														</Link>
													</p>
												</>
											) : (
												<>
													<p className="control">
														<Link
															className="button is-danger "
															onClick={this.logout}
														>
															<span>Logout</span>
														</Link>
													</p>
													<div className="flex navbar-item has-dropdown is-hoverable">
														<Link className="" to="/editUser">
															{/* Edit Profile */}
															<figure className="image is-48x48">
																<img
																	className="navbar-pic is-rounded"
																	src={
																		image ||
																		'https://bulma.io/images/placeholders/256x256.png'
																	}
																	alt="Placeholder image"
																/>
															</figure>
														</Link>

														<div className="navbar-dropdown">
															<Link to="/editUser" className="navbar-item">
																Edit Profile
															</Link>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Header);
