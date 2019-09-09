import React from "react";
import { Link } from "react-router-dom";

import Gift from "./Gift";
import customFetch from "../utils/customFetch";
import auth from "../utils/auth";
import ConsentModal from "./ConsentModal";

export default class WishList extends React.Component {
	constructor() {
		super();
		this.state = {
			event: [],
			giftList: [],
			isModal: false,
			modalGift: {}
		};
	}

	componentDidMount() {
		this.populateGifts();
	}

	populateGifts = () => {
		const { slug } = this.props.location.state;
		customFetch(
			`http://localhost:3000/api/events/${slug}/gifts`,
			null,
			auth.getToken(),
			"GET"
		)
			.then(data => {
				// console.log(data);

				this.setState({ giftList: data.gifts || [], event: data || {} });
			})
			.catch(err => console.log(err));
	};

	addGift = giftData => {
		const { name, itemURL, price, image } = giftData;
		let dataInFormat = {
			gift: {
				name,
				itemURL,
				price,
				image
			}
		};

		const { slug } = this.props.location.state;
		customFetch(
			`http://localhost:3000/api/events/${slug}/gifts`,
			JSON.stringify(dataInFormat),
			auth.getToken()
		).then(data => {
			this.populateGifts();
		});
	};

	deleteGift = id => {
		if (window.confirm("Are you sure to delete")) {
			const { slug } = this.props.location.state;

			customFetch(
				`http://localhost:3000/api/events/${slug}/gifts/${id}`,
				null,
				auth.getToken(),
				"DELETE"
			).then(data => {
				this.populateGifts();
			});
		}
	};

	toggleModal = (gift = {}) => {
		this.setState({ isModal: !this.state.isModal, modalGift: gift });
	};

	buyGift = (id, buyeeName) => {
		console.log(id, buyeeName);
		const { slug } = this.props.location.state;
		let dataInFormat = {
			gift: {
				giftedBy: buyeeName,
				isGifted: true
			}
		};

		customFetch(
			`http://localhost:3000/api/events/${slug}/gifts/${id}`,
			JSON.stringify(dataInFormat),
			auth.getToken(),
			"PUT"
		).then(data => {
			console.log(data);
			this.populateGifts();
		});
	};

	render() {
		
		const {eventName} = this.props.location.state.event;
		return (
			<React.Fragment>
				<ConsentModal
					buyGift={this.buyGift}
					gift={this.state.modalGift}
					isModal={this.state.isModal}
					handleModal={this.toggleModal}
				/>
				<div className="columns is-mobile">
					<div className="column is-6 is-offset-3">

						{auth.isLogged() ? (
							<div className="box create-btn">
							<div className="search-box field is-grouped">
							<p className="control is-expanded has-icons-left">
								<input
									className="input is-medium"
									type="text"
									placeholder="Search a product from Amazon"
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-search" aria-hidden="true" />
								</span>
							</p>
							
							<p className="control">
								<button className="button is-info is-medium">Search</button>
							</p>
						</div>
								<Gift addGift={this.addGift} />
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="columns is-mobile">
					<div className="box column is-6 is-offset-3">
						<div className="wishlist-header">
							<h1 className="subtitle is-2 ">{eventName + " Wish List"}</h1>
						</div>
						<div className="card-box">
							{this.state.giftList.length > 0 ? 
								this.state.giftList.map((gift, i) => {
								return (
									<div className="card gift-cards" key={i}>
										<div className="card-image">
											<figure className="image is-square">
												<img
													src={
														gift.image ||
														"https://bulma.io/images/placeholders/256x256.png"
													}
													alt="Placeholder image"
												/>
											</figure>
										</div>
										<div className="card-content">
											<div className="content">
												<p className="content-text">{gift.name}</p>
												<p className="content-text">{gift.price}</p>
												<a target="_blank" href={gift.itemURL}>
													Shopt it Online
												</a>

												<br />
												<div className="card-buttons">
													<button
														disabled={gift.isGifted}
														className="button is-success"
														onClick={() => this.toggleModal(gift)}
													>
														{gift.isGifted
															? `Gifted by ${gift.giftedBy}`
															: "Gift this"}
													</button>

													{auth.isLogged() ? (
														<button
															className="button"
															disabled={gift.isGifted}
															onClick={() => this.deleteGift(gift._id)}
														>
															<i className="fas fa-trash-alt" />
														</button>
													) : (
														<></>
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})
							:
							<p className="help is-danger">No Gifts are added to the Wish List</p>
							}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
