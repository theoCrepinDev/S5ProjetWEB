console.log()

//elements permettants de passer du mode clair eu mode sombre,
//Lorsque l'on passe en mode somnbre, en plus de charger la feuille de style originale
//on charge la feuille de style stylesDark.css qui apporte les modification nécessaires
var iconeColorChange = document.getElementById("iconeColorMode");

var stylesSheetDark = document.getElementById("stylesDark");

var actualMode = "light";

function colorChange(){
    if(actualMode === "light"){
        iconeColorChange.src = "images/iconeSoleil.png";
        stylesSheetDark.href = "stylesDark.css";
        actualMode = "dark";
    }
    else{
        iconeColorChange.src = "images/iconeModeNuit.png";
        stylesSheetDark.href = "";
        actualMode = "light";
    }
}





//Focntions permettants de gérer l'api et d'afficher les données fournies par un site 
//dans le tableau de la page Minning 2
var longueurTableau;
var nombrePages;
var pageActuelle = 1;
var emplacementPageActuelleText = document.getElementById('nombrePages');

//récupère le tableau des données fournises
function getAlbum(){
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos?_start=")
    .then((response) => response.json())
    .then(function (data) {
        console.log(data);
        for(let i = ((pageActuelle - 1) * 10); i < pageActuelle * 10; i ++){
            createAlbum(data[i]);
        }
        longueurTableau = data.length;
        console.log(longueurTableau);
        nombrePages = longueurTableau / 10;
        emplacementPageActuelleText.textContent = 'Page ' + pageActuelle + '/' + nombrePages;
        return data.length;
     })
    
}

//créée et insère une ligne de donnée dans le tableau affiché sur la page
function createAlbum(album){
    const newLine = document.createElement('tr');
    const newSubLine1 = document.createElement('td');
    const newSubLine2 = document.createElement('td');
    const newSubLine3 = document.createElement('td');
    const newSubLine4 = document.createElement('td');
    const newSubLine5 = document.createElement('td');

    newSubLine1.textContent = album.albumId;
    newSubLine2.textContent = album.id;
    newSubLine3.textContent = album.title;
    newSubLine4.textContent = album.url;
    newSubLine5.textContent = album.thumbnailUrl;

    newLine.appendChild(newSubLine1);
    newLine.appendChild(newSubLine2);
    newLine.appendChild(newSubLine3);
    newLine.appendChild(newSubLine4);
    newLine.appendChild(newSubLine5);

    const placeInDoc = document.querySelector('.albumTableBody');
    placeInDoc.appendChild(newLine);
}

getAlbum();

//supprime tous les éléments éffichés dans le tableau
function removeAll(){
    let tableauVider = document.querySelector('.albumTableBody');

    while (tableauVider.firstChild) {
        tableauVider.removeChild(tableauVider.firstChild);
    }
}

let elementNextButton = document.getElementById('previousButton');
elementNextButton.style.display = 'none';

function getPreviousPage(){
    if (pageActuelle > 1){
        showPreviousPage();
        emplacementPageActuelleText.textContent = ('Page ' + pageActuelle + '/' + nombrePages);
    }else{

    }
}

function getNextPage(){
    if (pageActuelle < nombrePages){
        showNextPage();
        emplacementPageActuelleText.textContent = ('Page ' + pageActuelle + '/' + nombrePages);
    }else{

    }
}

function showNextPage(){
    if(pageActuelle < nombrePages - 1 && pageActuelle > 1){
        removeAll();
        pageActuelle++;
        getAlbum();
    }else if(pageActuelle === nombrePages - 1){
        removeAll();
        pageActuelle++;
        getAlbum();
        let elementNextButton = document.getElementById('nextButton');
        elementNextButton.style.display = 'none';
    }else if (pageActuelle === 1){
        removeAll();
        pageActuelle++;
        getAlbum();
        let elementNextButton = document.getElementById('previousButton');
        elementNextButton.style.display = '';
    }
}

function showPreviousPage(){
    if(pageActuelle < nombrePages && pageActuelle > 2){
        removeAll();
        pageActuelle--;
        getAlbum();
    }else if(pageActuelle === nombrePages){
        removeAll();
        pageActuelle--;
        getAlbum();
        let elementNextButton = document.getElementById('nextButton');
        elementNextButton.style.display = '';
    }else if (pageActuelle === 2){
        removeAll();
        pageActuelle--;
        getAlbum();
        let elementNextButton = document.getElementById('previousButton');
        elementNextButton.style.display = 'none';
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//js pour ajout d'informations dans le tableau de la page manning
var commandeForm = document.forms['commande'];

function ajouter(){

    //on créé un nouvel élément
    var newLine = document.createElement("tr");
    var newVal2 = document.createElement("td");
    var newVal3 = document.createElement("td");

    var typeFamille = commandeForm.processeur.value;
    newVal2.textContent = commandeForm.gpu.value;
    newVal3.textContent = commandeForm.puissance.value + ' MH/s';
    newVal2.classList = 'recette_col';
    newVal3.classList = 'prix_col';

    newLine.append(newVal2);
    newLine.append(newVal3);

    if(typeFamille === "amd"){
        var tagAfter = document.getElementById('familleNvidia');
        var rowSpan = document.getElementById('colAmd');
        rowSpan.rowSpan++;
    }else{
        var tagAfter = document.getElementById('familleFin');
        var rowSpan = document.getElementById('colNvidia');
        rowSpan.rowSpan++;
    }
    
    var tbody       =      document.getElementById('bodyTableau');
    tbody.insertBefore(newLine, tagAfter);

}


const PROCESSEUR_REQUIERED = "veuillez entrer le bon processeur !";
const PUISSANCE_REQUIERED = "veuillez entrer une puissance Valide !";
const GPU_REQUIERED   = "veuillez entrer un gpu existant";


//fonctions pour récupérer les données du formulaire du calculateur et 
//pour afficher le résultat de l'opération


function calculer(){
    var calculateurForm = document.forms[0];
    //on va récupérer les informations rentrées dans le form
    console.log(document.forms['calculateur'].prixAchat.value);
    var prixAchat = calculateurForm.prixAchat.value;
    var prixVente = calculateurForm.prixVente.value;
    var qte = calculateurForm.qteEchangee.value;

    var pnl = (prixVente - prixAchat) * qte;

    var zoneAffihage = document.getElementById('resultatCalculateurTrading');
    zoneAffihage.textContent = pnl;

    if(pnl < 0){
        zoneAffihage.style.color = 'red';
    }else{
        zoneAffihage.style.color = 'green';
    }
}