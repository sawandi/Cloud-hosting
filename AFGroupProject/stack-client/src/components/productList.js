import React from "react";
import "../App.css";

const initialState = {
  products: [],
};

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/product";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => this.setState({ products: json }));
  }

  onBuy(id) {
    localStorage.setItem("itemId", id);
    window.location.href = "/viewProduct";
  }

  render() {
    const { products } = this.state;
    return (
      <div class="container">
        <br></br>
        <br></br>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">Products</div>
              <div class="card-body">
                <table class="table">
                  <tbody>
                    {products.map((product) => (
                      // table for display product details
                      <tr>
                        <td class="tableTh" width="25%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + product.image}
                            class="img-thumbnail"
                          />
                        </td>
                        <td class="tableTh" width="60%">
                          <h3>{product.name}</h3>
                          <br />
                          <h5>
                            category :{product.category} / Price: Rs.{" "}
                            {product.price}
                          </h5>
                        </td>
                        <td class="tableTh" width="15%">
                          <button
                            type="button"
                            onClick={() => this.onBuy(product._id)}
                            class="btn btn-success"
                          >
                            BUY
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

export default ProductList;
