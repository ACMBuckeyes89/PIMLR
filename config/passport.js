//Declaring dependencies to set up 
var express = require('express');
var passport = require('passport');
var util = require('util');
var InstagramStrategy = require('passport-instagram').Strategy;

//Declaring client ID and client secret to separate variables
var INSTAGRAM_CLIENT_ID = "f6f295ce64534346aee68a5f1ca3835a";
var INSTAGRAM_CLIENT_SECRET = "c748febfd3f844c5b48004ec44b500ab";

//Passport session set up
//Users will need to be serialized and then deserialize users out their session.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

//Using Instagram Strategy within Passport. The "Strategy" in Passport requires a 
//'verify' function, which accepts credentials and invokes a callback with a user object
passport.use(new InstagramStrategy({
	clientID: INSTAGRAM_CLIENT_ID,
	clientSecret: INSTAGRAM_CLIENT_SECRET,
	callbackURL: "http://localhost:8080/auth/instagram/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({instagramId: profile.id}, function(err, user) {
		return done(err, user);
		});
	}
));

var app = express.createServer();

//configure Express 
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: "keyboard dog"}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
	
})




















