const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection("products").updateOne(
        { _id: this._id },
        {
          $set: {
            title: this.title,
            description: this.description,
            imageUrl: this.imageUrl,
            price: this.price,
            userId: this.userId,
          },
        }
      );
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // static fetchAll() {
  //   const db = getDb();
  //   return db
  //     .collection("products")
  //     .find()
  //     .toArray()
  //     .then((products) => {
  //       console.log(products);
  //       return products;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new mongodb.BSON.ObjectId(productId) })
      .then((product) => {
        console.log(product, "product");
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.BSON.ObjectId(productId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
