// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("index.html"));

app.use(express.static("index.js"));
// Instagram OAuth 2 setup
const credentials = {
 client: {
   id: "f6f295ce64534346aee68a5f1ca3835a", // Change this!
   secret: "c748febfd3f844c5b48004ec44b500ab", // Change this!
 },
 auth: {
   tokenHost: 'https://api.instagram.com',
   tokenPath: '/oauth/access_token'
 }
};

const oauth2 = require('simple-oauth2').create(credentials);

app.get("/inde")

app.get('/redirect', (req, res) => {
  // Generate a random state verification cookie.
  const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
  // Allow unsecure cookies on localhost.
  const secureCookie = req.get('host').indexOf('localhost:') !== 0;
  res.cookie('state', state.toString(), {maxAge: 3600000, secure: secureCookie, httpOnly: true});
  const redirectUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${req.protocol}://${req.get('host')}/instagram-callback`,
    scope: 'basic',
    state: state
  });
  res.redirect(redirectUri);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  });