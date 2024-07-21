const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");
// const User = require("./models/user");`

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findById("669a8a78ca9208f88d5b49f5")
  //   .then((user) => {
  //     req.user = new User(user.name, user.email, user.cart, user._id);
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://arhamfaisal780:Arham123.@cluster0.rzdbkky.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    console.log(res);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
