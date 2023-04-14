
// récupérer la liste de tous les achats stockés dans le local storage
const achats = JSON.parse(localStorage.getItem("achats"));

// définir la fonction pour afficher la facture
function AfficherFacture(achat) {

    $('tbody').append(`
        <tr>
            <td>${achat.nom}</td>
            <td>${achat.email}</td>
            <td>${achat.password}</td>
            <td>${achat.produit}</td>
            <td>${achat.quantite}</td>
            <td>${achat.prix}</td>
        </tr>`);
    $('body').append(`
        <p>
            M. ${achat.nom}, votre achat a été enregistré avec succès.
        </p>
    `);
}

// parcourir la liste des achats et les afficher dans la facture
for (let i = 0; i < achats.length; i++) {
    AfficherFacture(achats[i]);
}

// function EnregistrerAchat(achat) {
//     // ajouter le nouvel achat à la liste des achats existants
//     achats.push(achat);
//     // sauvegarder la liste dans le local storage
//     localStorage.setItem("achats", JSON.stringify(achats));
// }
//
// // enregistrer un nouvel achat
//const nouvelAchat = { nom: "Jean", produit: "T-shirt", quantite: 2, prix: 20 };
//EnregistrerAchat(nouvelAchat);