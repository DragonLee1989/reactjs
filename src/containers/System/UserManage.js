import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";

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
    let response = await getAllUsers("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrayUsers: response.users,
      });
    }
    console.log("getAllUsers: ", this.state.arrayUsers);
  }

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

  render() {
    console.log("CHECK STATE: ", this.state);
    let arrUsers = this.state.arrayUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="title text-center">Manage Users</div>
        <div className="mx-1">
          <button
            className="btnAddUser btn-primary px-3 border-danger"
            onClick={() => this.handleAddNewUser()}
          >
            <i class="fas fa-plus"></i> Add New User
          </button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
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
                        <i class="fas fa-edit"></i>
                      </button>
                      <button className="btn-del">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
