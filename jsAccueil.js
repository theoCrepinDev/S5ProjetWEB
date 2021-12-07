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