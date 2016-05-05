var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'linkedin'
	});
	return connection;
}
var MAX_CONNECTION = 50;
var poolArr = [];

function isConnectionPoolFull()
{
	if(poolArr.length==MAX_CONNECTION)
		return true;
	else
		return false;
}
while(!isConnectionPoolFull())
{
	poolArr.push(getConnection());
	console.log("adding");
}

function createConnectionPool()
{	while(!isConnectionPoolFull())
		{
			poolArr.push(getConnection());
			console.log("adding");
		}
}

function getConnectionFromPool()
{	var newConnection;
	if(poolArr.length==0)
		{	
			console.log("pool over");
		}
		newConnection = poolArr[0];
		poolArr.splice(0, 1);
		
	return newConnection;
}

function releaseConnectionToPool()
{	console.log("releasing connection");
	poolArr.push(getConnection()); }

function fetchDataUsingConnPool(callback,sqlQuery)
{
	console.log("\nSQL Query::"+sqlQuery);
	console.log("\n in connection pool ::");
	var connection = getConnectionFromPool();
	connection.query(sqlQuery, function(err, results) {
		if(err){
			console.log("fetchDataUsingConnPool ERROR: " + err.message);
			releaseConnectionToPool();
			callback(err,results);// i added 
		}
		else 
		{	// return err or result
			console.log(" fetchDataUsingConnPool DB Results:"+results);
			releaseConnectionToPool();
			callback(err, results);
			
		}
	});
}
function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	console.log(connection);
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, rows,fields);// i added 
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			
			callback(err, rows,fields);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

function findUser(obj,callback)
{
	console.log("--in find user---"+obj.email);
	var connection= getConnectionFromPool();
	var findUserQuery = "select email from user where email= '"+obj.email+"'";
	console.log("SQL IS : "+findUserQuery);
	connection.query(findUserQuery, function(err, results) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, results);// i added 
		}
		else 
		{	// return err or result
			console.log("DB Results length:"+results.length);
			
			callback(err, results);
		}
		
	});
}

exports.findUser = findUser;
exports.fetchData=fetchData;
exports.fetchDataUsingConnPool = fetchDataUsingConnPool;