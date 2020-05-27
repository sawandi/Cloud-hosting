import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

//define variables
const initialState = {
  name: "",
  nameError: "",
  categories: [],
};

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = "/category";
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }));
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  //for delete categories
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .category()
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

  //for handle form submit button when add a category
  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      api
        .category()
        .fetchAll()
        .then((res) => {
          const cat = res.data.filter((cat) => cat.name === this.state.name);
          if (cat.length > 0) {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Online Store"
                  content="This Catgory Name Already Exists!"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<ExtensionSharp />}
                />
              ),
            });
          } else {
            api
              .category()
              .create(this.state)
              .then((res) => {
                ButterToast.raise({
                  content: (
                    <Cinnamon.Crisp
                      title="Online Store"
                      content="Category Add successfully"
                      scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                      icon={<AssignmentTurnedIn />}
                    />
                  ),
                });
                this.setState(initialState);
                this.componentDidMount();
              });
          }
        });
    }
  };

  //for validate input fields in form
  validate = () => {
    let nameError = "";

    if (!this.state.name) {
      nameError = "Category Name Cannot Be Blank";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }

    return true;
  };

  render() {
    if (localStorage.getItem("userEmail")) {
      const { categories } = this.state;
      return (
        <div class="container">
          <br></br>
          <br></br>
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="card">
                <div class="card-header">Category</div>
                <div class="card-body">
                  {/*form for add a category*/}
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Category Name
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
                      <button type="submit" class="btn btn-primary">
                        Add
                      </button>
                    </div>
                  </form>
                  <br></br>

                  {/*table for display categories.*/}
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="tableTh">Category Name</th>
                        <th class="tableTh">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr>
                          <td class="tableTh">{category.name}</td>
                          <td class="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onDelete(category._id)}
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

export default Category;
