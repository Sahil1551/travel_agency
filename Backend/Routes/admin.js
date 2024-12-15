const Router=require('express').Router();
const adminController=require('../Controllers/adminController')
Router.post('/packages',adminController.postPackages)
Router.put('/packages/:id',adminController.PackagesUpdate)
Router.delete('/packages/:id',adminController.PackagesDelete)

module.exports = Router;