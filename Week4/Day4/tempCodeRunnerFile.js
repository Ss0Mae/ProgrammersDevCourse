const express = require('express');
const app = express();
const port = 1234

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('/test', function (req, res) {
    res.send("Hello Post");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})