const loginForm = document.querySelector('#login-form');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const forgotPasswordButton = document.querySelector('#forgot-password-button');
const loginButton = document.querySelector('#login-button');
const errorMessageContainer = document.querySelector('#error-message-container');

loginForm.addEventListener('submit', onSubmit);
forgotPasswordButton.addEventListener('click', forgotPassword)

async function onSubmit(e) {
    e.preventDefault();

    const userData = {
        email: inputEmail.value,
        password: inputPassword.value
    };

    try {
        const response = await axios.post("http://localhost:5000/login", userData);
        console.log('Login successful:', response.data);


        alert(response.data.message);
        window.location.href = '';

        clearInputs();
        errorMessageContainer.textContent = '';

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            errorMessageContainer.textContent = err.response.data.message;
        } else {
            console.log('Error during Login:', err);
        }
    }
}

function forgotPassword() {
        window.location.href = '/forgotpassword';
}

function clearInputs() {
    inputEmail.value = '';
    inputPassword.value = '';
}