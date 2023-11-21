const express = require('express');
const db = require("./queries");
const {getUsers, deleteUser, getUserById} = require("./controllers/userController");

const PORT = 4998
const app = express()

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.delete('/users', deleteUser);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})



