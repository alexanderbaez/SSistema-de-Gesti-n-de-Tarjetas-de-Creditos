//controlamos el agregar el cuenta del items cuenta
function mostrarFormularioCuenta() {
    const formContainer = document.getElementById('formContainer');
    const accountTable = document.querySelector('.account-table');

    formContainer.style.display = 'block';    // mostramos el formulario
    accountTable.style.display = 'none';      // ocultamos la tabla de cuentas
}

document.addEventListener("DOMContentLoaded", function () {

    const menuItems = document.getElementsByClassName("menu-item");
    const formSections = document.getElementsByClassName("form-section");
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", function (evento) {//agregamos un click a cada items del menu
            evento.preventDefault();

            for (let j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove("active");
            }
            this.classList.add("active"); //clikeado

            for (let k = 0; k < formSections.length; k++) {// ocultamos todos los formularios que estan en el formSections
                formSections[k].style.display = "none";
            }

            const targetId = this.getAttribute("data-target"); 
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    }

    //configuramos el calendario de fecha de nacimiento
    const inputFecha = document.getElementById("fecha");
    if (inputFecha) {
        const hoy = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
        inputFecha.setAttribute("max", hoy);
    }

//validacion del formulario de cliente del rol operario
const formularioClientes = document.querySelector("#item-clientes .form"); // traemos el formulario con ID: items-clientes

if (formularioClientes) {
    formularioClientes.addEventListener("submit", function (evento) {
        evento.preventDefault(); // prevenimos envio por defecto

        // lista de campos a validar con su mensaje
        const campos = [
            { id: "nombre", mensaje: "Por favor, ingrese el nombre." },
            { id: "apellido", mensaje: "Por favor, ingrese el apellido." },
            { id: "dni", mensaje: "Por favor, ingrese el DNI." },
            { id: "fecha", mensaje: "Por favor, ingrese la fecha de nacimiento." },
            { id: "telefono", mensaje: "Por favor, ingrese el teléfono." },
            { id: "correo", mensaje: "Por favor, ingrese el correo electrónico." },
        ];
        const esValido = validarCampos(campos);

        if (esValido) {
            alert("¡Cliente agregado con éxito!");
            formularioClientes.reset();
        }
    });
}

//validamos campo por campo
function validarCampos(campos) {
    let valido = true;

    for (let i = 0; i < campos.length; i++) {
        const campo = campos[i];
        const input = document.getElementById(campo.id);
        const errorSpan = document.getElementById("error-" + campo.id);
        const valor = input.value.trim();

        errorSpan.textContent = ""; //limpiamos los errores anteriores

        if (valor === "") {
            errorSpan.textContent = campo.mensaje;
            valido = false;
            continue;
        }

        switch (campo.id) {
            case "nombre":
            case "apellido":
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(valor)) {
                    errorSpan.textContent = "Error, no se admiten caracteres numericos.";
                    valido = false;
                }
                break;

            case "dni":
                if (!/^\d{7,8}$/.test(valor)) {
                    errorSpan.textContent = "El DNI debe tener 7 u 8 digitos numericos.";
                    valido = false;
                }
                break;

            case "telefono":
                if (!/^[0-9+\-\s()]{6,}$/.test(valor)) {
                    errorSpan.textContent = "Ingrese un telefono valido. Solo numeros y caracteres como +, -, ().";
                    valido = false;
                }
                break;

            case "correo":
                if (!input.checkValidity()) {
                    errorSpan.textContent = "Ingrese un correo electronico valido.";
                    valido = false;
                }
                break;
        }
    }
    return valido;
}



    // verificacion del cliente del banco (rol agente)
    const verificarForm = document.getElementById('verificarForm');

    if (verificarForm) {
        verificarForm.addEventListener('submit', function (event) {//se activa al enviar el formulario
            event.preventDefault();

            const dniIngresado = document.getElementById('dni').value.trim();
            const mensaje = document.getElementById('mensaje');
            const otorgamiento = document.getElementById('item-otorgamiento');

            // simulamos dos dni de clientes en el banco
            const clientesRegistrados = ['12345678', '38216639'];

            if (clientesRegistrados.includes(dniIngresado)) {//si esta el dni en el arrglo
                mensaje.innerHTML = `<p style="color: green; font-weight: bold;">✔️ Cliente encontrado.</p>`;
                otorgamiento.style.display = 'block';
                document.getElementById('dniOtorgamiento').value = dniIngresado;
            } else {//sino mostramos mensaje negativo
                mensaje.innerHTML = `<p style="color: red; font-weight: bold;">❌ El usuario ${dniIngresado} no es cliente del banco.</p>`;
                otorgamiento.style.display = 'none';
            }
        });
    }
    //verificacion del cliente para ver su resumen de tarjeta
    const form = document.getElementById("verificarForm");
    const dniInput = document.getElementById("dniInput");
    const errorMsg = document.getElementById("mensaje");

    // simulacion de una lista de DNI validos
    const dniValidos = ["12345678", "38216639"];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const dniIngresado = dniInput.value.trim();

        if (dniValidos.includes(dniIngresado)) {
            window.location.href = "indexCliente.html";
        } else {
            mensaje.innerHTML = `<p style="color: red; font-weight: bold;">❌ DNI inválido. Intente nuevamente..</p>`;
        }
    });
});