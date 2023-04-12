const router = require('express').Router(); //Require express router
const { Category, Product } = require('../../models'); //Require cateogry and product from models folder

//The `/api/categories` endpoint

router.get('/', (req, res) => { //Find all categories
  Category.findAll({ //Use sequelize to find all in category
    include: [Product], //Include product in find all
  })

  .then((categories) => res.json(categories)) //If successful then handle data
  .catch((err) => res.status(500).json(err)); //If error catch error and send response (Internal Server)
});

router.get('/:id', (req, res) => { //Find one category by ID
  Category.findOne({ //Use sequelize to find one in category
    where:{
      id: req.params.id //Searches by id parameter
    },
    include: [Product], //Include product in find one
  })

  .then((category) => res.json(category)) //If successful then handle data
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

router.post('/', (req, res) => { //Creates new category
  Category.create(req.body) //Create new category with data from body

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

router.put('/:id', (req, res) => { //Updates a category by ID
  Category.update(req.body, { //Updates category with data from body
    where:{
      id: req.params.id //Updates by id parameter
    },
  })

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

router.delete('/:id', (req, res) => { //Deletes category by ID
  Category.destroy({ //Uses category model to delete a category
    where: {
      id: req.params.id, //Deletes by id parameter
    }
  })

  .then((category) => res.status(200).json(category)) //If successful then handle data and send response (Ok Status)
  .catch((err) => res.status(400).json(err)); //If error catch error and send response (Cannot complete / client error)
});

module.exports = router; //Exports router
