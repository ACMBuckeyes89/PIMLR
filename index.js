function onSignInButtonClick() {
  // Open the Auth flow in a popup.
  window.open('/redirect', 'firebaseAuth', 'height=315,width=400');
};

var logIn = $("#logIn");

logIn.on("click", function(event) {
	event.preventDefault();

	onSignInButtonClick();
});