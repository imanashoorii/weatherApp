const { date } = require("assert-plus");
const request = require("request");
const express = require("express")
const app = express()

const CITY = 'Tehran';
const url = `http://api.weatherstack.com/current?access_key=de360a5e271b7cfd6795f6f4a06e80b7&query=${CITY}`;


app.get("", (req, res) => {
    request({url: url, json:true}, (err, response) => {
        if (err) {
            console.log("Unable to connect!")
            console.log(err)
        } else {
            res.send( `Now, the weather of ${CITY} is ` + response.body.current.weather_descriptions + ` and is ` + response.body.current.temperature + ' degrees');      
        }
    });
});

app.get('/about', (req, res) => {
    res.send("About Page");
});

app.get('/help', (req, res) => {
    res.send("Help Page");
});


module.exports = app;