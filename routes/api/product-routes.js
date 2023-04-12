const router = require('express').Router(); //Require express router
const { Product, Category, Tag, ProductTag } = require('../../models'); //Import product, category, tag, and producttag from models folder

// The `/api/products` endpoint

router.get('/', (req, res) => { //Get all products
  Product.findAll({ //Use sequelize to find all products
    include: [ 
      Category,
      { model: Tag, through: ProductTag, } //Including specifics
    ]
  })

  .then((categories) => res.json(categories)) //If successful then handle data
  .catch((err) => res.status(500).json(err)); //If error catch error and send response (Internal Server)
});

router.get('/:id', (req, res) => { //Get one product
  Product.findOne({
    where:{
      id: req.params.id
    },
    include: [
      Category,
      { model: Tag, through: ProductTag, } //Including specifics
    ],
  })

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

router.post('/', (req, res) => { //Create a new product
  Product.create(req.body)
    .then((product) => {
      
      if (req.body.tagIds.length) { //If there's product tags, we need to create pairings to bulk create in the ProductTag model
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      
      res.status(200).json(product); //If no product tags, just respond
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:id', (req, res) => { //Update product
  
  Product.update(req.body, { //Update product data
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } }); //Find all associated tags from ProductTag
    })
    .then((productTags) => { //Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      const newProductTags = req.body.tagIds //Create filtered list of new tag_ids
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
    
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))   //Figure out which ones to remove
        .map(({ id }) => id);

      return Promise.all([ //Run both actions
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {  //Delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id, //Deleting by specific id
    }
  })

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

module.exports = router; //Export router
