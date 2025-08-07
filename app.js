
//alterna el nombre de la etiqueta
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = "¡Contáctame!";
    } else {
        document.title = "Portafolio ⦁ Inicio";
    }

});

//bloquear codigo fuente
function showMessage(text, duration = 3000) {
    const blockCode = document.createElement("div");
    blockCode.textContent = text;
    blockCode.style.cssText = `
    position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00000025 0%, #0000004a 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-family: monospace, monospace;
        font-size: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.42);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        text-align: center;
        max-width: 400px;
    `;
    document.body.appendChild(blockCode);
    setTimeout(() => {
        blockCode.style.opacity = "1";
    }, 10);

    setTimeout(() => {
        blockCode.style.opacity = "0";
        setTimeout(() => {
            if (blockCode.parentNode) {
                blockCode.parentNode.removeChild(blockCode);
            }
        }, 300);
    }, duration);
}

document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "u") {
        showMessage("Codigo fuente disponible en mi github");
        e.preventDefault();
    }
    if (e.key === "F12") {
        showMessage("Herramientas de desarrollador bloqueadas");
        e.preventDefault();
        return false;
    }
})

document.addEventListener('DOMContentLoaded', function () {
    // Inicialización de tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const textoElement = document.getElementById('script__Texto');
    const textos = [
        'Ingeniero de Software',
        'Programador Java',
        'Programador Python',
        'Programador JavaScript',
        'Web Developer'
    ];
    let textoActual = 0;
    let letraActual = 0;
    let escribiendo = true;
    let prefijoEscrito = false;
    let programadorAnimado = false; // Controla si ya se animó el prefijo "Programador "

    function animarTexto() {
        const textoCompleto = textos[textoActual];
        const esProgramador = textoCompleto.startsWith('Programador ');
        const prefijo = esProgramador ? 'Programador ' : '';
        const sufijo = esProgramador ? textoCompleto.replace('Programador ', '') : textoCompleto;

        if (escribiendo) {
            if (esProgramador) {
                if (!programadorAnimado) {
                    // Solo la primera vez se anima el prefijo
                    if (!prefijoEscrito) {
                        textoElement.textContent = prefijo.substring(0, letraActual + 1);
                        letraActual++;
                        if (letraActual >= prefijo.length) {
                            prefijoEscrito = true;
                            letraActual = 0;
                        }
                    } else {
                        textoElement.textContent = prefijo + sufijo.substring(0, letraActual + 1);
                        letraActual++;
                    }
                } else {
                    // En las siguientes, el prefijo aparece fijo
                    textoElement.textContent = prefijo + sufijo.substring(0, letraActual + 1);
                    letraActual++;
                }
            } else {
                textoElement.textContent = textoCompleto.substring(0, letraActual + 1);
                letraActual++;
            }

            if (
                (!esProgramador && letraActual > textoCompleto.length) ||
                (esProgramador && ((programadorAnimado && letraActual > sufijo.length) || (!programadorAnimado && prefijoEscrito && letraActual > sufijo.length)))
            ) {
                escribiendo = false;
                setTimeout(animarTexto, 2000);
            } else {
                setTimeout(animarTexto, 100);
            }
        } else {
            if (esProgramador) {
                if (!programadorAnimado) {
                    if (prefijoEscrito && letraActual > 0) {
                        textoElement.textContent = prefijo + sufijo.substring(0, letraActual - 1);
                        letraActual--;
                    } else {
                        // No borra el prefijo, solo cambia al siguiente texto
                        prefijoEscrito = false;
                        escribiendo = true;
                        textoActual = (textoActual + 1) % textos.length;
                        letraActual = 0;
                        programadorAnimado = true; // Ya se animó el prefijo
                        setTimeout(animarTexto, 500);
                        return;
                    }
                } else {
                    // Solo borra el sufijo
                    if (letraActual > 0) {
                        textoElement.textContent = prefijo + sufijo.substring(0, letraActual - 1);
                        letraActual--;
                    } else {
                        escribiendo = true;
                        textoActual = (textoActual + 1) % textos.length;
                        letraActual = 0;
                        setTimeout(animarTexto, 500);
                        return;
                    }
                }
            } else {
                textoElement.textContent = textoCompleto.substring(0, letraActual - 1);
                letraActual--;
            }

            if (letraActual < 0) {
                escribiendo = true;
                textoActual = (textoActual + 1) % textos.length;
                letraActual = 0;
                prefijoEscrito = false;
                setTimeout(animarTexto, 500);
            } else {
                setTimeout(animarTexto, 50);
            }
        }
    }

    animarTexto();
});

/*Alert_Formulario
document.getElementById('enviarFormulario').onclick = function () {
    Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: "Mensaje enviado",
        text: "¡Guardado exitosamente!",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        backdrop: true,
        toast: true
    })
}
*/

// Escuchar el evento 'submit' del formulario
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado (recargar la página)

    // Mostrar la alerta de SweetAlert
    Swal.fire({
        position: "bottom",
        icon: "success",
        title: "Mensaje enviado",
        text: "¡Tu mensaje ha sido enviado con éxito!",
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true,
        backdrop: true,
        toast: true
    });

    // Enviar el formulario después de mostrar la alerta
    setTimeout(() => {
        this.submit(); // Reanuda el envío del formulario después de la alerta
    }, 2600); // Ajustar el tiempo para que coincida con el temporizador de la alerta
});

//* Descarga de CV 
function download() {
    const enlace = document.createElement("a");
    enlace.href = "https://drive.google.com/file/d/1cySfZO1opNzVAqvSeiaHP0IHNfYpk-6X/view"; // URL o ruta local
    enlace.download = "curriculum-vitae-David-Tejada.pdf";   // nombre del archivo
    document.body.appendChild(enlace);   // complementos al DOM
    enlace.click();
    document.body.removeChild(enlace);   // limpieza del DOM
}