const express = require('express');
const routes = require('./app/controllers/routes')

const app = express();

app.use(express.json());

const PORT = 3000;

app.use('/banco', routes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})