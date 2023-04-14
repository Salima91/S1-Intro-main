
//fonction pour afficher le formulaire de connexion
function AfficherFormulaire() {

    document.getElementById("image").style.display = "none";
    document.getElementById("formulaire1").style.display="block";

}
// afficher le formulaire si le bouton est cliqué
document.getElementById("connexion").addEventListener("click", AfficherFormulaire);
//fonction pour afficher le formulaire d'inscription
function AfficherFormulaire2() {

        document.getElementById("image").style.display = "none";
        document.getElementById("formulaire2").style.display="block";

}
// afficher le formulaire si le bouton est cliqué
document.getElementById("inscription").addEventListener("click", AfficherFormulaire2);

// constructeur pour créer un objet personne
function Personne(nom,prenom,email, password,photo)
{
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.photo = photo;
}
/**
 * fonction pour creer le compte
 */
$("form").submit(function (e) {
// récupérer les données du formulaire en jquery
    const nom = $('#nom').val();
    const prenom = $('#prenom').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const photo = $('#profilphoto').val();

    // construire un objet personne
    const personne = new Personne(nom,prenom, email, password, photo);

   //stocker les données dans le local storage
localStorage.setItem("personnes", JSON.stringify(personne));
    console.log(personne);


    // Définir une variable pour indiquer si le formulaire est valide
    let isValid = true;

    // Valider le champ nom
    if (nom.value.trim() === '') {
        $("#nomErreur").text("Veuillez saisir votre nom");
       // nom.classList.add('is-invalid');
        isValid = false;
    } else {
        nom.classList.remove('is-invalid');
    }

    // Valider le champ prenom
    if (prenom.value.trim() === '') {
        prenom.classList.add('is-invalid');
        isValid = false;
    } else {
        prenom.classList.remove('is-invalid');
    }

    // Valider le champ email
    if (!isValidEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

// Valider le champ password
    if (password.value.trim() === '') {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    // Si le formulaire est valide, envoyer le formulaire
    if (isValid) {
        form.submit();
    }
});

// Fonction pour valider l'adresse email
function isValidEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}