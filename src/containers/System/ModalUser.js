import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  // props: properties giúp Class Con lấy dữ liệu từ claas Cha
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  componentDidMount() {}

  toggle = () => {
    // alert("TOGGLE");
    // call class toggleFromParent() tu Class Cha "props" trong UserManage.js
    this.props.toggleFromParent();
  };

  handleOnchangeInput = (event, id) => {
    console.log(id + ":" + event.target.value);
  };

  render() {
    console.log("Check child props in ModalUserjs", this.props);
    console.log("Check child open modal in ModalUserjs", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        // centered
        className="modal-user-container"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a New User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "lastName");
                }}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-2"
            onClick={() => {
              this.toggle();
            }}
          >
            Add New
          </Button>{" "}
          <Button
            color="secondary"
            className="px-2"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
