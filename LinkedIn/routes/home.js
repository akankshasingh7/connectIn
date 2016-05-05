/**
 * New node file
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var password = require('password-hash-and-salt');

function checkForNull(value)
{
	if((value==undefined)|| (value.length<1)||(value==null))
		return true;
}
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function validateYear(year)
{
	var text = /^[0-9]+$/;
	if ((year.length<4) && (!text.test(year))) 
		return false;
}
function validatePassword(pswd)
{
	if(pswd.length<6)
		return false;
}

function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function afterSignIn(req,res)
{
	// check user already exists
	var getUser="select * from user where email='"+req.param("email")+"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchDataUsingConnPool(function(err,results,fields) {
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				if(req.session.email)
				{	
					//req.session.email = req.param('email');
					console.log(req.session.email);
				}
			else
				{
			//var old = req.session.email;
			  req.session.email = req.param('email');
			  console.log(" new :"+req.session.email);
				}
				
				/*
				 * *******
				 * code to get the last logged in time of a user starts here
				 * */
				var getLastLoggedInQuery = "select lastLoggedIn from user where email='"+req.session.email+"'"; 
				mysql.fetchDataUsingConnPool(function(err, results) {
					if(err)
						{
						 res.send({"result" :" error"});
						}
					else
						{
						req.session.lastLoggedIn = results[0]["lastLoggedIn"];
						console.log(" last logged in is : "+req.session.lastLoggedIn);
						res.send({"result":"timeUpdated "});
						}
				}, getLastLoggedInQuery);
				
				/*
				 * **********  code to show last logged in ends here **************
				 * */
				
				var setLastLoggedQuery = "update user set lastLoggedIn='"+new Date()+"' where email='"+req.session.email+"'";
				mysql.fetchDataUsingConnPool(function(err, results) {
					if(err)
						{
						 res.send({"result" :" error"});
						}
					else
						{
						console.log(" time updated");
						res.send({"result":"timeUpdated "});
						}
				}, setLastLoggedQuery);
				
				res.send({"login":"Success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	},getUser);
}
function registerUser(req,res)
{
	if(checkForNull(req.param("firstName"))||checkForNull(req.param("lastName"))||checkForNull(req.param("email"))||checkForNull(req.param("password")))
	{
		res.send({"validate":"empty"}); //to display that the values are null
	}
if(!validateEmail(req.param("email")))
	{
		res.send({"validate":"invalidEmail"});
	}
if(!validatePassword(req.param("password")))
	{
		res.send({"validate":"invalidPassword"});
	}
/*var myuser = [];

//Creating hash and salt 
password(req.param("password")).hash(function(error, hash) {
 if(error)
     throw new Error('Something went wrong!');

 // Store hash (incl. algorithm, iterations, and salt) 
 myuser.hash = hash;

 // Verifying a hash 
 password('hack').verifyAgainst(myuser.hash, function(error, verified) {
     if(error)
         throw new Error('Something went wrong!');
     if(!verified) {
         console.log("Don't try! We got you!");
     } else {
         console.log("The secret is...");
     }
 });
});*/
//console.log(myuser.hash);

var insertUser = "INSERT INTO user(firstName, lastName, email, password,lastLoggedIn) VALUES ('"+req.param("firstName")+"', '"+req.param("lastName")+"', '"+req.param("email")+"', '"+req.param("password")+"','"+new Date()+"')";
//console.log(checkForNull(req.param("firstName")));
mysql.fetchDataUsingConnPool(function(err, results, fields) {
	if(err){
		console.log("here is the error : "+err);
		res.send({"register":"userAlreadyExists"});
		//throw err;
		
	}
	else
		{
		
			 console.log("results are :"+results);
			  //res.send({"login":"Success"});
			 if(!req.session.email)
			{
			 req.session.email = req.param('email');
			 console.log("email is session is :"+req.session.email);
			}
			  res.send({"register":"Success"});
		
		}
	
	
}, insertUser);
}

function getStarted(req,res)
{
	ejs.renderFile('./views/gettingStarted.ejs',function(err, result) {
        // render on success
        if (!err) {
        	console.log(" req.session is :"+req.session.email);
            res.send(result);
        }
        // render or error
        else {
            res.end(err);
            console.log(err);
        }
    });
}

function enterDetails(req,res)
{
	console.log("i m in enter details "+req.session.email);
		
		var insertUserDetail = "UPDATE user set country='"+req.param("country")+"',city='"+req.param("city") +"',schoolOrCompany='"+req.param("schoolOrCompany") +"',role='"+req.param("role")+"',lastLoggedIn='"+new Date()+"' where email='" + req.session.email+"'";
		mysql.fetchData(function(err, results, fields) {
			if(err){
				console.log(err);
				res.redirect('/');
				//throw err;
				
			}
			else
				{
				if(results)
					{
					 console.log("results are :"+results);
					 res.send({"result":"Success"});
					}
				else
					{
					console.log(" error in insert");
					res.send({"result":"Fail"});
					}
				
				}
			
			
		}, insertUserDetail);
		
}
function successLogin(req,res)
{
	ejs.renderFile('./views/successLogin.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}


function failLogin(req,res)
{
	ejs.renderFile('./views/failLogin.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}


function display(req,res)
{
	// check user already exists
	var getUser="select * from user";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results,fields){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				i=0;
				while (i < results.length){
					temp=''; // an empty string for generic output
					c=1; // a counter to tell when we are at the end of a record
					for (f in fields){
					temp += results[i][fields[f].name]; // here is where the magic happens
					if (c == fields.length){temp+='\n';}// input a new line after the last column
					else {temp+=' ';}// input a space after all other columns
					c++; // increment our counter
					}
					console.log(temp); // spit out the generic output string
					i++; // go to the next row
					}
				
				console.log("valid Login");
				
				//res.redirect('/successSignIn');
				res.send({"login":"Success","data":results});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	},getUser);
}


exports.signin = signin;
exports.display =display;
exports.afterSignIn=afterSignIn;
exports.successLogin=successLogin;
exports.failLogin=failLogin;
exports.registerUser = registerUser;
exports.getStarted = getStarted;
exports.enterDetails = enterDetails;