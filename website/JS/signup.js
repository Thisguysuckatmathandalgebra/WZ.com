document.getElementById("signup-form").addEventListener("submit", function(event){
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // Example validation and submission
    if(fullname && email && password) {
        alert("Sign up successful!");
        // Redirect or do something else
    } else {
        alert("Please fill in all fields.");
    }
});
