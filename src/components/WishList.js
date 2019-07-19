import React from 'react';
import { Link } from "react-router-dom";

export default class WishList extends React.Component {
	constructor() {
		super();
		this.state = {
            giftList:[]
		};
    }

    render() {
        return(
           <React.Fragment>
                <div className="columns is-mobile">
                    <div className="column is-one-third is-offset-one-third">
                    <div className="search-box field is-grouped">
                        <p className="control is-expanded has-icons-left">
                        <input className="input is-large" type="text" placeholder="Search a product from Amazon" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                        <p className="control">
                        <a className="button is-info is-large">
                            Search
                        </a>
                        </p>
                    </div>
                    <div className="box create-btn">
                        <h1 class="subtitle is-3">Add New Gift</h1>
                            <Link class="button is-primary is-large" to="/gift">
                                <span class="icon">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span>New Gift</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="columns is-mobile">

                <div className="card-box column is-three-fifths is-offset-one-fifth">


                        {
                            this.state.giftList.map(gift => {
                                return(
                                    <div class="card gift-cards">
                                        <div class="card-image">
                                            <figure class="image is-square">
                                            <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                                            </figure>
                                        </div>
                                        <div class="card-content">
                                            <div class="media">
                                                <div class="media-left">

                                                </div>
                                                <div class="media-content">
                                                    <p class="title is-4">John Smith</p>
                                                    <p class="subtitle is-6">@johnsmith</p>
                                                </div>
                                            </div>

                                            <div class="content">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                            <a href="#">#css</a> <a href="#">#responsive</a>
                                            <br />
                                            <button className="button is-success">Gift this</button>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
           </React.Fragment> 
        )
    }
    
}