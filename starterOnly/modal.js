function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

function afficherMessageErreur(element, message) {
  element.setAttribute("data-error", message);
  element.setAttribute("data-error-visible", message ? "true" : "false");
}

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

function gererFormulaire() {
  try {
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

    let checkboxCondition = document.getElementById("checkbox1");
    handleField(
      checkboxCondition,
      verifierCondition,
      "Vous devez vérifier que vous acceptez les termes et conditions.",
      checkboxCondition.parentNode
    );

    return true;
  } catch (erreur) {
    return false;
  }
}

function validateEmail(email) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$"
  );
  if (!emailRegExp.test(email)) {
    throw new Error("Vous devez entrer une adresse email valide.");
  }
}

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

  if (gererFormulaire()) {
    form.innerHTML =
      "<p>Merci pour<br> votre inscription</p><button class='btn-submit'>Fermer</button>";
    let closeBtn = document.querySelector(".btn-submit");
    closeBtn.addEventListener("click", closeModal);
  }
});
