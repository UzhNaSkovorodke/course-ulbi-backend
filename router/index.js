const UserController = require("../controllers/userController/userController");
const Router = require('express').Router;
const router = new Router();

router.get('/users', UserController.getAllUsers);
router.post('/login/', UserController.login);
router.post('/login/:token', UserController.refresh);
router.post('/users', UserController.registration);
router.put('/users/:id', UserController.updateUser);

module.exports = router