const express = require('express');
const cors = require('cors')
const errorMiddleware = require('./middlewares/error-middleware')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const PORT = 4998
const app = express()

const corsOptions = {
    credentials: true,
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders": ['Access-Control-Allow-Origin', 'Access-Control-Expose-Headers', 'user_dto']
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use('/', router)
app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})



