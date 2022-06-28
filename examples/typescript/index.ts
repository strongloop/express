const express = require("express");

const app: import("express").Application = module.exports = express();

app.get('/', function(request, response) {
    console.log(request.url);

    response.send("Hello World");
});

app.listen(3000);

console.log('Express started on port 3000');
