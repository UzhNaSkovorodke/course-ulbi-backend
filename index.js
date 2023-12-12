const express = require('express');
const cors = require('cors')
const UserController = require('./controllers/userController/userController')
const TokenService = require('./controllers/userController/services/tokenService')
const UserDto = require('./controllers/userController/userDto')

const PORT = 4998
const app = express()
const user = new UserDto({email: 'sdsd', password: 'sdsds'})

app.use(cors())
app.use(express.json());
TokenService.generateTokens({...user})
app.get('/users', UserController.getAllUsers);
app.post('/login/', UserController.login);
app.post('/login/:token', UserController.refresh);
app.post('/users', UserController.registration);
app.put('/users/:id', UserController.updateUser);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})



