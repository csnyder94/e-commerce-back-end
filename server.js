const express = require('express'); //Imports express
const routes = require('./routes'); //Imports routes
const sequelize = require('./config/connection'); //Imports sequelize connection

const app = express();
const PORT = process.env.PORT || 3001; //Setting PORT using Heroku standard

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes); //Using app routes

sequelize.sync().then(() => { //Syncing sequelize models to the db, then turning on server
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
