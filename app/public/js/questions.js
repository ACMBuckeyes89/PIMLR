//Capturing the form inputs
$("#subCLick").on("click", function (event) {
	even.preventDefault();

	//Validate form
	function validateForm() {
		var inputValid = true; 

		$(".cityBar").each(function() {
			if($(this).val() === "") {
				inputValid = false;
			}
		});
		return inputValid;
	}

	//If all fields are filled and object of the info submitted is created
	//Creating the object
	if (validateForm()) {
		var userData = {
			firstName: $("#oneName").val(),
			lastName: $("#twoName").val(),
			gender: $("#gender").val(),
			email: $("#mail").val(),
			password: $("#passOne").val(),
			retypePassword: $("passTwo").val(),
			birthdate: $("#bDay").val(),
			city: $("#city").val()
		};

		//AJAX call to post data to users API
		$.post("/api/users", userData)
		.done(function(data) {
			console.log("Adding new PIMLR user: " + JSON.stringify(data));
		})
	} else {
		alert("Please fill out all fields before registering!");
	}

	//Clearing the form once data has been submitted
	$("#oneName").val("");
	$("#twoName").val("");
	$("#gender").val("");
	$("#mail").val("");
	$("#passOne").val("");
	$("passTwo").val("");
	$("#bDay").val("");
	$("#city").val("");
});