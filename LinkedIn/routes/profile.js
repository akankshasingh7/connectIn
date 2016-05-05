"use strict";
/**
 * New node file
 */

var ejs = require("ejs");
var mysql = require('./mysql');

function isNull(value)
{
	if((value.length<1) || (value==null))
		{return true;}
	else
		{return false;}
}

function addEducation(req,res)
{
	if(isNull(req.param("school")))
	{
		res.send({"infoEdu":"emptyVal"});
	}
	var addUserEduQuery = "INSERT INTO user_education (school,dateFrom,dateTill,fieldOfStudy,grade,activities,description,email) VALUES('"+req.param("school")+"','"+req.param("dateFrom")+"','"+req.param("dateTill")+"','"+req.param("fieldOfStudy")+"','"+req.param("grade")+"','"+req.param("activities")+"','"+req.param("description")+"','"+req.session.email+"')";
	mysql.fetchDataUsingConnPool(function(err, results, fields) {
		if(err)
			{
				res.send({"result":"error"});
			}
		else
			{
				res.send({"result":"success"});
				console.log("added to db");
			}
		
	}, addUserEduQuery);
}

function displayEducation(req,res)
{	console.log(" ::: In display education::::");
	var result;
	console.log(" req.param is : "+req.param("email"));
	var displayEduQuery = "select * from user_education where email='"+req.session.email+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{	
				console.log(" error occured in displayEducation!!!");
				res.send({"result":"error"});
				
			}
		else{
			console.log(" success occured in displayEducation!!!");
			res.send(JSON.stringify(results));
			
		}
		
	}, displayEduQuery);
	console.log("::111:::");
	//return result;
}

function editEducation(req,res)
{
	if(isNull(req.param("school")))
		{
			res.send({"result":"school is required!"});
		}
	console.log("::: in edit education::::");
	var editEducationQuery = "UPDATE user_education SET school='"+req.param("school")+"',dateFrom='"+req.param("dateFrom")+"',dateTill='"+req.param("dateTill")+"',fieldOfStudy='"+req.param("fieldOfStudy")+"',grade='"+req.param("grade")+"',activities='"+req.param("activities")+"',description='"+req.param("description")+"' WHERE id="+req.param("id") ; 
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log("error in edit education");
				res.send({"results":"error"});
			}
		else
			{
				console.log("results are :"+results.toString());
				res.send({"results":"success"});
			}
		
	}, editEducationQuery);
}


function addExperience(req,res)
{	if((isNull(req.param("companyName")))||(isNull(req.param("title")))||(isNull(req.param("dateFrom")))||(isNull(req.param("dateTill"))))
	{
		res.send({"result":"empty values name,title,datefrom and datetill"});
	}
	console.log("::: in add experience:::");
	var addExperienceQuery = "INSERT INTO user_experience(summary,companyName,title,location,dateFrom,dateTill,description,email) values ('"+req.param("summary")+"','"+req.param("companyName")+"','"+req.param("title")+"','"+req.param("location")+"','"+req.param("dateFrom")+"','"+req.param("dateTill")+"','"+req.param("location")+"','"+req.session.email+"')";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log(": error in add experience:");
				res.send({"result":"error"});
			}
		else
			{
				console.log(" success in addition of experience");
				res.send({"result":"success"});
			}
		
	}, addExperienceQuery);
}
function displayExperience(req,res)
{	console.log("::: in display experience::::");
	//var expResults;
	var displayExpQuery = "SELECT * From user_experience where email='"+req.session.email+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log(" error occured in displayexperience!!!");
				//expResults = "error";
				res.send({"result":"error"});
			}
		else{
			console.log(" success occured in displayexperience!!!");
			//expResults = results;
			res.send(JSON.stringify(results));
		}
				
	}, displayExpQuery);
	
}
function editExperience(req,res)
{
	if(isNull(req.param("title"))||isNull(req.param("companyName")))
		{
			res.send({"result":"title and company name are required!"});
		}
	console.log("::: in edit education::::");
	var editExperienceQuery = "UPDATE user_experience SET title='"+req.param("title")+"',dateFrom='"+req.param("dateFrom")+"',dateTill='"+req.param("dateTill")+"',companyName='"+req.param("companyName")+"',location='"+req.param("location")+"',summary='"+req.param("summary")+"',description='"+req.param("description")+"' WHERE id="+req.param("id") ; 
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log("error in edit education");
				res.send({"results":"error"});
			}
		else
			{
				console.log("results are :"+results.toString());
				res.send({"results":"success"});
			}
		
	}, editExperienceQuery);
}
function displaySummary(req,res)
{
	console.log("::: in display summary :::");
	var displaySummaryQuery = "select * from user_summary where email='"+req.session.email+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				console.log(" error in display summary");
				res.send({"result":"error"});
			}
		else
			{
				console.log(" in success display summary");
				res.send(JSON.stringify(results));
			}
	}, displaySummaryQuery);
}

function addSummary(req,res)
{
var addUserQuery = "insert into user_summary(summary,email) values ('"+req.param("summary") +"','"+req.session.email+"')";
mysql.fetchDataUsingConnPool(function(err, results) {
	if(err)
		{
			console.log(" error in display summary");
			res.send({"result":"error"});
		}
	else
		{
			console.log(" in success display summary");
			res.send(JSON.stringify(results));
		}
}, addUserQuery);
}
function editSummary(req,res)
{
var editSummaryQuery = "update user_summary set summary='"+ req.param("summary")+"' where id="+req.param("id");
mysql.fetchDataUsingConnPool(function(err, results) {
	if(err)
		{
			console.log(" error in display summary");
			res.send({"result":"error"});
		}
	else
		{
			console.log(" in success display summary");
			res.send(JSON.stringify(results));
		}
}, editSummaryQuery);
}


function showProfile(req,res)
{
	ejs.renderFile('./views/profile.ejs',function(err, result) {
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

function displayMembers(req,res)
{
	ejs.renderFile('./views/searchPage.ejs',function(err, result) {
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


function displayDetail(req,res)
{
	var displayDetailsQuery = "select * from user where email='"+req.session.email+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				res.send(err);
			}
		else
			{
			res.send(JSON.stringify(results));
			
			}
		
	}, displayDetailsQuery);
}

function editDetails(req,res)
{
	var editDetailsQuery = "update user set firstName='"+ req.param("firstName")+"',lastName='"+req.param("lastName")+"',country='"+req.param("country")+"',city='"+req.param("city")+"',schoolOrCompany='"+req.param("schoolOrCompany")+"',role='"+req.param("role")+"' where id="+req.param("id");
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				res.send(err);
			}
		else
			{
			res.send(JSON.stringify(results));
			
			}
		
	}, editDetailsQuery);
}

function searchMember(req,res)
{
	var searchMemberQuery = "select firstName,lastName,city,country,schoolOrCompany from user where firstName like '%"+req.param("searchText")+"%'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				res.send(err);
			}
		else
			{
			res.send(JSON.stringify(results));
			
			}
		
	}, searchMemberQuery);
}

function displaySkills(req,res)
{
	var displaySkillsQuery = "select * from user_skills where email='"+req.session.email+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				res.send(err);
			}
		else
			{
			res.send(JSON.stringify(results));
			
			}
		
	}, displaySkillsQuery);
}
	
function editSkill(req,res)
{
	var editSkillQuery = "update user_skills set skill='"+ req.param("skill")+"' where id='"+req.param("id")+"'";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				res.send(err);
			}
		else
			{
			res.send(JSON.stringify(results));
			
			}
		
	}, editSkillQuery);
}
function addSkill(req,res)
{
	var addSkillQuery = "insert into user_skills(email,skill) values ('"+req.session.email+"','"+req.param("skill")+"')";
	mysql.fetchDataUsingConnPool(function(err, results) {
		if(err)
			{
				res.send(err);
			}
		else
			{
			res.send(JSON.stringify(results));
			
			}
		
	}, addSkillQuery);
}

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function deleteAppointment(req,res)
{
	
// create reusable transporter object using the default SMTP transport
	/*var options = {
		    service: 'gmail',
		    auth: {
		        user: 'healthnote.service',
		        pass: 'healthnote123'
		    }
		  };
	var smtpConfig = {
		    host: 'smtp.gmail.com',
		    port: 465,
		    secure: true, // use SSL
		    auth: {
		        user: 'user@gmail.com',
		        pass: 'pass'
		    }
		};*/
	var transporter = nodemailer.createTransport('smtps://healthnote.service%40gmail.com:healthnote123@smtp.gmail.com');
	//var transporter = nodemailer.createTransport(smtpTransport(options));
// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"healthnote" <healthhnote.service@gmail.com>', // sender address
    to: req.param("email"), // list of receivers
    subject: 'Test email', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    return;
});    
  
}

var arr = [
        {address:'330 crescent village circle'},
        {address:'330 crescent village circle'}
       ];
//test code
var geocoderProvider = 'google';
var httpsAdapter = 'https';
// optional 
var extra = {
    apiKey: 'AIzaSyB9U7OyoyCJCnu5D11ifwDwh77g0l6xBvM', // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
var geocoder = require('node-geocoder')(geocoderProvider, httpsAdapter, extra);
 
// Using callback 
/*geocoder.geocode('330 crescent village circle', function(err, res) {
    console.log(res);
});*/
 
// Or using Promise 

function getLatLong(req,res)
{
	console.log("getting the lat longs");
	for(var i=0 ;i<arr.length;i++)
		{
			console.log(arr[i].address);
			geocoder.geocode(arr[i].address)
			    .then(function(res) {
			        console.log(res);
			    })
			    .catch(function(err) {
			        console.log(err);
			    });

		}//end of for
}//end of function

exports.getLatLong=getLatLong;
exports.deleteAppointment = deleteAppointment; 
exports.displaySummary = displaySummary; 
exports.displayExperience = displayExperience;
exports.showProfile = showProfile;
exports.displayEducation = displayEducation;
exports.addEducation = addEducation;
exports.editEducation = editEducation;
exports.addExperience = addExperience;
exports.editExperience = editExperience;
exports.editSummary = editSummary;
exports.addSummary = addSummary;
exports.displayDetail = displayDetail;
exports.addSkill= addSkill;
exports.editSkill = editSkill;
exports.displaySkills = displaySkills;
exports.editDetails = editDetails;
exports.searchMember = searchMember;
exports.displayMembers = displayMembers;
