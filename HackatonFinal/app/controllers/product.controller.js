const db = require("../models");
const User = db.user;
const Product = db.product;

exports.addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image
  });
  
  if(!product.name || !product.price || !product.category){
    res.status(400).send({message:"So um... did you forget something?"})
    return;
  }

  product.save((err, data) => {
    if (err) {
      console.log(err)
    }
    res.send({ message: "Product was registered successfully!" });
    console.log(data)
  })
};

exports.deleteProduct = (req, res) => {
  const objId = req.body.objectId;
  console.log(objId)

  Product.deleteOne({
    where: { id: objId }
  }).then(data => {
    console.log(data)
  })
  res.send({message:"Successful delete."})
  
}

exports.productByCategory = (req, res) => {
  const filter = req.body.filter;
  console.log(filter)

  Product.find(
    { category:filter }
  ).then(data => {
    res.send(data)
  })
}

exports.sortProdByPrice = (req, res) => {

  Product.find().sort({price:1}).then(data => {
    res.send(data)
  })
  
}

exports.getProduct = (req, res) => {
  const filter = "among";

}

exports.addToCart = (req, res) => {
  const product = req.body.product
  const user = req.body.user;

  const foundProduct = Product.findById(product)  
  const foundUser = User.findById(user)

  if(!foundProduct || !foundUser) {
    console.log("Nuh uh.")
    return;

    
  }
}

