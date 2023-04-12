const router = require('express').Router(); //Importing needed paths, models, express, etc.
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes); //Router usage paths
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router; //Exporting router