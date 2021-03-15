const { date } = require("assert-plus");
const request = require("request");
const express = require("express")
const path = require('path')
const app = express()

const CITY = 'Tehran';
const url = `http://api.weatherstack.com/current?access_key=de360a5e271b7cfd6795f6f4a06e80b7&query=${CITY}`;

// Paths for express config
const publicDirectoryPath = path.join(__dirname, ("./public"))
const viewsPath = path.join(__dirname, './templates')

// Serve Static Files for express
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine & views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Iman Ashoori",
    })
})

// app.get("", (req, res) => {
//     request({url: url, json:true}, (err, response) => {
//         if (err) {
//             console.log("Unable to connect!")
//             console.log(err)
//         } else {
//             res.send( `Now, the weather of ${CITY} is ` + response.body.current.weather_descriptions + ` and is ` + response.body.current.temperature + ' degrees');      
//         }
//     });
// });

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/help', (req, res) => {
    res.render("help");
});

module.exports = app;