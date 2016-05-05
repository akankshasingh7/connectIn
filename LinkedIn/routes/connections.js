/**
 * New node file
 */

var mysql = require("./mysql");
var ejs = require("ejs");

function sendInvite(req,res)
{
	var sendInviteQuery = "insert into user_connections(sentFromEmail,sentToEmail,message,friends) values('"+req.session.email+"','"+req.param("sentToEmail")+"','"+req.param("message")+"','no')";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
		{
			console.log(" error in invite");
			res.send({"result": "error"});
		}
		else
			{
			console.log(" success in invite");
			res.send({"result":"success"});
			
			}
	
	}, sendInviteQuery);

}

function inviteFriends(req,res,callback)
{
	var alreadySentQuery = "select friends from user_connections where sentFromEmail='"+req.session.email+"' AND sentToEmail='"+req.param("sentToEmail")+"'";
	mysql.fetchDataUsingConnPool(function(err,results) {
		if(err)
			{	
				console.log(" no data found in connections");
				//callback(err,results);
				res.send({"result":"error in connecting"});
			}
		else
			{
				console.log(" data found in connections");
				//callback(err,results);
				if(results.length<1)	
					{
					console.log("new connection!");	
					sendInvite(req, res);	// if not already a friend, then send invite
					
					}
				else
					{
						console.log("already connected");	// else already a connection
						res.send({"result":"alreadyFriends"});
					
					}
			}
		
	}, alreadySentQuery);
}

function acceptInvite(req,res)
{
	console.log(":: in accept invite ::");
	var acceptInviteQuery = "UPDATE user_connections SET friends='yes' WHERE id='"+req.param("id")+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log(" error in accept invite");
				res.send({"result":""});
			}
		else
			{
				console.log(" in success accept invite");
				res.send(JSON.stringify(results));
			}
	}, acceptInviteQuery);
}

function declineInvite(req,res)
{
	console.log(" :: in decline invite::");
	var declineInviteQuery = "delete from user_connections where sentToEmail = '"+ req.session.email+"' and sentFromEmail='"+req.param("sentFromEmail")+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log("error in decline invite");
				res.send({"result":"error"});
			}
		else
			{
				console.log("success in decline invite");
				res.send({"result":"success"});
			}
	}, declineInviteQuery);
}

function showInvitations(req,res)
{	
	console.log(" :: in show invitations ::");
	var showInvitationsQuery = "select u.firstName, u.lastName,u.city,u.country,a.id from (select sentFromEmail,id from user_connections where sentToEmail='"+req.session.email+"' and friends='no') a left outer join user u on a.sentFromEmail=u.email";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log("error in show invitations");
				res.send({"result":"error"});
			}
		else
			{
				console.log(" success in show invitations");
				res.send(JSON.stringify(results));
			}
	}, showInvitationsQuery);
}

function showConnections(req,res)
{	console.log(" ::: in connection show::");
	var showConnectionQuery = "select firstName,lastName,email,city,country,schoolOrCompany from user where email in (select sentToEmail from user_connections where sentFromEmail='"+req.session.email+"' and friends='yes' union select sentFromEmail from user_connections where sentToEmail='"+req.session.email+"' and  friends='yes')" ;  
	mysql.fetchData(function(err, results) {
		if(err)
			{
				res.send({"result":"error"});
			}
		else
			{
				if(results.length<1)
					{
						res.send({"result":"no connections"});
					}
				else
					{
				res.send(JSON.stringify(results));
					}
			}
		
	}, showConnectionQuery);
}
function myConnections(req,res)
{
	ejs.renderFile('./views/connection.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            
        }
        // render or error
        else {
            res.end('An error occurred');
            
            console.log("in show profile");
        }
    });
}
exports.myConnections = myConnections;
exports.inviteFriends = inviteFriends;
exports.showConnections = showConnections;
exports.showInvitations = showInvitations;
exports.acceptInvite = acceptInvite;
