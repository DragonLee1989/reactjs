import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  //   state = {};
  // tao constructor => init state
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
      isOpenModalUser: false,
    };
  }

  // ham goi API => DidMount => set state: ham gan gia tri cho cac bien state
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrayUsers: response.users,
      });
    }
    console.log("getAllUsers: ", this.state.arrayUsers);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
    // alert("ONCLICK ADD NEW USER!");
  };

  // toggle: show or hide Modal
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewUser = async (data) => {
    // alert("call me");
    try {
      let response = await createNewUserService(data);
      console.log("Check Data createNewUserService at UserManager: ", response);
      if (response && response.message.errCode !== 0) {
        alert(response.message.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        // clear MODAL USER sau khi ADD USER
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log("Error Data createNewUserService at UserManager", error);
    }
    // console.log("Get Data from Child at Father_UserManager: ", data);
  };

  handleDeteleUser = async (user) => {
    console.log("DELETE USER", user.id);
    try {
      let response = await deleteUserService(user.id);
      // console.log(response);
      if (response && response.message.errCode == 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(response.message.errMessage);
      }
    } catch (error) {
      console.log("deleteUserService at UserManage: ", error);
    }
  };

  render() {
    console.log("CHECK STATE: ", this.state);
    let arrUsers = this.state.arrayUsers;
    return (
      <div className="users-container">
        {/* Cho phép thèn con gọi thèn cha để thèn cha cập nhật thông tin từ các thèn con */}
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center">Manage Users</div>
        <div className="mx-1">
          <button
            className="btnAddUser btn-primary px-3 border-danger"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add New User
          </button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th className="col-1 text-center">No</th>
                <th className="col-4">Email</th>
                <th className="col-1">First Name</th>
                <th className="col-1">Last Name</th>
                <th className="col-4">Address</th>
                <th className="col-1 text-center">Actions</th>
              </tr>
              {/* ham "map" thay cho vong lap "for" */}
              {arrUsers &&
                arrUsers.map((item, index) => {
                  // console.log("CHECK MAP: ", item, index);
                  return (
                    <tr key={index}>
                      <td className="text-center">{index}</td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => this.handleDeteleUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
