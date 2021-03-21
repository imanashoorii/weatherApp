const { date } = require("assert-plus");
const request = require("request");
const express = require("express")
const path = require('path')
const hbs = require('hbs')
const app = express()

// Paths for express config
const publicDirectoryPath = path.join(__dirname, ("./public"));
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Serve Static Files for express
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine & views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Iman Ashoori",
    })
})

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/help', (req, res) => {
    res.render("help");
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you did not provide a city"
        })
    }
    const url = `http://api.weatherstack.com/current?access_key=de360a5e271b7cfd6795f6f4a06e80b7&query=${req.query.search}`;
    request({url: url, json:true}, (err, response) => {
        if (err) {
            console.log("Unable to connect!")
            return res.send({
                error: "Unable to connect"
            })
        } else {
            res.send( {
                result: `Now, the weather of ${req.query.search} is ` + response.body.current.weather_descriptions + ` and is ` + response.body.current.temperature + ' degrees'});      
        }
    });

})

app.get('*', (req, res) => {
    res.render('404_page', {
        message: "404 Not found"
    })
})

module.exports = app;