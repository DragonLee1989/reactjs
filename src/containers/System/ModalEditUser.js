import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";
// using "lodash" tuong tu jquery
import _ from "lodash";

class ModalEditUser extends Component {
  // props: properties giúp Class Con lấy dữ liệu từ claas Cha
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    this.checkCurrentUser();
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

  handleUpdateUser = () => {
    // check Validate từng Input
    let isValid = this.checkValidateInput();
    if (isValid) {
      // Gọi funtion "editUser()" từ thèn cha "UserManager"
      // call API editUser(this.state)
      // then CON "editUser" call ham "handleUpdateEditUser" tu then CHA "UserManager"
      // console.log("Data ModalEditUser: ", this.state);
      this.props.editUser(this.state);
    }
  };

  // kiem tra cac INPUT co rong ko?
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

  // kiem tra User de update len Modal EditUser
  checkCurrentUser = () => {
    let user = this.props.currentUser;
    // console.log("DidMouting ModalEditUser: ", this.props.currentUser);
    // using "lodash" ham _.isEmpty(user) de check "user" co rong ko?
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  };

  render() {
    // Check truyen data tu then CHA "UserManage" sang then CON "ModalEditUser"
    // console.log("Check child props in ModalEditUserjs", this.props);
    // console.log("Check child open modal in ModalEditUserjs", this.props.isOpen);
    // console.log(
    //   "Check props in ModalEditUserjs from parent",
    //   this.props.currentUser
    // );

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
          Edit User
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
                disabled
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
                disabled
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
              this.handleUpdateUser();
            }}
          >
            Update
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
