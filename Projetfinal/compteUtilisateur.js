//recuperer les données de l'utilisateur
function recupererUtilisateur() {
    //recuperer les données de l'utilisateur dans le local storage
    let personne = JSON.parse(localStorage.getItem("personnes"));
       //afficher les données de l'utilisateur dans la carte
    console.log(personne);
    $("#nomUtilisateur").text(personne.nom+" "+personne.prenom);
    $("#emailUtilisateur").text(personne.email);
    if(personne.photo ===""){
        $("#photoUtilisateur").attr("src","foodiesfeed.com_yellow-dolphin.jpg");
    }else{
        $("#photoUtilisateur").attr("src",personne.photo);
    }

}
//appeler la fonction recupererUtilisateur
recupererUtilisateur();
//fonction pour modifier la photo de profi de l'utilisateur
function modifierPhoto() {
    //recuperer la photo de l'utilisateur
    let photo = $("#profilphoto").val();
    //recuperer les données de l'utilisateur dans le local storage
    let personne = JSON.parse(localStorage.getItem("personnes"));
    //modifier la photo de l'utilisateur
    personne.photo = photo;
}
/**
 * fuunction qui permet de recuperer les recettes en fonction du jour choisi
 * @returns {boolean}
 */
function afficherRecette() {

  // recuperee la valeur du select
    let jourChoisi = document.getElementById("select").value;
  //  console.log(select);
    // chercher cette valeur dans le tableau des recettes dans mock api
    //recuperernd'abord les recettes
    fetch('https://6427c806161067a83b00e7a8.mockapi.io/Recettes')
        .then(response => response.json())
        .then(Recettes => {
// Parcourir chaque élément de la liste Recettes
            for (let i = 0; i < Recettes.length; i++) {
                // Si la journée correspond à celle choisie
                if (Recettes[i].jour=== jourChoisi)
                {
                    // Parcourir chaque repas de la journée
                    for (let j = 0; j < Recettes[i].meal.length; j++)
                    {
                        // Afficher le nom et la description du repas
                        let nomRepas = Recettes[i].meal[j].name;
                        let descRepas = Recettes[i].meal[j].description;

                        $("#carteRecette").append(`
    <div class="card mb-3 carteMeal mx-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${Recettes[i].meal[j].image}" id="card-imagePlat" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body" id="card-bodyPlat">
                    <h6 class="card-title h5" id="card-titlePlat">${nomRepas}</h6>
                    <p class="card-text" id="card-descPlat">${descRepas}</p>
<!--                    aider par chatgpt pour l'indexaction -->
                    <button type="button" class="btn btn-primary my-3 modifierPlat" data-id="${Recettes[i].meal[j].id}" id="" data-index="${j}">Modifier</button>
                    <button type="button" class="btn btn-primary my-3 supprimerPlat">Supprimer</button>
                    <p class="card-text"><small class="text-body-secondary">pour plus de détails</small></p>
                    <button type="button" class="btn btn-outline-danger"><i class="fa fa-heart"></i></button>
                </div>
            </div>
        </div>
        <!-- formulaire pour modifier le plat qui est caché au depart -->
        <form class="formulaireModifierPlat" style="display: none">
            <div class="form-group">
                <label for="nameplatModier">Nom du plat</label>
                <input type="text" class="form-control" id="nameplatModier" placeholder="Entrer le nom du plat">
                <label for="description">Description </label>
                <input type="text" class="form-control" id="descriptionPlatModifier" placeholder="Entrer la description du plat">
                <label for="image">Image</label>
                <input type="url" class="form-control" id="imagePlatModifier" placeholder="Entrer l'image du plat">
                <input type="number" placeholder="Entrez le id du plat a modifier" id="idPlatModifier">
                <p>faire un i pour expliquer</p>
                <button type="button" class="btn btn-primary my-3 Confirmer">Confirmer</button>
            </div>
        </form>
    </div>
`);

// Ajouter un événement de clic sur chaque bouton Modifier
                        $(".modifierPlat").click(function() {
                            // Récupérer l'identifiant du plat à partir de l'attribut data-id
                            //idée recuperee de stackoverflow qui na pas marcher pour le moment mais je vais la garder pour corriger
                      //      var platId = $(this).attr("id",Recettes[i].meal[j].id);
                            // Trouver le formulaire de modification correspondant en utilisant la méthode .closest()
                            var formulaire = $(this).closest(".carteMeal").find(".formulaireModifierPlat");
                            // Afficher le formulaire de modification correspondant
                            formulaire.show();
                        });
//Ajouter un événement de clic sur chaque bouton Confirmer
                        $(".Confirmer").click(function() {
                            // Trouver le formulaire de modification correspondant en utilisant la méthode .closest()
                             var formulaire = $(this).closest(".carteMeal").find(".formulaireModifierPlat");
                            formulaire.hide();
                            //recuperer les valeurs du formulaire
                            $nom = $("#nameplatModier").val();
                            $description = $("#descriptionPlatModifier").val();
                            $image = $("#imagePlatModifier").val();
                            idPlatModifier = parseInt($("#idPlatModifier").val());
                            console.log(idPlatModifier);
                            // verifier si l'id est un nombre
                            if (isNaN(idPlatModifier)) {
                                console.log("idPlatModifier n'est pas un nombre");
                            } else {
                                if (idPlatModifier === Recettes[i].meal[j].id) {
                                    // modifier les parametres du plat
                                    Recettes[i].meal[j].name = $nom;
                                    Recettes[i].meal[j].description = $description;
                                    Recettes[i].meal[j].image = $image;
                                    // Recettes[i].meal[j].id = idPlatModifier;
                                    // afficher les modifications dans la carte correspondante
                                    $("#card-titlePlat").text($nom);
                                    $("#card-descPlat").text($description);
                                    $("#card-imagePlat").attr("src", $image);
                                    //creer un objet plat
                                    let plat = new Plat($nom, $description, $image);
                                    //modifier le plat dans le tableau des recettes dans mock api
                                    fetch('https://6427c806161067a83b00e7a8.mockapi.io/Recettes/' + Recettes[i].meal[j].id
                                        , {
                                          //  body: JSON.stringify(plat),
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        });

                                } else {
                                    alert("le id n'est pas correcte");
                                }

                            }

                        });
                        // Ajouter un événement de clic sur le bouton Supprimer
                        $(".supprimerPlat").click(function()
                        {
                            //un message de confirmation
                            if (confirm("Voulez-vous vraiment supprimer ce plat?")) {
                                alert("Le plat a été supprimé");

                            }
                            //cache la carte du plat
                            $(this).closest(".carteMeal").hide();
                            //supprimer le plat dans le tableau des recettes dans mock api en fonction de l'id
                            fetch('https://6427c806161067a83b00e7a8.mockapi.io/Recettes/' + Recettes[i].meal[j].id
                                , {
                                    method: 'DELETE',
                                })
                                .then(function (response) {
                                    return response.json();
                                });
                        });
                }
            }
        }

    return true;
    });
}
    // creation de l'objet Plat pour ajouter des plats dans le planning
function Plat(nom, description, image)
{
    this.name = nom;
    this.description = description;
    this.image = image;
}
// afficher le formulaire pour ajouter des plats
function ajouterPlat() {
    $("#ajouterPlat")[0].style.display = "block";
}
// fonction pour confirmer l'ajout des plats et faire masquer le formulaire
function Soumettre() {
// recuperer les valeurs du formulaire
    $nom = $("#nom").val();
    $description = $("#description").val();
    $image = $("#image").val();
    // creer un objet plat
    let plat = new Plat($nom, $description, $image);
    // ajouter l'objet plat dans le tableau des plats en fonction du jour choisi
    //recuperee la valeur du select
    let jourChoisi = document.getElementById("select").value;
//  console.log(select);
    // chercher cette valeur dans le tableau des recettes dans mock api
    //recuperernd'abord les recettes
    fetch('https://6427c806161067a83b00e7a8.mockapi.io/Recettes')
        .then(response => response.json())
        .then(Recettes => {
            console.log(Recettes);
            /// Parcourir chaque élément de la liste Recettes
            for (let i = 0; i < Recettes.length; i++) {
                if (Recettes[i].jour === jourChoisi) {
                        // ajouter le plat dans le tableau des plats
                        Recettes[i].meal.push(plat);
                        // mettre à jour le tableau des plats dans le serveur
                        $.ajax('https://6427c806161067a83b00e7a8.mockapi.io/Recettes', {
                            data : JSON.stringify(Recettes[i]),
                            contentType : 'application/json',
                            type : 'POST'
                        });
                }
            }
        });
   // envoi un message de confirmation d'ajout
   alert("votre plat a été ajouté");
  //  recharger la page
   location.reload();
}