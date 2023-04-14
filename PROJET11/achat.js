
/**
 * construit un objet achat
 * @param nom
 * @param email
 * @param password
 * @param produit
 * @param quantite
 * @param prix
 * @constructor
 */
function AchatObjet(nom, email, password, produit, quantite, prix) {
    this.nom = nom;
    this.email = email;
    this.password = password;
    this.produit = produit;
    this.quantite = quantite;
    this.prix = prix;
    // prendre la date d'aujourd'hui
    // this.date = new Date();
}

// récupérer les données d'achat du formulaire et les sauvegarder dans le local storage
function Achat() {
    // récupérer les données d'achat du formulaire
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const produit = document.getElementById('produit').value;
    const quantite = document.getElementById('quantite').value;
    const prix = document.getElementById('prix').textContent;

    // construire un objet achat
    const achat = new AchatObjet(nom, email, password, produit, quantite, prix);

    // récupérer les données d'achat stockées dans le local storage
    let achats = JSON.parse(localStorage.getItem("achats")) || [];

    // ajouter l'achat à la liste des achats
    achats.push(achat);

    // sauvegarder la liste des achats dans le local storage
    localStorage.setItem("achats", JSON.stringify(achats));

    console.log(achats);
    return true;
}



