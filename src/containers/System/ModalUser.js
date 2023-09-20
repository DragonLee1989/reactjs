import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

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

    this.listenToEmitter();
  }

  listenToEmitter() {
    // truyen DATA tu parent to child khi co thong tin event "EVENT_CLEAR_MODAL_DATA"
    // emitter.on("EVENT_CLEAR_MODAL_DATA", (data) => {
    //   console.log("Listen emitter from parent: ", data);
    // });
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      // reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
      console.log("EVENT_CLEAR_MODAL_DATA has resetted: ", this.state);
    });
  }

  componentDidMount() {
    console.log("Mouting Modal");
  }

  toggle = () => {
    // alert("TOGGLE");
    // call class toggleFromParent() tu Class Cha "props" trong UserManage.js
    this.props.toggleFromParent();
  };

  handleOnchangeInput = (event, id) => {
    // BAD CODE: chỉnh sửa rồi copy state "modify trực tiếp" dễ gây lỗi
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state, // "...": copy state
    //   },
    //   () => {
    //     console.log("Check bad state: ", this.state);
    //   }
    // );
    // GOOD CODE: copy state trước khi chỉnh sửa "modify gián tiếp"
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("Check good state: ", this.state);
      }
    );
    // console.log(id + ":" + event.target.value);
  };

  handleAddNewUser = () => {
    // check Validate từng Input
    let isValid = this.checkValidateInput();
    if (isValid) {
      // Gọi funtion "createNewUser()" từ thèn cha "UserManager"
      this.props.createNewUser(this.state);
      console.log("Data ModalUser: ", this.state);
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break; // thoat khoi vong lap for
      }
    }
    return isValid;
  };

  render() {
    // console.log("Check child props in ModalUserjs", this.props);
    // console.log("Check child open modal in ModalUserjs", this.props.isOpen);
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
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-2"
            onClick={() => {
              this.handleAddNewUser();
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
