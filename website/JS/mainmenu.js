function initiateCreation() {
    alert('Game creation initiated!');
    if (confirm('For confirmation, please press "OK" to start the creation page.')) {
        window.location.href = '/HTML/GAMECREATION.html';
    }
}

function initiateLogin() {
    alert('Login initiated!');
    if (confirm('For confirmation, please press "OK" to start the login page.')) {
        window.location.href = '/HTML/LOGIN.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    
    const createButton = document.getElementById('createButton');
    const buttonContainer = document.getElementById('buttonContainer');
    const themeToggle = document.getElementById('themeToggle');

    createButton.addEventListener('mouseover', function() {
        buttonContainer.style.maxHeight = buttonContainer.scrollHeight + 'px';
        buttonContainer.style.opacity = 1;
    });

    createButton.addEventListener('mouseout', function() {
        buttonContainer.style.maxHeight = '0';
        buttonContainer.style.opacity = 0;
    });

    createButton.addEventListener('click', function() {
        initiateCreation();
    });

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    // Adding fade-in effect for page load
    document.body.classList.add('fade-in');
});
