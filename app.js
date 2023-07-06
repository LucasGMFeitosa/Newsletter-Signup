const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {

            email_address: email,
            status: "subscribed",
            merge_fields: {
                
                FNAME: firstName,
                LNAME: lastName
            }
          }

        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4377017624";

    const options = {
        method: "post",
        auth: "rasha1:36640118a30979e7107821f88bf71feb-us21"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        
        } else {

            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000")
});


// API KEY
// 36640118a30979e7107821f88bf71feb-us21

// List ID
// 4377017624