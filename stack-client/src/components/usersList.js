import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const url = "/register";
    fetch(url)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          users: json.filter(
            (user) => user.email !== localStorage.getItem("userEmail")
          ),
        })
      );
  }

  /* --------------deleting a record in this list----------------- */
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .registerUser()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Delete Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  /*-----------------changing the priviledges-----------------------*/
  onUserChange(id, type) {
    if (window.confirm("Are you sure to change the privilege?")) {
      var data = { type: type };
      api
        .registerUser()
        .update(id, data)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Change Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  onSmChange(id, type, email) {
    if (window.confirm("Are you sure to change the privilege?")) {
      var data = { type: type };
      api
        .registerUser()
        .update(id, data)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Change Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
          var data = { email: email };
          api.registerUser().email(data);
        });
    }
  }

  editButton(type, id, email) {
    if (type === "user") {
      return [
        <button
          type="button"
          onClick={() => this.onUserChange(id, "admin")}
          class="btn btn-warning"
        >
          Admin
        </button>,
        <br></br>,
        <button
          type="button"
          onClick={() => this.onSmChange(id, "sm", email)}
          class="btn btn-success"
        >
          S.M
        </button>,
      ];
    } else if (type === "admin") {
      return [
        <button
          type="button"
          onClick={() => this.onUserChange(id, "user")}
          class="btn btn-warning"
        >
          User
        </button>,
        <br></br>,
        <button
          type="button"
          onClick={() => this.onSmChange(id, "sm", email)}
          class="btn btn-success"
        >
          S.M
        </button>,
      ];
    } else if (type === "sm") {
      return [
        <button
          type="button"
          onClick={() => this.onUserChange(id, "admin")}
          class="btn btn-warning"
        >
          Admin
        </button>,
        <br></br>,
        <button
          type="button"
          onClick={() => this.onUserChange(id, "user")}
          class="btn btn-success"
        >
          User
        </button>,
      ];
    }
  }

  render() {
    if (localStorage.getItem("userEmail")) {
      const { users } = this.state;
      return (
        <div class="container">
          <br></br>
          <br></br>
          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">Users</div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="tableTh">First Name</th>
                        <th class="tableTh">Last Name</th>
                        <th class="tableTh">Email</th>
                        <th class="tableTh">Phone</th>
                        <th class="tableTh">User Type</th>
                        <th class="tableTh">Change</th>
                        <th class="tableTh">Remove User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr>
                          <td class="tableTh">{user.fname}</td>
                          <td class="tableTh">{user.lname}</td>
                          <td class="tableTh">{user.email}</td>
                          <td class="tableTh">{user.phone}</td>
                          <td class="tableTh">{user.type}</td>
                          <td class="tableTh">
                            {this.editButton(user.type, user._id, user.email)}
                          </td>
                          <td class="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onDelete(user._id)}
                              class="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Users;
