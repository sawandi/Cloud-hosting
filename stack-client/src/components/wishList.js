import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

//define the variables
const initialState = {
  name: "",
  nameError: "",
  wishlist: [],
  confirmButton: "Add",
  id: "",
};

class wishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = "/wishlist";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const wish = json.filter(
          (wish) => wish.email === localStorage.getItem("userEmail")
        );
        this.setState({ wishlist: wish });
      });
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onView(id) {
    localStorage.setItem("wishListId", id);
    window.location.href = "/list";
  }

  //to delete a wishlist item
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .wishlist()
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

  //to add a product to wishlist or update product
  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const data = {
        name: this.state.name,
        email: localStorage.getItem("userEmail"),
      };
      if (this.state.id) {
        api
          .wishlist()
          .update(this.state.id, data)
          .then((res) => {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Online Store"
                  content="Wishlist edit successfully"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<AssignmentTurnedIn />}
                />
              ),
            });
            this.setState(initialState);
            this.componentDidMount();
          });
      } else {
        api
          .wishlist()
          .create(data)
          .then((res) => {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Online Store"
                  content="Wishlist create successfully"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<AssignmentTurnedIn />}
                />
              ),
            });
            this.setState(initialState);
            this.componentDidMount();
          });
      }
    }
  };

  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  onChange(id, name) {
    this.setState({ confirmButton: "EDIT", id: id, name: name });
  }

  validate = () => {
    let nameError = "";

    if (!this.state.name) {
      nameError = "Wishlist Name Cannot Be Blank";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }

    return true;
  };

  render() {
    if (localStorage.getItem("userEmail")) {
      const { wishlist } = this.state;
      return (
        <div class="container">
          <br></br>
          <br></br>
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="card">
                <div class="card-header">Wishlist</div>
                <div class="card-body">
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Wishlist Name
                      </label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.nameError}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 offset-md-4">
                      <input
                        type="submit"
                        class="btn btn-primary"
                        value={this.state.confirmButton}
                      />
                      <input
                        type="button"
                        class="btn btn-danger"
                        value="Clear"
                        onClick={() => this.onClear()}
                      />
                    </div>
                  </form>
                  <br></br>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="tableTh">Wishlist</th>
                        <th class="tableTh">View</th>
                        <th class="tableTh">Edit</th>
                        <th class="tableTh">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((wish) => (
                        <tr>
                          <td class="tableTh">{wish.name}</td>
                          <td class="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onView(wish._id)}
                              class="btn btn-primary"
                            >
                              View
                            </button>
                          </td>
                          <td class="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onChange(wish._id, wish.name)}
                              class="btn btn-success"
                            >
                              Edit
                            </button>
                          </td>
                          <td class="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onDelete(wish._id)}
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

export default wishList;
