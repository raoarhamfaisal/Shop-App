const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("669e93d5194ad4ce3040919e")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://arhamfaisal780:Arham123.@cluster0.rzdbkky.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const newUser = new User({
            name: "Arham",
            email: "arhamfaisal780@gmail.com",
            cart: {
              items: [],
            },
          });
          newUser.save();
        }
        app.listen(3000);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res, "connected");
  })
  .catch((err) => console.log(err));
