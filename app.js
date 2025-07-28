document.addEventListener('DOMContentLoaded', function() {
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