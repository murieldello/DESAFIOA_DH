let intentos = 0;
const intentosMaximos = 3;
let categoriaPistaActiva = null;

const pistaMensajes = {
    "estructuras": "Pista! Las estructuras de control definen cómo se va a ejectuar el código.",
    "datos": "¡Pista! Los tipos de datos nos indican los diferentes valores que podemos almacenar.",
    "paradigmas": "¡Pista! Los paradigmas de programación representan distintas maneras de resolver un problema.",
    "errores": "¡Pista! Los errores y depuración nos ayudan a encontrar y corregir problemas dentro del código."
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
      requestAnimationFrame(() => {
        tarjeta.style.opacity = "0"; 
        setTimeout(() => {
          categoriaElement.appendChild(tarjeta);
          tarjeta.style.opacity = "1"; 
          tarjeta.style.margin = "5px auto"; 
  
          ajustarMarginPorElementos();
  
          
          if (verificarFinDelJuego()) {
            return; 
          }
          
          setTimeout(() => mostrarMensaje("¡Correcto!", "success"), 300);
        }, 10);
      });
  
      tarjeta.classList.add("correcto");
      setTimeout(() => tarjeta.classList.remove("correcto"), 1000);
  
      eliminarPista();
    } else {
      mostrarMensaje("¡Probá de nuevo!", "error");
  
      if (categoriaPistaActiva && categoriaPistaActiva !== categoria) {
        eliminarPista();
      }
  
      if (intentos % intentosMaximos === 0) {
        mostrarPista(categoria);
      }
      
      ajustarMarginPorElementos();
    }
  }
  



function ajustarMarginPorElementos() {
    const categorias = document.querySelectorAll('.categoria');
    let hayAlMenosDos = false;
    let hayAlMenosCuatro = false;
    let pistaBox = document.getElementById("pistaContainer");
    let contenedor = document.querySelector('.container');
    let contenedorOriginal = document.getElementById("tarjetasContainer");
    let instrucciones = document.getElementById("instrucciones");
  
    
    categorias.forEach(categoria => {
      const tarjetas = categoria.querySelectorAll('.tarjeta').length;
      if (tarjetas >= 2) hayAlMenosDos = true;
      if (tarjetas >= 4) hayAlMenosCuatro = true;
    });
  
    if (pistaBox.style.display === "block") {
      if (hayAlMenosCuatro) {
        contenedor.style.marginBottom = "0rem";
        instrucciones.style.marginTop = "0rem";
        instrucciones.style.marginBottom = "0rem";
      } else {
        contenedor.style.marginBottom = "2rem";
        instrucciones.style.marginTop = "2rem";
      }
    } else {
      if (hayAlMenosCuatro) {
        contenedor.style.marginBottom = "0";
        contenedor.style.marginTop = "0";
        contenedorOriginal.style.marginTop = "0";
        instrucciones.style.marginTop = "0";
        instrucciones.style.marginBottom = "0";
      } else if (hayAlMenosDos) {
        contenedor.style.marginBottom = "2rem";
        instrucciones.style.marginTop = "2rem";
      } else {
        contenedor.style.marginBottom = "7rem";
      }
    }
  }
  


function mostrarPista(categoria) {
    let pistaBox = document.getElementById("pistaContainer");

    if (categoriaPistaActiva === categoria) return;

    pistaBox.textContent = pistaMensajes[categoria] || "Pista no disponible.";
    pistaBox.style.display = "block";
    categoriaPistaActiva = categoria;

    
    ajustarMarginPorElementos();
}


function eliminarPista() {
    let pistaBox = document.getElementById("pistaContainer");
    pistaBox.style.display = "none";
    categoriaPistaActiva = null;

    
    ajustarMarginPorElementos();
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


function reiniciarJuego() {
    eliminarPista(); 
  
    
    let tarjetasContainer = document.getElementById("tarjetasContainer");
    let tarjetas = Array.from(document.querySelectorAll(".tarjeta"));
  
    
    tarjetas.sort(() => Math.random() - 0.5);
  
    
    tarjetas.forEach(tarjeta => tarjetasContainer.appendChild(tarjeta));
  
    
    let mensajeFelicitaciones = document.querySelector(".mensaje.felicitacion");
    if (mensajeFelicitaciones) {
      mensajeFelicitaciones.remove();
    }
  
    
    intentos = 0;
    let contadorIntentos = document.getElementById("intentos");
    if (contadorIntentos) {
      contadorIntentos.textContent = "0";
    }
  
    
    let contenedor = document.querySelector('.container');
    let contenedorOriginal = document.getElementById("tarjetasContainer");
    let instrucciones = document.getElementById("instrucciones");
  
    contenedor.style.marginBottom = "7rem"; 
    contenedor.style.marginTop = "";
    contenedorOriginal.style.marginTop = "";
    instrucciones.style.marginTop = "";
  
    
    ajustarMarginPorElementos();
  }
  