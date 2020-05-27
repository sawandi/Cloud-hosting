import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

// define variables
const initialState = {
  products: [],
  messages: [],
  comment: "",
  confirmButton: "Send",
  commentError: "",
  commentId: "",
  wishlist: [],
  wishError: "",
  wish_list: "",
  proId: "",
  proName: "",
  proPrice: "",
  proDiscount: "",
  proQuantity: "",
  proImage: "",
  quantity: "",
  type: "",
  total: "",
  quantityError: "",
};

class oneProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  onChange(id, msg) {
    this.setState({ confirmButton: "EDIT", commentId: id, comment: msg });
  }

  componentDidMount() {
    const purl = "/product";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => {
        const pro = json.filter(
          (pro) => pro._id === localStorage.getItem("itemId")
        );
        this.setState({
          products: pro,
          proId: pro[0]["_id"],
          proName: pro[0]["name"],
          proPrice: pro[0]["price"],
          proDiscount: pro[0]["discount"],
          proQuantity: pro[0]["quantity"],
          proImage: pro[0]["image"],
        });
      });
    const url = "/message";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const msg = json.filter(
          (msg) => msg.product === localStorage.getItem("itemId")
        );
        this.setState({ messages: msg });
      });
    const wurl = "/wishlist";
    fetch(wurl)
      .then((response) => response.json())
      .then((json) => {
        const wish = json.filter(
          (wish) => wish.email === localStorage.getItem("userEmail")
        );
        this.setState({ wishlist: wish });
      });
  }

  onCart() {
    if (localStorage.getItem("userEmail")) {
      if (this.state.quantity) {
        if (this.state.quantity <= this.state.proQuantity) {
          const total =
            this.state.quantity * this.state.proPrice -
            this.state.proDiscount * this.state.quantity;
          this.setState(
            {
              type: "cart",
              total: total,
              wish_list: "",
              email: localStorage.getItem("userEmail"),
            },
            () => {
              api
                .myItem()
                .create(this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Store"
                        content="Product Add Successful!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.componentDidMount();
                  this.setState(initialState);
                });
            }
          );
        } else {
          this.setState({ quantityError: "Quantity Error!" });
        }
      } else {
        this.setState({ quantityError: "Quantity Required!" });
      }
    } else {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Online Store"
            content="Please Login to the system!"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<ExtensionSharp />}
          />
        ),
      });
    }
  }

  // adding an item to the wishlist
  onWish() {
    if (this.state.wish_list) {
      if (this.state.quantity) {
        if (this.state.quantity <= this.state.proQuantity) {
          const total =
            this.state.quantity * this.state.proPrice -
            this.state.proDiscount * this.state.quantity;
          this.setState(
            {
              type: "wishlist",
              total: total,
              email: localStorage.getItem("userEmail"),
            },
            () => {
              api
                .myItem()
                .create(this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Store"
                        content="Wishlist Product Add Successful!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.componentDidMount();
                  this.setState(initialState);
                });
            }
          );
        } else {
          this.setState({ quantityError: "Quantity Error!" });
        }
      } else {
        this.setState({ quantityError: "Quantity Required!" });
      }
      this.setState({ wishError: "" });
    } else {
      this.setState({ wishError: "Plaese select" });
    }
  }

  editButton(id, msg, email) {
    if (localStorage.getItem("userEmail")) {
      if (email === localStorage.getItem("userEmail")) {
        return [
          <button
            type="button"
            onClick={() => this.onChange(id, msg)}
            class="btn btn-success"
          >
            EDIT
          </button>,
          <button
            type="button"
            onClick={() => this.onDelete(id)}
            class="btn btn-danger"
          >
            Delete
          </button>,
        ];
      }
    }
  }

  // deleting a comment given for a product
  onDelete(id) {
    if (window.confirm("Are you sure to delete comment?")) {
      api
        .message()
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

  // adding a comment for a product
  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (localStorage.getItem("userEmail")) {
        const data = {
          message: this.state.comment,
          name: localStorage.getItem("userName"),
          email: localStorage.getItem("userEmail"),
          product: localStorage.getItem("itemId"),
        };
        if (this.state.commentId) {
          api
            .message()
            .update(this.state.commentId, { message: this.state.comment })
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
              this.setState(initialState);
              this.componentDidMount();
            });
        } else {
          api
            .message()
            .create(data)
            .then((res) => {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Online Store"
                    content="comment add successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                  />
                ),
              });
              this.setState(initialState);
              this.componentDidMount();
            });
        }
      } else {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Online Store"
              content="Please Login to the system!"
              scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              icon={<ExtensionSharp />}
            />
          ),
        });
      }
    }
  };

  //validating a comment before adding it
  validate = () => {
    let commentError = "";

    if (!this.state.comment) {
      commentError = "message Cannot Be Blank";
    }

    if (commentError) {
      this.setState({ commentError });
      return false;
    } else {
      this.setState({ commentError });
    }

    return true;
  };

  //Add to cart form
  render() {
    const { products, messages, wishlist } = this.state;
    return (
      <div class="container">
        <br></br>
        <br></br>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <tbody>
                    {products.map((product) => (
                      <tr>
                        <td class="tableTh" width="35%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + product.image}
                            class="img-thumbnail"
                          />
                        </td>
                        <td class="tableTh" width="65%">
                          <h3>{product.name}</h3>
                          <br />
                          <h5>
                            category :{product.name} / Price: Rs.{" "}
                            {product.price}
                          </h5>
                          <br />
                          <h5>Discount : Rs. {product.discount}</h5>
                          <br />
                          <h5>Available Quantity : {product.quantity}</h5>
                          <br />
                          Quantity :{" "}
                          <input
                            type="text"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleChange}
                            style={{ width: "50px" }}
                          />{" "}
                          / {product.quantity}
                          <div style={{ color: "red" }}>
                            {this.state.quantityError}
                          </div>
                          <br />
                          <br />
                          <button
                            type="button"
                            onClick={() => this.onCart()}
                            class="btn btn-success"
                          >
                            Add to Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    Your Wishlist
                  </label>
                  <div class="col-md-6">
                    <select
                      class="form-control"
                      name="wish_list"
                      value={this.state.wish_list}
                      onChange={this.handleChange}
                    >
                      <option value="">~select~</option>
                      {wishlist.map((wishlist) => (
                        <option value={wishlist._id}> {wishlist.name} </option>
                      ))}
                    </select>
                    <div style={{ color: "red" }}>{this.state.wishError}</div>
                  </div>
                </div>

                <div class="col-md-4 offset-md-4">
                  <input
                    type="button"
                    class="btn btn-primary"
                    value="Add to List"
                    onClick={() => this.onWish()}
                  />
                </div>
                <hr />
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                  <div class="form-group row">
                    <label class="col-md-4 col-form-label text-md-right">
                      Your Comment
                    </label>
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleChange}
                      />
                      <div style={{ color: "red" }}>
                        {this.state.commentError}
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
                <hr />
                <table>
                  {messages.map((msg) => (
                    <tr>
                      <td width="150px">
                        <img width="100px" alt="" src="user.png" />
                      </td>
                      <td>
                        <h5>{msg.name}</h5>
                        <br />
                        <h7>{msg.message}</h7>
                      </td>
                      <td width="200px">
                        {this.editButton(msg._id, msg.message, msg.email)}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default oneProduct;
