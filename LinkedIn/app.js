
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , home = require('./routes/home')
  , profile = require('./routes/profile')
  , search = require('./routes/search')
  , connections = require('./routes/connections')
  , mysql = require('./routes/mysql')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({ secret: 'mysecretcookie',cookie:{maxAge:1800000}}));
app.use(app.router);
app.use(function(req, res, next) {
	  if (req.session && req.session.email) {
	    mysql.findUser({ email: req.session.email }, function(err, results) {
	      if (results) {
	    	 // console.log("usremal ::: "+userEmail[0]("email"));
	       //req.user = userEmail;
	        //delete req.user.password; // delete the password from the session
	    	  console.log(" user email : "+results[0]["email"]);
	        req.session.email = results[0]["email"];  //refresh the session value
	      //  res.locals.email = userEmail.email;
	      }
	      // finishing processing the middleware and run the route
	      next();
	    });
	  } else {
	    next();
	  }
	});
function requireLogin (req, res, next) {
	  if (!req.session.email) {
	    res.redirect('/signin');
	  } else {
	    next();
	  }
	};

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/getApp',profile.deleteAppointment);
app.get('/',routes.index);
app.post('/signin',requireLogin,home.afterSignIn);
app.get('/signin',home.signin);
app.get('/users', user.list);
app.post('/register',home.registerUser);
app.get('/successLogin', home.successLogin);
app.post('/createProfile', home.enterDetails);
app.get('/getStarted',home.getStarted);

app.get('/logout', function(req, res) {
		
				req.session.destroy();
				res.redirect('/');
				
	});

app.get('/myProfile',profile.showProfile);
app.get('/displayEdu',profile.displayEducation);
app.get('/displayExperience',profile.displayExperience);
app.get('/displaySummary',profile.displaySummary);
app.get('/displayExperience',profile.displayExperience);
//app.get('/search',search.searchUser);
app.post('/connect', connections.inviteFriends);
app.get('/myConnections',connections.myConnections);
app.get('/showMyConnections',connections.showConnections);
app.put('/acceptInvite',connections.acceptInvite);
app.get('/showInvites', connections.showInvitations);
app.post('/addEducation', profile.addEducation);
app.put('/editEducation',profile.editEducation);
app.post('/addExperience', profile.addExperience);
app.put('/editExperience',profile.editExperience);
app.get('/displayDetail',profile.displayDetail);
app.put('/editDetail',profile.editDetails);
app.post('/addSummary',profile.addSummary);
app.put('/editSummary',profile.editSummary);
app.post('/addSkill',profile.addSkill);
app.put('/editSkill',profile.editSkill);
app.get('/displaySkills',profile.displaySkills);
app.post('/searchMember',profile.searchMember);
app.get('/displayMembers',profile.displayMembers);
app.get('/testing', function(req, res) {
				var obj ={"hi":"val1","hi2":"val2"};
				res.send(JSON.stringify(obj));
				
	});
app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
});

app.get('/getLatLong',profile.getLatLong);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
