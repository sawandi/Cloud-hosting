require("./db.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var registerRoutes = require("./controllers/registerController");
var categoryRoutes = require("./controllers/categoryController");
var productRoutes = require("./controllers/productController");
var messageRoutes = require("./controllers/messageController");
var wishlistRoutes = require("./controllers/wishlistController");
var myitemRoutes = require("./controllers/myItemController");

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/register", registerRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/message", messageRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/myitem", myitemRoutes);
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "stack-client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server started at : 4000"));
