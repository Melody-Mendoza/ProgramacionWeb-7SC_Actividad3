var imagenes = [];
var actual = 0;
var mensajeToast = "";

function mostrarImagen() {
    var imagen = document.getElementById("imagenPrincipal");
    var titulo = document.getElementById("titulo");
    var descripcion = document.getElementById("descripcion");

    imagen.src = imagenes[actual].imagen;
    titulo.innerHTML = imagenes[actual].titulo;
    descripcion.innerHTML = imagenes[actual].descripcion;

    actualizarIndicadores();
    actualizarMiniaturas();
}

function siguiente() {
    actual++;
    if (actual >= imagenes.length) {
        actual = 0;
    }
    mostrarImagen();
}

function anterior() {
    actual--;
    if (actual < 0) {
        actual = imagenes.length - 1;
    }
    mostrarImagen();
}

 export function crearSlider(id, lista, mensaje) {
    imagenes = lista;
    mensajeToast = mensaje;
    var slider = document.getElementById(id);
    slider.innerHTML = `
    <div class="slider">
    <button id="anterior">
        ◀
    </button>
    <img id="imagenPrincipal">
    <button id="siguiente">
        ▶
    </button>
    <h2 id="titulo"></h2>
    <p id="descripcion"></p>
    <button id="conocerMas">
       Conocer Más
    </button>
    <div id="indicadores"></div>
    <div id="miniaturas"></div>
    <div id="toast"></div>
    </div>
    `;

    crearIndicadores();
    crearMiniaturas();
    mostrarImagen();

    document.getElementById("siguiente").onclick = siguiente;
    document.getElementById("anterior").onclick = anterior;
    document.getElementById("conocerMas").onclick = function () {

        mostrarToast(
            mensajeToast + "<b>" + imagenes[actual].titulo + "</b>."
        );

    };
}

function crearIndicadores() {
    var indicadores = document.getElementById("indicadores");
    indicadores.innerHTML = "";
    for (var i = 0; i < imagenes.length; i++) {
        indicadores.innerHTML += "<span class='punto'></span>";
    }
}

function actualizarIndicadores() {
    var puntos = document.getElementsByClassName("punto");
    for (var i = 0; i < puntos.length; i++) {
        puntos[i].classList.remove("activo");
    }
    puntos[actual].classList.add("activo");
}

function cambiarImagen(numero) {
    actual = numero;
    mostrarImagen();
}

function crearMiniaturas() {
    var miniaturas = document.getElementById("miniaturas");
    miniaturas.innerHTML = "";
    for (var i = 0; i < imagenes.length; i++) {
        miniaturas.innerHTML +=
            "<img src='" + imagenes[i].imagen + "' class='miniatura' onclick='cambiarImagen(" + i + ")'>";
    }
}

function actualizarMiniaturas() {
    var miniaturas = document.getElementsByClassName("miniatura");
    for (var i = 0; i < miniaturas.length; i++) {
        miniaturas[i].classList.remove("activa");
    }
    miniaturas[actual].classList.add("activa");
}

function mostrarToast(mensaje) {
    var toast = document.getElementById("toast");
    toast.innerHTML = mensaje;
    toast.style.display = "block";
    setTimeout(function () {
        toast.style.display = "none";
    }, 3000);

}