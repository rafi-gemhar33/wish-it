import React from "react";
import { Link, withRouter } from "react-router-dom";

export default class Gift extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "test",
			itemURL: "https://www.amazon.in/Morphy-Richards-Fresco-800-Watt-Espresso/dp/B00A2286B6/ref=sr_1_4?keywords=espresso+machine&qid=1563944243&s=gateway&sr=8-4",
			price: "111",
			image: "https://images.unsplash.com/photo-1545844568-98bb15133ec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
			message: ""
		};
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
  };
  
  submitForm = () => {
    const { name, itemURL, price } = this.state;
    if(name.length > 0  || itemURL > 0 || price > 0){
      this.props.addGift(this.state);
    } else {
      this.setState({message:"Item name, Item URL & Price are mandatory"})
    }
    
  }

	render() {
		return (
			<div className="">

				<div className="sign-header">
					<h1 className="subtitle is-2 ">Add New Gift</h1>
				</div>

				<div className="field">
					<div className="control has-icons-left has-icons-right">
						<input
							name="name"
							className="input is-medium"
							type="text"
							placeholder="Item Name"
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
							className="input is-medium"
							type="text"
							placeholder="Item URL"
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
							className="input is-medium"
							type="Number"
							placeholder="Price"
							onChange={this.handleInput}
							value={this.state.price}
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-tag" />
						</span>
					</div>
				</div>
				<div className="field">
					<div className="control has-icons-left">
						<input
							name="image"
							className="input is-medium"
							type="text"
							placeholder="Image URL"
							onChange={this.handleInput}
							value={this.state.image}
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-image" />
						</span>
						<p className="help is-danger">{this.state.message}</p>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<button
							className="button is-info is-medium "
							type="submit"
							onClick={this.submitForm}
						>
							<span className="icon">
								<i className="fas fa-plus" />
							</span>
							<span>New Gift</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
