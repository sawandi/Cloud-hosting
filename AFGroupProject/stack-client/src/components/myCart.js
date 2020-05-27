import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialState = {
  myCart: [],
};

class myCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/myitem";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => {
        const cart = json.filter((cart) => {
          return (
            cart.email === localStorage.getItem("userEmail") &&
            cart.type === "cart"
          );
        });
        this.setState({ myCart: cart });
      });
  }

  onBuy(id) {
    localStorage.setItem("cartId", id);
    window.location.href = "/payment";
  }

  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .myItem()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Remove Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  /*****Cart form **********/

  render() {
    const { myCart } = this.state;
    return (
      <div class="container">
        <br></br>
        <br></br>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">Shooping Cart</div>
              <div class="card-body">
                <table class="table">
                  <tbody>
                    {myCart.map((cart) => (
                      <tr>
                        <td class="tableTh" width="25%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + cart.proImage}
                            class="img-thumbnail"
                          />
                        </td>
                        <td class="tableTh" width="60%">
                          <h3>{cart.proName}</h3>
                          <br />
                          <h5>
                            Price: Rs. {cart.proPrice} / Discount: Rs.{" "}
                            {cart.proDiscount}
                          </h5>
                          <br />
                          <h5>
                            Total: Rs. {cart.total} / Quantity:{" "}
                            {cart.proQuantity}
                          </h5>
                        </td>
                        <td class="tableTh" width="15%">
                          <button
                            type="button"
                            onClick={() => this.onBuy(cart._id)}
                            class="btn btn-success"
                          >
                            BUY
                          </button>
                          <button
                            type="button"
                            onClick={() => this.onDelete(cart._id)}
                            class="btn btn-danger"
                          >
                            Remove
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

export default myCart;
