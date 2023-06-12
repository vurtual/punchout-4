const { Router } = require('express');
const { Product } = require('../../data/models/Product');
const productRouter = Router();

productRouter.get('/product', async (req, res) => {
  console.log(req.query);
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const productPartial = req.query.productPartial || null;
  console.log('productPartial', productPartial);
  // let product;
  // if (productPartial !== '') {
  //   product = await find(product);
  // } else {
  //   product = await find();
  // }

  let product = await find(productPartial);

  async function find(productPartial = '') {
    console.log('product', productPartial);

    if (productPartial != null) {
      let data;
      console.log('finding some prods', productPartial);
      return await Product.find({ partCode: { $regex: productPartial } })
        .skip(skip)
        .limit(limit);
    } else {
      console.log('finding all prods');
      return await Product.find().skip(skip).limit(limit);
    }
  }
  res.json(product);
});

module.exports = { productRouter };
