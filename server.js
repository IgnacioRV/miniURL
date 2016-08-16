var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 5000));

app.get("/new/https://:url", (req,res)=>{
/*
	We must add the url to the database and return a JSON with the new and old

*/

var obj = {
	"old": "https://"+req.params.url,
	"new": "www..."
}




res.send(JSON.stringify(obj))
})
// TODO: The same but for http



app.get("/:short", (req,res)=>{
/*
Here we get the long url from the db and redirect to it		
*/

})

app.get("/", (req, res)=>{
/*
TODO: Load landing page from an html file / static website 
*/
res.send("MAIN PAGE")
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

