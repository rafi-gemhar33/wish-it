import React from 'react';
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
            EventList:[]
		};
    }

    render() {
        return(
           <React.Fragment>
                
           		<div className="column is-8 is-offset-2">
                    <div className="base column is-three-fifths is-offset-one-fifth">
                        <div className="box create-btn">
                        <h1 class="subtitle is-3">Add New Event</h1>
                            <Link class="button is-primary is-large" to="/event">
                                <span class="icon">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span>New Event</span>
                            </Link>
                        </div>
                        <nav className="panel">
                            <p className="panel-heading">
                                Events
                            </p>
                            {
                                this.state.EventList.map(event => {
                                    return(
                                        <p class="control has-icons-left">
                                            <a className="panel-block  has-icons-left">
                                                <span className="">
                                                    <i className="fas fa-star" aria-hidden="true"></i>
                                                </span>
                                                <span>bulma</span>
                                            </a>
                                        </p>
                                    )
                                })
                                
                            }

                        </nav>
                    </div>
                </div>

           </React.Fragment> 
        )
    }
    
}