// Fonction pour gérer la modification de la navigation sur mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}

// Sélection des éléments de la modal
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// Ajout des écouteurs d'événements pour ouvrir et fermer le modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Fonction pour afficher le modal`£
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer le modal
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction pour afficher un message d'erreur à côté du champ de formulaire
function afficherMessageErreur(element, message) {
  element.setAttribute("data-error", message);
  element.setAttribute("data-error-visible", message ? "true" : "false");
}

// Fonction pour gérer un champ de formulaire avec validation
function handleField(
  inputElement,
  validationFunction,
  errorMessage,
  formDataElement
) {
  let value = inputElement.value.trim();
  try {
    validationFunction(value);
    afficherMessageErreur(formDataElement, "");
  } catch (erreur) {
    console.error("Erreur:", erreur.message);
    if (erreur.message === errorMessage) {
      afficherMessageErreur(formDataElement, erreur.message);
    }
    throw erreur;
  }
  return value;
}

// Gestion du formulaire
function gererFormulaire() {
  try {
    // Validation de chaque champ du formulaire
    handleField(
      document.getElementById("first"),
      verifierChampPrenom,
      "Vous devez remplir le champ.",
      document.getElementById("first").parentNode
    );

    handleField(
      document.getElementById("last"),
      verifierChampNom,
      "Vous devez entrer 2 caractères ou plus pour le champ du nom.",
      document.getElementById("last").parentNode
    );

    handleField(
      document.getElementById("email"),
      validateEmail,
      "Vous devez entrer une adresse email valide.",
      document.getElementById("email").parentNode
    );

    handleField(
      document.getElementById("birthdate"),
      verifierChampBirthdate,
      "Vous devez entrer votre date de naissance.",
      document.getElementById("birthdate").parentNode
    );

    handleField(
      document.getElementById("quantity"),
      verifierChampQuantity,
      "Vous devez entrer un nombre.",
      document.getElementById("quantity").parentNode
    );

    // Validation de la checkbox pour la localisation
    let location = "";
    let checkboxLocation = document.querySelectorAll('input[name="location"]');
    for (let index = 0; index < checkboxLocation.length; index++) {
      if (checkboxLocation[index].checked) {
        location = checkboxLocation[index].value;
        break;
      }
    }
    handleField(
      { value: location },
      verifierCheckbox,
      "Vous devez choisir une option.",
      checkboxLocation[0].parentNode
    );

    // Validation de la checkbox pour les termes et conditions

    handleField(
      document.getElementById("checkbox1"),
      verifierCondition,
      "Vous devez vérifier que vous acceptez les termes et conditions.",
      document.getElementById("checkbox1").parentNode
    );

    return true;
  } catch (erreur) {
    return false;
  }
}

// Fonction de validation de l'adresse email
function validateEmail(email) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$"
  );
  if (!emailRegExp.test(email)) {
    throw new Error("Vous devez entrer une adresse email valide.");
  }
}

// Fonctions de validation pour les champs du formulaire
function verifierChampPrenom(prenom) {
  if (prenom === "") {
    throw new Error("Vous devez remplir le champ.");
  }
}

function verifierChampNom(nom) {
  if (nom.length < 2) {
    throw new Error(
      "Vous devez entrer 2 caractères ou plus pour le champ du nom."
    );
  }
}

function verifierChampBirthdate(birthdate) {
  if (birthdate === "") {
    throw new Error("Vous devez entrer votre date de naissance.");
  }
}

function verifierChampQuantity(quantity) {
  if (quantity === "") {
    throw new Error("Vous devez entrer un nombre.");
  }
}

function verifierCheckbox(checkbox) {
  if (checkbox === "") {
    throw new Error("Vous devez choisir une option.");
  }
}

function verifierCondition(condition) {
  if (condition.checked) {
    throw new Error(
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  }
}

// Soumission du formulaire
let form = document.querySelector("form");
let submitButton = document.querySelector("button.btn-submit");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Gestion du formulaire avant la soumission
  if (gererFormulaire()) {
    // Modification du contenu du formulaire après la soumission réussie
    form.innerHTML =
      "<p class='text-inscription'>Merci pour<br> votre inscription</p><button class='btn-submit'>Fermer</button>";
    let closeBtn = document.querySelector(".btn-submit");
    closeBtn.addEventListener("click", closeModal);
  }
});
