import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";
import axios from "axios";

//define variables
const initialState = {
  id: "",
  name: "",
  nameError: "",
  category: "",
  categoryError: "",
  quantity: "",
  quantityError: "",
  price: "",
  priceError: "",
  discount: "",
  discountError: "",
  confirmButton: "ADD",
  categories: [],
  products: [],
  selectedFile: "",
  image: "",
};

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = "/category";
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }));
    const purl = "/product";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => this.setState({ products: json }));
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  //update product details
  onChange(id) {
    const url = "/product/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const pro = json.filter((pro) => pro._id === id);
        this.setState({
          name: pro[0]["name"],
          category: pro[0]["category"],
          price: pro[0]["price"],
          quantity: pro[0]["quantity"],
          discount: pro[0]["discount"],
          id: pro[0]["_id"],
          image: pro[0]["image"],
        });
      });
    this.setState({ confirmButton: "EDIT" });
  }

  //to clear input fields
  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  //for delete products
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .product()
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

  //for upload a product image
  onChangeHandler = (event) => {
    this.setState(
      {
        selectedFile: event.target.files[0],
        loaded: 0,
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        axios.post("/product/upload", data, {}).then((res) => {
          this.setState({ image: res.data.filename });
        });
      }
    );
  };

  //function for handle submit button in form
  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      api
        .product()
        .fetchAll()
        .then((res) => {
          const pro = res.data.filter(
            (product) =>
              product.name === this.state.name &&
              product.category === this.state.category
          );
          if (pro.length > 0 || this.state.id !== "") {
            if (pro.length === 0) {
              api
                .product()
                .update(this.state.id, this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Store"
                        content="Product Edit successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.setState(initialState);
                  this.componentDidMount();
                });
            } else if (
              (this.state.id !== "" &&
                pro[0].name === this.state.name &&
                this.state.category === pro[0].category) ||
              pro.length === 0
            ) {
              api
                .product()
                .update(this.state.id, this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Store"
                        content="Product Edit successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.setState(initialState);
                  this.componentDidMount();
                });
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Online Store"
                    content="This Product Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<ExtensionSharp />}
                  />
                ),
              });
            }
          } else {
            api
              .product()
              .create(this.state)
              .then((res) => {
                ButterToast.raise({
                  content: (
                    <Cinnamon.Crisp
                      title="Online Store"
                      content="Product Add successfully"
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

  //validate form input fields
  validate = () => {
    let nameError = "";
    let priceError = "";
    let discountError = "";
    let categoryError = "";
    let quantityError = "";
    let imageError = "";

    if (!this.state.name) {
      nameError = "Product Name Cannot Be Blank";
    }

    if (!this.state.image) {
      imageError = "Image Required!";
    }

    if (!this.state.price) {
      priceError = "Price Cannot Be Blank";
    } else if (isNaN(this.state.price)) {
      priceError = "Use only digits!";
    }

    if (!this.state.discount) {
      discountError = "Discount Cannot Be Blank";
    } else if (isNaN(this.state.discount)) {
      discountError = "Use only digits!";
    }

    if (!this.state.category) {
      categoryError = "seelect category!";
    }

    if (!this.state.quantity) {
      quantityError = "Quantity Cannot Be Blank";
    } else if (isNaN(this.state.quantity)) {
      quantityError = "Use only digits!";
    }

    if (
      nameError ||
      quantityError ||
      categoryError ||
      discountError ||
      priceError ||
      imageError
    ) {
      this.setState({
        nameError,
        quantityError,
        categoryError,
        discountError,
        priceError,
        imageError,
      });
      return false;
    } else {
      this.setState({
        nameError,
        quantityError,
        categoryError,
        discountError,
        priceError,
        imageError,
      });
    }

    return true;
  };

  render() {
    if (localStorage.getItem("userEmail")) {
      const { categories, products } = this.state;
      return (
        <div class="container">
          <br></br>
          <br></br>
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="card">
                <div class="card-header">Product</div>
                <div class="card-body">
                  {/*form for add product details*/}
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Product Name
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

                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Category
                      </label>
                      <div class="col-md-6">
                        <select
                          class="form-control"
                          name="category"
                          onChange={this.handleChange}
                          value={this.state.category}
                        >
                          <option value="">~select~</option>
                          {categories.map((category) => (
                            <option>{category.name}</option>
                          ))}
                        </select>
                        <div style={{ color: "red" }}>
                          {this.state.categoryError}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Quantity
                      </label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          name="quantity"
                          value={this.state.quantity}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.quantityError}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Price
                      </label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.priceError}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Discount
                      </label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          name="discount"
                          value={this.state.discount}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.discountError}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-form-label text-md-right">
                        Image
                      </label>
                      <div class="col-md-6">
                        <input
                          type="file"
                          class="form-control"
                          name="file"
                          onChange={this.onChangeHandler}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.imageError}
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
                  <div class="x_scroll">
                    {/*table for display product details*/}
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="tableTh">name</th>
                          <th class="tableTh">Category</th>
                          <th class="tableTh">Quantity</th>
                          <th class="tableTh">Price</th>
                          <th class="tableTh">Discount</th>
                          <th class="tableTh">Image</th>
                          <th class="tableTh">Edit</th>
                          <th class="tableTh">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr>
                            <td class="tableTh">{product.name}</td>
                            <td class="tableTh">{product.category}</td>
                            <td class="tableTh">{product.quantity}</td>
                            <td class="tableTh">{product.price}</td>
                            <td class="tableTh">{product.discount}</td>
                            <td class="tableTh">
                              <img
                                width="100px"
                                alt=""
                                src={"/" + product.image}
                                class="img-thumbnail"
                              />
                            </td>
                            <td class="tableTh">
                              <button
                                type="button"
                                onClick={() => this.onChange(product._id)}
                                class="btn btn-success"
                              >
                                Edit
                              </button>
                            </td>
                            <td class="tableTh">
                              <button
                                type="button"
                                onClick={() => this.onDelete(product._id)}
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
        </div>
      );
    }
  }
}

export default Product;
