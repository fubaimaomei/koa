const router = require('koa-router')()
const HomeController = require('./controller/home')
const multer = require('koa-multer');
const upload = multer({ dest: './uploads' }); //dest 为存储地址
const types = upload.single('avatar');
module.exports = (app) => {
  router.get('/apis', HomeController.apis)

  router.get( '/', HomeController.index )
  
  router.get('/home', HomeController.home)
  
  router.get('/home/:id/:name', HomeController.homeParams)
  
  router.get('/user', HomeController.login)
  
  router.post('/user/register', HomeController.register)

  router.get('/upload', HomeController.upload)

  router.post('/profile', types,HomeController.profile)

  router.get('/customer', HomeController.customer)

  router.get('/customer/:id', HomeController.customerById)

  router.get('/customer/name/:name', HomeController.customerByName)

  router.post('/customer', HomeController.createCustomer)

  router.put('/customer/:id', HomeController.modifyCustomer)

  router.delete('/customer/:id', HomeController.deleteCustomer)

  router.get('/customers/',HomeController.customerRegister)
  
  app.use(router.routes())
     .use(router.allowedMethods())
}