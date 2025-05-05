document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const textoElement = document.getElementById('script__Texto');
    const textos = [
        'Ingeniero de Software',
        'Web Developer',
        'Programador Java',
        'Programador Python',
        'Programador JavaScript',
        'Programador PHP',
        'Diseñador UI/UX'
    ];
    let textoActual = 0;
    let letraActual = 0;
    let escribiendo = true;

    function animarTexto() {
        const textoCompleto = textos[textoActual];
        
        if (escribiendo) {
            textoElement.textContent = textoCompleto.substring(0, letraActual + 1);
            letraActual++;
            
            if (letraActual >= textoCompleto.length) {
                escribiendo = false;
                setTimeout(animarTexto, 2000); // Pausa antes de borrar
            } else {
                setTimeout(animarTexto, 100); // Velocidad de escritura
            }
        } else {
            textoElement.textContent = textoCompleto.substring(0, letraActual);
            letraActual--;
            
            if (letraActual < 0) {
                escribiendo = true;
                textoActual = (textoActual + 1) % textos.length;
                setTimeout(animarTexto, 500); // Pausa antes de siguiente palabra
            } else {
                setTimeout(animarTexto, 50); // Velocidad de borrado
            }
        }
    }

    animarTexto(); // Iniciar la animación
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