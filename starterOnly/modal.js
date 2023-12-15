function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// DOM Elements

function validate() {
  // inputs
  let prenom = document.getElementById("first").value;
  console.log(prenom, "prenom");
  let nom = document.getElementById("last").value;
  console.log(nom, "nom");
  let email = document.getElementById("email").value;
  console.log(email, "email");
  let birthdate = document.getElementById("birthdate").value;
  console.log(birthdate, "birthdate");
  let quantity = document.getElementById("quantity").value;
  console.log(quantity, "quantity");

  // radio buttons
  let locationChoice = document.getElementsByName("location");
  let choice = "";
  for (let i = 0; i < locationChoice.length; i++) {
    if (locationChoice[i].checked) {
      choice = locationChoice[i].value;
      break;
    }
  }
  console.log(choice, "choice");

  // checkbox
  let checkbox1 = document.getElementById("checkbox1").checked;
  let checkbox2 = document.getElementById("checkbox2").checked;

  let checkboxSelection = [checkbox1, checkbox2];
  let checkbox = "";
  for (let i = 0; i < checkboxSelection.length; i++) {
    if (checkboxSelection[i]) {
      checkbox = checkboxSelection[i];
      break;
    }
  }
  console.log(checkbox, "checkbox");

  // Effectuer la validation
  if (
    prenom.length >= 2 &&
    nom.length >= 2 &&
    validateEmail(email) &&
    !isNaN(quantity) &&
    choice &&
    checkbox
  ) {
    alert("Formulaire valide. Soumission réussie!");
  } else {
    alert("Veuillez remplir correctement tous les champs du formulaire.");
  }
}

function validateEmail(email) {
  // Expression régulière pour la validation de l'adresse électronique
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
console.log(prenom, "prenom");
