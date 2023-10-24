const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./database/db-config');

const userRouter = require('./routes/user_routes')

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${process.env.SERVER}${process.env.PORT}${req.url}  \nQuery = ${JSON.stringify(req.query)}  \nParams = ${JSON.stringify(req.params)}`);
    next();
});

app.use('/', (req, res) => {
    res.send("Working fine");
})

app.use('/memories-api/user', userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})