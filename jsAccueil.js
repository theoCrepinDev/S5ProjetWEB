console.log()

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

function startTime(){
    const d = new Date();
    var hours = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    var time = "il est " + hours + ':' + min + ':' + sec;

    return time;
}





var longueurTableau;
var nombrePages;
var pageActuelle = 1;
var emplacementPageActuelleText = document.getElementById('nombrePages');

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