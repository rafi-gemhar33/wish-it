import React from 'react';
import { Link, withRouter } from "react-router-dom";

export default class Gift extends React.Component {
	constructor() {
		super();
		this.state = {
            "name": "",
            "itemURL": "",
            "price": "",
            "image": "",
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
						<h1 className="subtitle is-1 ">Gift</h1>
					</div>

					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="name"
								className="input is-large"
								type="text"
								placeholder="Item name"
								onChange={this.handleInput}
								value={this.state.name}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-gifts" />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left has-icons-right">
							<input
								name="itemURL"
								className="input is-large"
								type="text"
								placeholder="ItemURL"
								onChange={this.handleInput}
								value={this.state.itemURL}
							/>
							<span className="icon is-small is-left">
								<i className="fas fa-globe" />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control has-icons-left">
							<input
								name="price"
								className="input is-large"
								type="Number"
								placeholder="price"
								onChange={this.handleInput}
								value={this.state.price}
							/>
							<span className="icon is-small is-left">
                                <i className="fas fa-tag"></i>
							</span>
						</div>
					</div>
                    <div className="field">
						<div className="control has-icons-left">
							<input
								name="image"
								className="input is-large"
								type="text"
								placeholder="image URL"
								onChange={this.handleInput}
								value={this.state.image}
							/>
							<span className="icon is-small is-left">
                                <i className="fas fa-image"></i>
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
								Add Gift
							</button>
						</div>
					</div>
				</div>
			</div>
        )
    }
    
}