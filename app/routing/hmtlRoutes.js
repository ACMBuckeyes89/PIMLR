//Declaring depedencies
//Path package is needed to get the file path for the questions.html
var path = require("path");

//ROUTING

module.exports = function (app) {
	app.get("/signup", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/questions.html"));
	});
}