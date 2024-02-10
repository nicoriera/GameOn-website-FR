// Function to handle navigation modification on mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}

// Selection of modal elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");

// Adding event listeners to open and close the modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Function to display the modal
function launchModal() {
  modalbg.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modalbg.style.display = "none";
  form.style.display = "block";
  // Remove the thank you message

  const thankYouMessage = document.querySelector(".text-inscription");
  if (thankYouMessage) {
    thankYouMessage.remove();
  }
  // Remove the close button
  const submitButton = document.querySelector("button.btn-submit");
  if (submitButton) {
    submitButton.remove();
  }
}

// Function to display an error message next to the form field
function displayErrorMessage(element, message) {
  element.setAttribute("data-error", message);
  element.setAttribute("data-error-visible", message ? "true" : "false");
}

// Function to handle a form field with validation
function handleField(
  inputElement,
  validationFunction,
  isCheckboxOrRadio = false
) {
  let value = isCheckboxOrRadio
    ? inputElement.checked
    : inputElement.value.trim();

  let formDataElement = inputElement.parentNode;

  try {
    validationFunction(value);

    displayErrorMessage(formDataElement, "");
  } catch (error) {
    if (error.message) {
      displayErrorMessage(formDataElement, error.message);
    }
    throw error;
  }
  return value;
}

// Form management
function manageForm() {
  try {
    const formFields = [
      { element: document.getElementById("first"), validator: checkFirstName },
      { element: document.getElementById("last"), validator: checkLastName },
      { element: document.getElementById("email"), validator: validateEmail },
      {
        element: document.getElementById("birthdate"),
        validator: checkBirthdate,
      },
      {
        element: document.getElementById("quantity"),
        validator: checkQuantity,
      },
      {
        element: document.getElementById("checkbox1"),
        validator: checkCondition,
        checkboxOrRadio: true,
      },
    ];

    formFields.forEach((field) =>
      handleField(field.element, field.validator, field.checkboxOrRadio)
    );

    // Validation of the input radio for location
    const inputRadioLocation = Array.from(
      document.querySelectorAll('input[name="location"]')
    );
    const location = inputRadioLocation.find((input) => input.checked);

    if (!location) {
      handleField(inputRadioLocation[0], checkInputRadio, true);
    } else {
      handleField(location, checkInputRadio, true);
    }

    return true;
  } catch (error) {
    return false;
  }
}

// Function to validate an email address
function validateEmail(email) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$"
  );
  if (!emailRegExp.test(email)) {
    throw new Error("Vous devez entrer une adresse email valide.");
  }
}

// Validation functions for form fields
function checkFirstName(firstName) {
  if (firstName === "") {
    throw new Error("Vous devez remplir le champ.");
  }
}

function checkLastName(lastName) {
  if (lastName.length < 2) {
    throw new Error(
      "Vous devez entrer 2 caractères ou plus pour le champ du nom."
    );
  }
}

function checkBirthdate(birthdate) {
  if (birthdate === "") {
    throw new Error("Vous devez entrer votre date de naissance.");
  }
}

function checkQuantity(quantity) {
  if (quantity === "") {
    throw new Error("Vous devez entrer un nombre.");
  }
}

function checkInputRadio(inputRadioLocation) {
  if (!inputRadioLocation) {
    throw new Error("Vous devez choisir une option.");
  }
}

function checkCondition(element) {
  if (!element) {
    throw new Error(
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  }
}

function createSuccessMessage() {
  const successMessage = document.createElement("p");
  successMessage.classList.add("text-inscription");
  successMessage.textContent = "Merci pour votre inscription !";
  return successMessage;
}

function createCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-submit");
  closeButton.textContent = "Fermer";
  closeButton.addEventListener("click", () => {
    closeModal();
  });
  return closeButton;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Handling the form before submission
  if (manageForm()) {
    // Reset the form fields
    form.reset();

    // Hide the form
    form.style.display = "none";

    // Create and display the success message
    const successMessage = createSuccessMessage();
    form.insertAdjacentElement("afterend", successMessage);

    // Create and display the close button
    const closeButton = createCloseButton();
    successMessage.insertAdjacentElement("afterend", closeButton);
  }
});
