const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
const ObjectId = mongodb.ObjectId;
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addToCart(product) {
    const existingCartProductIndex =
      this.cart &&
      this.cart.items.findIndex((cp) => {
        console.log("productId", cp.productId, product._id);
        return cp.productId.toString() === product._id.toString();
      });
    let newQuantity = 1;
    let updateCartItems =
      this.cart && this.cart.items.length > 0 ? [...this.cart.items] : [];

    if (existingCartProductIndex >= 0) {
      newQuantity = updateCartItems[existingCartProductIndex].quantity + 1;
      updateCartItems[existingCartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({ productId: product._id, quantity: newQuantity });
    }
    const db = getDb();
    const updatedCart = { items: updateCartItems };
    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: { cart: updatedCart },
      }
    );
  }

  getCart() {
    const db = getDb();
    const cartItems = [...this.cart.items];
    const productIds = cartItems.map((p) => {
      return p.productId;
    });

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        console.log(products, "products", productIds);
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === product._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteCartItem(prodId) {
    const cartItems = [...this.cart.items];
    const updateCartItems = cartItems.filter((item) => {
      return item.productId.toString() !== prodId.toString();
    });

    const db = getDb();
    const updatedCart = { items: updateCartItems };
    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: { cart: updatedCart },
      }
    );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray()
      .then((orders) => {
        return orders;
      });
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
