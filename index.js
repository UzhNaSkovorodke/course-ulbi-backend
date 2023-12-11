const express = require('express');
const cors = require('cors')
const UserController = require('./controllers/userController/userController')

const PORT = 4998
const app = express()
app.use(cors())
app.use(express.json());

app.get('/users', UserController.getAllUsers);
app.post('/login/', UserController.login);
app.post('/login/:token', UserController.refresh);
app.post('/register/', UserController.registration);
app.post('/users', UserController.createUser);
app.put('/users/:id', UserController.updateUser);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})



