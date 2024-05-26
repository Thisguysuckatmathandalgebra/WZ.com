document.addEventListener('DOMContentLoaded', function () {
    const logOffButton = document.getElementById('logOffButton');
    logOffButton.addEventListener('click', function () {
        // Here, you can add your log off logic, such as redirecting to the log off page,
        // clearing session/local storage, or any other necessary actions.
        window.location.href = 'logoff.html';
        alert('You have been logged off.');
    });
});
