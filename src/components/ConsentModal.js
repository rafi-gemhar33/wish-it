import React from "react";

export default class ConsentModal extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      disable: false,
    }
  }

  handleChange = (ev) => {
    this.setState({name: ev.target.value})
  }

  agree = () => {
    this.setState({disable: !this.state.disable})
  }

  toggleModal = () => {
    this.props.handleModal()
  }

  buyGift = () => {
    this.props.buyGift(this.props.gift._id, this.state.name)
    this.props.handleModal()
  }

  render() {
    const active = this.props.isModal ? "is-active" : "";
    const btnDisable = !(this.state.disable && this.state.name.length>0)
    
    return (
        <div className={`modal ${active}`}>
          <div onClick={this.toggleModal} className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Gift Consent Form...</p>
              <button
                onClick={this.toggleModal}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    value = {this.state.name}
                    className="input"
                    type="text"
                    placeholder="e.g Alex Smith"
                    onChange = {this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input onChange={this.agree} type="checkbox" />I agree to get you the gift you
                    pest...
                  </label>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button disabled={btnDisable} onClick={this.buyGift} className="button is-success">I Agree</button>
              <button onClick={this.toggleModal} className="button">
                Cancel
              </button>
            </footer>
          </div>
        </div>
    );
  }
}

