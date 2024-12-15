const Router=require('express').Router();
const packageController=require('../Controllers/packageController')
Router.get('/packages',packageController.getAllPackages)
Router.get('/packages/:id',packageController.getSpecificPackages)
module.exports = Router;