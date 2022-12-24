var texto = document.getElementById("textbox");

var reconocerVoz = window.webkitSpeechRecognition;
var reconocimiento = new reconocerVoz();
reconocimiento.lang = "es-MX";

function iniciar(){
    texto.innerHTML = "";
    reconocimiento.start();
}

reconocimiento.onresult = function (evento){
    console.log(evento);
    var textoDetectado = evento.results[0][0].transcript
    texto.innerHTML = textoDetectado;
    hablar(textoDetectado);
    if(textoDetectado.toLowerCase() == "toma mi selfie"){
        Webcam.attach(camara);
        hablar("tomando selfie en 5 segundos");
        setTimeout(tomarSelfie, 5000);
    }
}

function hablar(mensaje){
    var leerEnVozAlta = window.speechSynthesis;
    var lectura = new SpeechSynthesisUtterance(mensaje);
    lectura.lang = "es-MX";
    leerEnVozAlta.speak(lectura);
}

camara = document.getElementById("camara");
Webcam.set({
    width:360,
    height:260,
    image_format: "jpeg",
    jpeg_quality: 90
});

function tomarSelfie(){
    Webcam.snap(function (data_uri){
        document.getElementById("resultado").innerHTML = "<img id='foto' src='"+data_uri+"'/>";
    });
    guardar();
}

function guardar(){
    link = document.getElementById("link");
    foto = document.getElementById("foto").src;
    link.href = foto;
    link.click();
}