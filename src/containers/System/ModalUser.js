import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  // props: properties giúp Class Con lấy dữ liệu từ claas Cha
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  toggle = () => {
    // alert("TOGGLE");
    // call class toggleFromParent() tu Class Cha "props" trong UserManage.js
    this.props.toggleFromParent();
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
        className="classModal"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a New User
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input type="text" />
              </div>
              <div className="col-6 form-group">
                <label>Email</label>
                <input type="password" />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggle();
            }}
          >
            Do Something
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
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
