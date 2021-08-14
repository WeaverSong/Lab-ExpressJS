const express = require('express');
const path = require('path');
const fs = require('fs');
const rel = (p) => path.join(__dirname, p);
const formLocation = rel("../data/form.json");

let app = express();

app.use((request, response, next) => {
    if (request.method === "POST") fs.writeFileSync(formLocation, request.headers.body)

    console.log(request.url);
    next();
})

app.use(express.static(rel('../public/')));

app.get('/formsubmission', (request, response) => {

    let data = JSON.parse(fs.readFileSync(formLocation));

    response.send(`
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="stylesheet" href="styles.css">
            <title>Form submission page!</title>
        <head>
        <body>
            <form>
                <div class="form-group">
                    <label for="Email">Email</label>
                    <label id="Email" class="form-control">${data.Email}</label>
                </div>
                <div class="form-group">
                    <label for="Password">Password</label>
                    <label id="Password" class="form-control">${data.Password}</label>
                </div>
                <div class="form-group">
                    <a href="http://localhost:3000">Back</a>
                </div>
            </form>
        </body>
    `);
});

app.listen(3000, "localhost")