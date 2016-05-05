/**
 * New node file
 */
var mysql = require("./mysql");
var ejs = require("ejs");
function searchUser(req,res)
{
	console.log(" :::: in search user::::");
	var searchUserQuery = "select firstName,lastName,user.email,schoolOrCompany,country,user_connections.id,user_connections.friends from user LEFT JOIN on user.email = user_connections.sentFromEmail where user.firstName='"+req.param("firstName")+"'"; 	
	mysql.fetchDataUsingConnPool(function(error,results) {
		if(error)
			{
				console.log(" in search user error");
				res.send({"result":"error"});
			}
		else if(results.length<1)
			{
				res.send({"result":"No data found"});
			}
		else
			{
				res.send({"result":results});
			}
	}, searchUserQuery);
}


exports.searchUser = searchUser;