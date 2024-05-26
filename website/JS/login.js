document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Example validation
    if (username === "user" && password === "pass") {
        alert("Login successful!");
    } else if (username === "user" && password === "wrong") {
        alert("Invalid username or password!");
    } else if (username === "wrong" && password === "pass") {
        alert("Invalid username or password!");

    } else {
        alert("Invalid username or password!");
    }
});
