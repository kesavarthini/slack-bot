var express = require('express');
var node_request = require('request');
var node1_request = require('request');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var os = require('os');
var fetchAction =  require('node-fetch');
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());

function fetchCoumnsFromTable(fetch_input_array){


	fetchAction(url, requestOptions)
	.then(function(response) {
		//console.log(response.json());
		console.log(response.json());
		return response.json();
	})
	.then(function(result) {
		//console.log(result);
		return result;
	})
	.catch(function(error) {
		return ('Request Failed:' + error);
	});
}

app.get('/', function(req, res) {
 res.send('Hello World!-Kesavarthini');
});
app.post('/fetch_limited_records_from_table', function(req,res){
	console.log("request..");
	var fetch_input = req.body.text;
	var fetch_input_array = [];
	if(fetch_input){
		fetch_input_array = req.body.text.split(" ");
	}
	if(!(fetch_input_array[0] && fetch_input_array[1] && fetch_input_array[2])){
		res.send("Invalid Params");
	}

	var url = "https://data.dependability70.hasura-app.io/v1/query";

	var requestOptions = {
	    "method": "POST",
	    "headers": {
	        "Content-Type": "application/json"
	    }
	};

	var query = {
	    "type": "select",
	    "args": {
	        "table": fetch_input_array[0],
	        "columns": [
	            "*"
	        ],
	        "order_by": [
	            {
	                "column": fetch_input_array[1],
	                "order": "desc"
	            }
	        ],
	        "limit": fetch_input_array[2]
	    }
	};

	requestOptions.body = JSON.stringify(query);

	fetchAction(url, requestOptions)
	.then(function(response) {
		return response.json();
	})
	.then(function(result) {
		res.json(result);
	})
	.catch(function(error) {
		res.send('Request Failed:' + error);
	});

})



app.post('/num', function(req, res) {
	if(req.body.text != "users"){
		res.send("Invalid request");
	}
	var url = "https://auth.dependability70.hasura-app.io/v1/user/info";

	// If you have the auth token saved in offline storage
	// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
	// headers = { "Authorization" : "Bearer " + authToken }
	var requestOptions = {
	    "method": "GET",
	    "headers": {
	        "Content-Type": "application/json",
	        "Authorization": "Bearer 9488b273f62ced5cd19cb3055693a7dc63c2fae1cc75bfd6"
	    }
	};

	fetchAction(url, requestOptions)
	.then(function(response) {
		return response.json();
	})
	.then(function(result) {
		console.log(result);
		res.json(result);
	})
	.catch(function(error) {
		res.send('Request Failed:' + error);
	});
});


  //Set a route /set-cookie to set cookie name and value
app.get('/set-cookie', function(req, res) {
 res.cookie('name','keshu')
 res.cookie('age',5)
 res.end('cookie is set')
});
  
  //Set a route /getcookies to Fetch the values of the cookies set
app.get('/getcookies', function(req, res) {

 res.send('cookies 1 is '+req.cookies.age + 'cookie 2 is ' +req.cookies.name)
});

   //Deny access to dotfiles
app.get('/robots.txt', function (req,res, next) {
    res.status(403).send(
         '403:Access Forbidden');
    next();
});
  //render the html content using /html route
app.get('/html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
  //Get user input in a textbox and display.
app.get('/input', function(req, res) {
    res.sendFile(path.join(__dirname + '/input.html'));
   app.post('/value', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   res.send('The entered text is '+ req.body.input_value);
   console.log(req.body.input_value);
   res.end(JSON.stringify(req.body.input_value));
});
});

app.get('/authors',function(req,res){
            var h={};
            //access the json @the given url
   node_request({
      method: 'GET', 
      url: 'https://jsonplaceholder.typicode.com/posts',
   }, function(error, response, body){
      if(!error && response.statusCode==200){
         // Prepare output in JSON format
         var parsed_response = JSON.parse(response.body);
         var count=[];

         for(var key in parsed_response) {
      //  console.log(parsed_response[key].userId);
         
         h[parsed_response[key].userId] =  h[parsed_response[key].userId] ?  h[parsed_response[key].userId]+1 :1;     
}
         }
      
     //access the second json
      node1_request({
      method: 'GET', 
      url: 'https://jsonplaceholder.typicode.com/users',
   }, function(error, response, body){
      if(!error && response.statusCode==200){
         // Prepare output in JSON format
         var new_response = JSON.parse(response.body)
         var count=[];
         for(var key in new_response) {
            res.write(os.EOL+"---------------------------------------------------")
        res.write( os.EOL+os.EOL+"User id:"+new_response[key].id + " "+new_response[key].username +" has written "+ h[parseInt(new_response[key].id)]+" posts");  
}     res.write(os.EOL+"---------------------------------------------------")
  res.end();

         } 
   })
   
});
});

app.listen(8080);