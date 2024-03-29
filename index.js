require('dotenv').config()
const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var Bot = require('./getResponse');
const PORT = process.env.PORT||'7000';

app.use(bodyParser.json());
app.use(express.json());

app.post("/", (req, res) => {
    var action = req.body.queryResult.action,
        params = req.body.queryResult.parameters;
    if (req.body.queryResult.hasOwnProperty('outputContexts')) {
        params = req.body.queryResult.outputContexts
    }

    return Bot.getResponse(action, params)
        .then(function(message) {
            res.json(message);
            console.log("\n---Request serviced---\n")
        })
        .catch((err) => {
            res.json("Oops..couldn't find anything for that. Try a mroe specific query")
        })
})
app.listen(PORT, function(){
    console.log('Your node js server is running');
});