import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialState = {
  lists: [],
};

class myList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/myitem";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => {
        const list = json.filter((list) => {
          return (
            list.email === localStorage.getItem("userEmail") &&
            list.listId === localStorage.getItem("wishListId") &&
            list.type === "wishlist"
          );
        });
        this.setState({ lists: list });
      });
  }

  onMove(id) {
    api
      .myItem()
      .update(id, { type: "cart" })
      .then((res) => {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Online Store"
              content="Move to Cart!"
              scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              icon={<AssignmentTurnedIn />}
            />
          ),
        });
        this.componentDidMount();
      });
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

  render() {
    const { lists } = this.state;
    return (
      <div class="container">
        <br></br>
        <br></br>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">List</div>
              <div class="card-body">
                <table class="table">
                  <tbody>
                    {lists.map((list) => (
                      <tr>
                        <td class="tableTh" width="25%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + list.proImage}
                            class="img-thumbnail"
                          />
                        </td>
                        <td class="tableTh" width="60%">
                          <h3>{list.proName}</h3>
                          <br />
                          <h5>
                            Price: Rs. {list.proPrice} / Discount: Rs.{" "}
                            {list.proDiscount}
                          </h5>
                          <br />
                          <h5>
                            Total: Rs. {list.total} / Quantity:{" "}
                            {list.proQuantity}
                          </h5>
                        </td>
                        <td class="tableTh" width="15%">
                          <button
                            type="button"
                            onClick={() => this.onMove(list._id)}
                            class="btn btn-success"
                          >
                            Move To Cart
                          </button>
                          <button
                            type="button"
                            onClick={() => this.onDelete(list._id)}
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

export default myList;
