const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('send');
const form = document.querySelector('form');
const message = document.getElementById('message-error');
const messageContent = document.querySelector('#message-error > p');


/**
 * Displays an error message in the UI.
 *
 * @param {string} msg - The error message to display.
 */
const showError = (msg) => {
    messageContent.textContent = msg;
    if (!message.contains(messageContent)) {
        messageContent.classList.add('text-red-500');
        message.appendChild(messageContent);
    }
    message.style.display = 'block';
};

/**
 * Displays a success message by updating the message content and showing it on the page.
 *
 * @param {string} msg - The success message to display.
 */
const showSucessMessage = (msg) => {
    messageContent.textContent = msg;
    if (!message.contains(messageContent)) {
         messageContent.classList.remove('text-red-500');
         message.appendChild(messageContent);
    }
    message.style.display = "block";
}


/**
 * Clears the error message from the UI by removing the message content element
 * from its parent and hiding the message container.
 *
 * Assumes `message` is the container element and `messageContent` is the element
 * displaying the error message.
 */
const clearError = () => {
    messageContent.textContent = "";
    if (message.contains(messageContent)) {
        message.removeChild(messageContent);
    }
    message.style.display = 'none';
};

/**
 * Validates the value of the name input field.
 * - Ensures the field is not empty.
 * - Checks that the name length is between 3 and 50 characters.
 * - Disallows numbers and special characters (only letters and spaces allowed).
 * - Sets appropriate ARIA attributes and displays error messages as needed.
 * @returns {boolean} Returns true if the input is valid, otherwise false.
 */
const handleTextField = () => {
    const regex = /[^a-zA-Z ]/g;
    const value = nameInput.value.trim();

    if (value === "") {
        showError("Please enter your name to continue.");
        nameInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    if (value.length < 3 || value.length > 50) {
        showError("Name must be at least 3 characters.");
        nameInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    if (value.match(regex)) {
        showError("Name cannot contain numbers or special characters.");
        nameInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    nameInput.setAttribute('aria-invalid', 'false');
    clearError();
    return true;
};

/**
 * Validates the email input field using a regular expression.
 * Displays an error message and sets ARIA attributes if the input is invalid.
 * Clears the error and updates ARIA attributes if the input is valid.
 *
 * @returns {boolean} Returns true if the email input is valid, otherwise false.
 */
const handleEmailField = () => {
    const regex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const value = emailInput.value.trim();

    if (value === "") {
        showError("Email input cannot be empty.");
        emailInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    if (!value.match(regex)) {
        showError("Please check your email.");
        emailInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    emailInput.setAttribute('aria-invalid', 'false');
    clearError();
    return true;
};


/**
 * Validates the password input field according to specified criteria:
 * - At least 8 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one digit
 * - Contains at least one special character (@$!%*?&)
 * 
 * Displays an error message and sets the 'aria-invalid' attribute if validation fails.
 * Clears the error and sets 'aria-invalid' to false if validation passes.
 *
 * @returns {boolean} Returns true if the password is valid, otherwise false.
 */
const handlePasswordField = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const value = passwordInput.value.trim();

    if (value === "") {
        showError("Please fill out the password field");
        passwordInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    if (!value.match(regex)) {
        showError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
        passwordInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    passwordInput.setAttribute('aria-invalid', 'false');
    clearError();
    return true;
};


/**
 * Handles the form submission event by validating input fields.
 * Prevents the default form submission, validates text, email, and password fields,
 * clears the input fields and error messages if all validations pass,
 * and displays a success message.
 *
 * @param {Event} e - The form submission event object.
 */
const processDataInput = (e) => {
    e.preventDefault();
    if (!handleTextField()) return;
    if (!handleEmailField()) return;
    if (!handlePasswordField()) return;

    // Only clear fields if all are valid
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    clearError();
    showSucessMessage('Form has successfully been sent.')
};

// Only add the submit event listener once
form.addEventListener('submit', processDataInput);


/**
 * 
 * Updates the input's border color and ARIA attributes based on validity:
 * - Adds a red border and sets `aria-invalid="true"` if the input is empty or invalid.
 * - Adds a gray border and sets `aria-invalid="false"` if the input is valid.
 *
 * Assumes `nameInput` is a reference to the email input DOM element.
 */
const checkNameInput = () => {
    const regex = /[^a-zA-Z ]/g;
    const value = nameInput.value.trim();

    if (value === "") {
        nameInput.classList.remove('border', 'border-gray-400');
        nameInput.classList.add('border', 'border-red-500');
        nameInput.setAttribute('aria-invalid', 'true');
    }
    else if (value.length < 3 || value.length > 50) {
        nameInput.classList.remove('border', 'border-gray-400');
        nameInput.classList.add('border', 'border-red-500');
        nameInput.setAttribute('aria-invalid', 'true');
    }
    else if (value.match(regex)) {
        nameInput.classList.remove('border', 'border-gray-400');
        nameInput.classList.add('border', 'border-red-500');
        nameInput.setAttribute('aria-invalid', 'true');
    }
    else {
        nameInput.classList.remove('border', 'border-red-500');
        nameInput.classList.add('border', 'border-gray-400');
        nameInput.setAttribute('aria-invalid', 'false');
    }
};

/**
 * Updates the input's border color and ARIA attributes based on validity:
 * - Adds a red border and sets `aria-invalid="true"` if the input is empty or invalid.
 * - Adds a gray border and sets `aria-invalid="false"` if the input is valid.
 *
 * Assumes `emailInput` is a reference to the email input DOM element.
 */
const checkEmailInput = () => {
    const regex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const value = emailInput.value.trim();

    if (value === "") {
        emailInput.classList.remove('border', 'border-gray-400');
        emailInput.classList.add('border', 'border-red-500');
        emailInput.setAttribute('aria-invalid', 'true');
    }
    else if (!value.match(regex)) {
        emailInput.classList.remove('border', 'border-gray-400');
        emailInput.classList.add('border', 'border-red-500');
        emailInput.setAttribute('aria-invalid', 'true');
    }
    else {
        emailInput.classList.remove('border', 'border-red-500');
        emailInput.classList.add('border', 'border-gray-400');
        emailInput.setAttribute('aria-invalid', 'false');
    }
};

/**
 * Updates the input's border color and ARIA attributes to reflect validity.
 * Assumes `passwordInput` is a reference to the password input DOM element.
 */
const checkPasswordInput = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const value = passwordInput.value.trim();

    if (value === "") {
        passwordInput.classList.remove('border', 'border-gray-400');
        passwordInput.classList.add('border', 'border-red-500');
        passwordInput.setAttribute('aria-invalid', 'true');
    }
    else if (!value.match(regex)) {
        passwordInput.classList.remove('border', 'border-gray-400');
        passwordInput.classList.add('border', 'border-red-500');
        passwordInput.setAttribute('aria-invalid', 'true');
    }
   else {
        passwordInput.classList.remove('border', 'border-red-500');
       passwordInput.classList.add('border', 'border-gray-400');
        passwordInput.setAttribute('aria-invalid', 'false');
   }
}

nameInput.addEventListener('input', checkNameInput);
emailInput.addEventListener('input', checkEmailInput);
passwordInput.addEventListener('input', checkPasswordInput);