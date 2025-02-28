let intentos = 0;
const intentosMaximos = 3;
let categoriaPistaActiva = null;

const pistaMensajes = {
    "estructuras": "¡Una pista! Las estructuras de control definen cómo se va a ejectuar el código.",
    "datos": "¡Una pista! Los tipos de datos nos indican los diferentes valores que podemos almacenar.",
    "paradigmas": "¡Una pista! Los paradigmas de programación representan distintas maneras de resolver un problema.",
    "errores": "¡Una pista! Los errores y depuración nos ayudan a encontrar y corregir problemas dentro del código."
};

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, categoria) {
    event.preventDefault();
    let tarjetaId = event.dataTransfer.getData("text");
    let tarjeta = document.getElementById(tarjetaId);
    let categoriaElement = document.getElementById(categoria);
    intentos++;
    document.getElementById("intentos").textContent = intentos;
    if (tarjeta.dataset.categoria === categoria) {
        categoriaElement.appendChild(tarjeta);
        tarjeta.classList.add("correcto");
        setTimeout(() => tarjeta.classList.remove("correcto"), 1000);

        if (verificarFinDelJuego()) {
            return;
        }
        setTimeout(() => mostrarMensaje("¡Correcto!", "success"), 300);
        eliminarPista();
    } else {
        
        mostrarMensaje("¡Probá de nuevo!", "error");

        if (categoriaPistaActiva && categoriaPistaActiva !== categoria) {
            eliminarPista();
        }

        if (intentos % intentosMaximos === 0) {
            mostrarPista(categoria);
        }
    }
}

function mostrarFelicitaciones() {
    let mensajeBox = document.createElement("div");
    mensajeBox.className = "mensaje felicitacion";
    mensajeBox.innerHTML = `¡Excelente! Clasificaste correctamente todos los elementos
    <br>
    <button id="btnReintentar">Volver a jugar</button>`;

    document.body.appendChild(mensajeBox);

    document.getElementById("btnReintentar").addEventListener("click", reiniciarJuego);
}

function verificarFinDelJuego() {
    let todasCorrectas = true;

    document.querySelectorAll(".tarjeta").forEach(tarjeta => {
        let parentcategoria = tarjeta.parentElement;
        let expectedcategoria = tarjeta.dataset.categoria;

        if (!parentcategoria.classList.contains("categoria") || parentcategoria.id !== expectedcategoria) {
            todasCorrectas = false;
        }
    });

    if (todasCorrectas) {
        mostrarFelicitaciones();
        return true;
    }
    return false;
}

function mostrarMensaje(mensaje, tipo) {
    let mensajeBox = document.createElement("div");
    mensajeBox.className = `mensaje ${tipo}`;
    mensajeBox.textContent = mensaje;
    document.body.appendChild(mensajeBox);
    
    setTimeout(() => {
        mensajeBox.remove();
    }, 2000);
}

function mostrarPista(categoria) {
    let pistaBox = document.getElementById("pistaContainer");

    if (categoriaPistaActiva === categoria) return;

    pistaBox.textContent = pistaMensajes[categoria] || "Pista no disponible.";
    pistaBox.style.display = "block";
    categoriaPistaActiva = categoria;
}

function eliminarPista() {
    let pistaBox = document.getElementById("pistaContainer");
    pistaBox.style.display = "none";
    categoriaPistaActiva = null;
}

function reiniciarJuego() {
    // Obtenemos el contenedor de tarjetas por su ID
    let contenedorOriginal = document.getElementById("tarjetasContainer");

    // Reubicar todas las tarjetas en el contenedor original
    document.querySelectorAll(".tarjeta").forEach(tarjeta => {
        contenedorOriginal.appendChild(tarjeta);
    });

    // Reiniciamos el contador de intentos
    intentos = 0;
    document.getElementById("intentos").textContent = intentos;

    // Eliminamos el mensaje final si existe
    let mensajeFinal = document.querySelector(".mensaje.felicitacion");
    if (mensajeFinal) mensajeFinal.remove();
}

