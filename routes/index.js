const router = require('express').Router(); //Using router with express
const apiRoutes = require('./api'); //Part of routes

router.use('/api', apiRoutes); //Part of routes

router.use((req, res) => {  //Sends html code for wrong route
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router; //Exporting router