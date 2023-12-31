// Declare variables
var passwordInput = document.getElementById('password-input');
var passwordContainer = document.querySelector('.password-container');
var icon = document.getElementById('toggle-password');

// Setting up the title
document.title = 'Login';

// This script is toggling the bottom border of the "password-container" div to become orange
// when the user inputs a password in both the register and login form
passwordInput.addEventListener('focus', function () {
    passwordContainer.style.borderBottom = '3px solid var(--dark-orange-color)';
});

passwordInput.addEventListener('blur', function () {
    passwordContainer.style.borderBottom = '3px solid var(--white-font-color)';
});

// This function toggles the visibility of the password in both the register and login form
function togglePasswordVisibility() {

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.setAttribute('data-icon', 'mdi:eye-off');
    } else if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        icon.setAttribute('data-icon', 'mdi:eye');
    }
}