//creer une classe journaliste
class Journaliste {
    constructor(nom,description,specialite, couleur){
        this.nom = nom;
        this.description = description;
        this.specialite = specialite;
        this.couleur = couleur;

    }
}

//creer une instance de la classe journaliste
let journaliste = new Journaliste("Journaliste", "Journaliste "  , "Journaliste " , "blue " );
console.log(journaliste);
if(localStorage.getItem('nom')){
    $('#formulaire').append('bonjour '+localStorage.getItem('nom'));
}
else {
    console.log('rien trouvé');
}

/*creer une classe equipe qui contient la liste des jounalistes avec
une methode qui veifie si le jounalite est present dans l'equipe ' et
une methode qui verifie si une couleur donnee est presente dans l'equipe
 */
class Equipe {
    constructor(){
        this.listeJournalistes = [];
    }
    //verifier si le journaliste est present dans l'equipe
    estPresent(journaliste){
        return this.listeJournalistes.includes(journaliste);
    }
    //verifier si la couleur donner est presente dans l'equipe en fonction du journaliste avce la methode forEach
 //this.listeJournalistes.forEach(couleur===journaliste.couleur?true:false);
    estCouleurPresente(couleur){
        for(let journaliste of this.listeJournalistes){
            if(journaliste.couleur === couleur){
                return true;
            }
        }
        return false;
    }

}
//valider le formulaire
$(document).ready(function(){
$("#soumettre").click(function(e){
    e.preventDefault();
    console.log("click");
//creer une instance de la classe equipe
    let equipe = new Equipe();
    //recuperer les valeurs du formulaire
     $nom = $("#nom").val();
    $description = $("#description").val();
     $specialite = $("#specialite").val();
     $couleur = $("#couleur").val();
    // Récupérer la valeur de l'option sélectionnée dans le menu déroulant
    $specialite = $("#specialite option:selected").val();
    //creer une instance de la classe journaliste pour lui passer les valeurs du formulaire
     journaliste = new Journaliste($nom,$description,$specialite,$couleur);
 /*   la biographie commence par une lettre majuscule,contient un point d'exclamation et
et peut contenir plusieurs lettres
 */
    let regexBio = /^[A-Z][a-z]+!|/;

    //verifier si la bio est valide
    if(regexBio.test(journaliste.description) === true){
        console.log("la bio est valide");
    }
    else{
        //afficher le message d'erreur
        $(".invisible").removeClass("invisible");
        $valid=false;
    }
// un journaliste est embauche par specialite
 // equipe.listeJournalistes.forEach(journaliste => journaliste.specialite === $specialite)



        //ajouter le journaliste dans la liste des journalistes
        equipe.listeJournalistes.push(journaliste);
        console.log(equipe.listeJournalistes);
        //afficher le journaliste dans la liste des journalistes

        // afficher une liste avec les infos a la suite


         $("#equipe").append( ` <li class="px-5 mx-2">Nom : ${$nom} <span class="mx-5"> Description : ${$description}</span> `);
             ;

    //effacer le contenu des champs apres la validation du formulaire
    //effacer le contenu des champs
    $("#nom").val("");
    $("#description").val("");
    $("#couleur").val("#rrggbb");

    //verifier si la couleur est presente dans l'equipe


})});
