var express = require('express')
var app = express()
var mongo = require('mongodb').MongoClient
var dbUrl = process.env.MONGOLAB_URI
app.set('port', (process.env.PORT || 5000));

app.get("/new/https://:url", (req,res)=>{
	console.log("ACCESSING LONG URL")
	/*
		We must add the url to the database and return a JSON with the new and old
	1- Generate the number for the new url -> 2 ways: random or linear
			 random is better for security, linear is easier to "hack"
			 the umber could be stored in the db but that would add another access to the db, very expensive 
	2- Add to the database the following: 2 keys element with "new" and "old" params
	*/

	var number = Math.round(Math.random()*90000)

	var obj = {
		"old": "https://"+req.params.url,
		"new": "https://minifyer.herokuapp.com/"+number
	}

	mongo.connect (dbUrl, function (err, db){
		if (err) throw err
		var map = db.collection('map')
		map.insert( obj, function (err, data){});
		console.log("Inserted:")
		console.log(obj)
		db.close()
	})

	res.send(JSON.stringify(obj))
})
// TODO: The same but for http

app.get("/favicon.ico", (req, res )=>{

})

app.get("/:short", (req,res)=>{
/*
Here we get the long url from the db and redirect to it	
*/	
	console.log("ACCESSING SHORT URL")
	console.log(req.params.short)
	var newstring = "https://minifyer.herokuapp.com/"+req.params.short
	mongo.connect (dbUrl, function (err, db){
		if (err) throw err
		var map = db.collection("map")

		map.find( 
		{
		 "new" : newstring
		}).toArray(function (err, documents){
			console.log(documents)
			res.redirect(documents[0].old)
		})	
		db.close()
	})
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

