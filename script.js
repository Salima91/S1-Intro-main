console.log("Bonjour");

function ajouter(){
    // ajout de la valeur estimée
    let item= document.getElementById("desc").value;
    // ajout de la valeur estimée
    let valeur= document.getElementById("valeur").value;
   let  nouveaup=document.createElement("p");
    nouveauValeur=document.createElement("span");
    nouveaup.innerText=item +" : ";
    nouveauValeur.innerText= valeur + "$";
    document.getElementById("maliste").append(nouveaup);
    nouveaup.append(nouveauValeur);

// modificATION DU TOTAL
    let ancienPrix=document.getElementById("total").innerText;
    let nouveauPrix= +ancienPrix + +valeur;// variable : convertir en numerique
    document.getElementById("total").innerText=nouveauPrix;


}
// creer une balise p// ecrire dans le para et ajouter le dans la liste
function annuler() {


}
document.querySelector()
document.getElementsByClassName()