const router = require('express').Router(); //Require express router
const { Tag, Product, ProductTag } = require('../../models'); //Require tag, product, and producttag from models folder

// The `/api/tags` endpoint

router.get('/', (req, res) => { //Find all tags
  Tag.findAll({ //Use sequelize to find all in tag
    include: [ //Include product model through producttag
      { model: Product,  through: ProductTag, }
    ],
  })

  .then((categories) => res.json(categories)) //If successful then handle data
  .catch((err) => res.status(500).json(err)); //If error catch error and send response (Internal Server)
});

router.get('/:id', (req, res) => { //Find a single tag by id
  Tag.findOne({
    where: {
      id: req.params.id, //Finding specific tag by id
    },
    include: [ //Include product model through producttag
    { model: Product,  through: ProductTag, }
  ],
})

.then((categories) => res.json(categories)) //If successful then handle data
.catch((err) => res.status(500).json(err)); //If error catch error and send response (Internal Server)
});

router.post('/', (req, res) => { //Create a new tag
  Tag.create(req.body) // Creates new tag with data from body

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

router.put('/:id', (req, res) => {  //Update a tag by id
  Tag.update(req.body, { //Updates tag with data from body 
    where:{
      id: req.params.id  //Finding specific tag by id
    },
  })

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

router.delete('/:id', (req, res) => { //Delete a tag by id
  Tag.destroy({  //Deletes tag
    where: {
      id: req.params.id,  //Finding tag to delete by id
    }
  })

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

module.exports = router; //Exporting router
