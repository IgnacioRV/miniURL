var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 5000));

app.get("/new/https://:url", (req,res)=>{
	/*
		We must add the url to the database and return a JSON with the new and old

	TODO: 

	1- Generate the number for the new url -> 2 ways: random or linear
			 random is better for security, linear is easier to "hack"
			 the umber could be stored in the db but that would add another access to the db, very expensive 
	2- Add to the database the following: 2 keys element with "new" and "old" params
	*/

	var number = Math.round(Math.random()*9000)

	var obj = {
		"old": "https://"+req.params.url,
		"new": "https://shielded-brushlands-21218.herokuapp.com/"+number
	}
	res.send(JSON.stringify(obj))
})
// TODO: The same but for http


app.get("/:short", (req,res)=>{
/*
Here we get the long url from the db and redirect to it		
db.connect (function (err, db){
	var map = db.collection("map")
	map.find( 
	{
	 "old" : {$eq : req.params.short}
	}).toString(function (documents){
		callback(documents)
	})	
})

*/
	

})

function callback(documents){
	var url = "https://"+documents;
	// redirect to url
}

app.get("/", (req, res)=>{
	/*
	TODO: Load landing page from an html file / static website 
	*/
	res.send("MAIN PAGE")
	})

	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
});

