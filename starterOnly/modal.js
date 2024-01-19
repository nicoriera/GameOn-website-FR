function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
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

// FORMS

function afficherMessageErreur(element, message) {
  element.setAttribute("data-error", message);
  element.setAttribute("data-error-visible", message ? "true" : "false");
}

function gererFormulaire() {
  let inputPrenom = document.getElementById("first");
  let formDataPrenom = inputPrenom.parentNode;
  let prenom;

  let inputNom = document.getElementById("last");
  let formDataNom = inputNom.parentNode;
  let nom;

  let inputEmail = document.getElementById("email");
  let formDataEmail = inputEmail.parentNode;
  let email;

  let inputBirthdate = document.getElementById("birthdate");
  let formDataBirthdate = inputBirthdate.parentNode;
  let birthdate;

  let inputQuantity = document.getElementById("quantity");
  let formDataQuantity = inputQuantity.parentNode;
  let quantity;

  let checkboxLocation = document.querySelectorAll('input[name="location"]');
  let formDataLocation = checkboxLocation[0].parentNode;
  let location = "";
  for (let index = 0; index < checkboxLocation.length; index++) {
    if (checkboxLocation[index].checked) {
      location = checkboxLocation[index].value;
      break;
    }
  }

  let checkboxCondition = document.getElementById("checkbox1");
  let formDataCondition = checkboxCondition.parentNode;
  let checkboxConditionChecked = checkboxCondition.checked;

  try {
    prenom = inputPrenom.value.trim();
    verifierChampPrenom(prenom);
    afficherMessageErreur(formDataPrenom, "");

    nom = inputNom.value.trim();
    verifierChampNom(nom);
    afficherMessageErreur(formDataNom, "");

    email = inputEmail.value.trim();
    validateEmail(email);
    afficherMessageErreur(formDataEmail, "");

    birthdate = inputBirthdate.value.trim();
    verifierChampBirthdate(birthdate);
    afficherMessageErreur(formDataBirthdate, "");

    quantity = inputQuantity.value.trim();
    verifierChampQuantity(quantity);
    afficherMessageErreur(formDataQuantity, "");

    verifierCheckbox(location);
    afficherMessageErreur(formDataLocation, "");

    verifierCondition(checkboxConditionChecked);
    afficherMessageErreur(formDataCondition, "");
    return true;
  } catch (erreur) {
    console.error("Erreur:", erreur.message);
    switch (erreur.message) {
      case "Vous devez remplir le champ.":
        afficherMessageErreur(formDataPrenom, erreur.message);
        break;
      case "Vous devez entrer 2 caractères ou plus pour le champ du nom.":
        afficherMessageErreur(formDataNom, erreur.message);
        break;
      case "Vous devez entrer une adresse email valide.":
        afficherMessageErreur(formDataEmail, erreur.message);
        break;
      case "Vous devez entrer votre date de naissance.":
        afficherMessageErreur(formDataBirthdate, erreur.message);
        break;
      case "Vous devez entrer un nombre.":
        afficherMessageErreur(formDataQuantity, erreur.message);
        break;
      case "Vous devez choisir une option.":
        afficherMessageErreur(formDataLocation, erreur.message);
        break;
      case "Vous devez vérifier que vous acceptez les termes et conditions.":
        afficherMessageErreur(formDataCondition, erreur.message);
        break;
      default:
        break;
    }
    return false;
  }
}

// Validation

function validateEmail(email) {
  // Expression régulière pour la validation de l'adresse électronique
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$"
  );
  if (!emailRegExp.test(email)) {
    throw new Error("Vous devez entrer une adresse email valide.");
  }
}

// vérification des champs à l'envoi du formulaire

function verifierChampPrenom(prenom) {
  // Si le champ est vide, on lance une exception
  if (prenom === "") {
    throw new Error(`Vous devez remplir le champ.`);
  }
}

function verifierChampNom(nom) {
  // Si le nom a moins de deux caractères, on lance une exception
  if (nom.length < 2) {
    throw new Error(
      "Vous devez entrer 2 caractères ou plus pour le champ du nom."
    );
  }
}

function verifierChampBirthdate(birthdate) {
  // Si le birthdate est vide, on lance une exception
  if (birthdate === "") {
    throw new Error("Vous devez entrer votre date de naissance.");
  }
}

function verifierChampQuantity(quantity) {
  // Si le quantity est vide, on lance une exception
  if (quantity === "") {
    throw new Error("Vous devez entrer un nombre.");
  }
}

function verifierCheckbox(checkbox) {
  // Si la checkbox est vide, on lance une exception
  if (checkbox === "") {
    throw new Error("Vous devez choisir une option.");
  }
}

function verifierCondition(condition) {
  // Si la condition est vide, on lance une exception
  if (condition === false) {
    throw new Error(
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  }
}

let form = document.querySelector("form");
let submitButton = document.querySelector("button.btn-submit");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Si la validation réussit, changez le contenu de la modal
  if (gererFormulaire()) {
    form.innerHTML =
      "<p>Merci pour votre soumission !</p><button class='btn-submit'>Fermer</button>";
    let closeBtn = document.querySelector(".btn-submit");
    closeBtn.addEventListener("click", closeModal);
  }
});

// Vérifiaction des champs à la saisie de l'utilisateur
