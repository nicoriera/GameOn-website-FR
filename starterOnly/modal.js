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

function affihcerMessageErreur(message) {
  let formData = document.querySelector(".formData");
  let messageErreur = document.getElementById("messageErreur");

  if (!messageErreur) {
    messageErreur = document.createElement("span");
    messageErreur.id = "messageErreur";
    messageErreur = message;
    formData.append(messageErreur);
  }
  messageErreur.innerText = message;
}

function gererFormulaire() {
  try {
    let inputPrenom = document.getElementById("first").value.trim();
    verifierChamp(inputPrenom);

    let inputNom = document.getElementById("last").value.trim();
    verifierChampNom(inputNom);

    let inputEmail = document.getElementById("email").value.trim();
    validateEmail(inputEmail);

    let inputBirthdate = document.getElementById("birthdate").value.trim();
    verifierChampBirthdate(inputBirthdate);

    let inputQuantity = document.getElementById("quantity").value.trim();
    verifierChamp(inputQuantity);

    let checkboxLocation = document.querySelectorAll('input[name="location"]');
    let location = "";
    for (let index = 0; index < checkboxLocation.length; index++) {
      if (checkboxLocation[index].checked) {
        location = checkboxLocation[index].value;
        break;
      }
    }
    verifierCheckbox(location);
    affihcerMessageErreur("");

    let checkboxCondition = document.getElementById("checkbox1").checked;
    verifierCondition(checkboxCondition);
  } catch (erreur) {
    affihcerMessageErreur(erreur.message);
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

function verifierChamp(champ) {
  // Si le champ est vide, on lance une exception
  if (champ === "") {
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
  if (birthdate === "jj/mm/aaaa") {
    throw new Error("Vous devez entrer votre date de naissance.");
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

form.addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    gererFormulaire();
  } catch (error) {
    console.log(error);
  }
});

// Vérifiaction des champs à la saisie de l'utilisateur
