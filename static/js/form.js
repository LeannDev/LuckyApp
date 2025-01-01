// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar el formulario
    const form = document.getElementById("form-game");

    // Validar los campos del formulario
    function isValidURL(url) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*' + // port and path
            '(\\?[;&a-zA-Z0-9%_\\+=-]*)?' + // query string
            '(\\#[-a-zA-Z0-9_]*)?$','i'); // fragment locator
        return !!urlPattern.test(url);
    }    

    function isValidParticipants(value) {
        const number = parseInt(value, 10);
        return Number.isInteger(number) && number > 1;
    }

    // Escuchar el evento de envío del formulario
    form.addEventListener("submit", (event) => {
        // Prevenir el comportamiento por defecto del formulario
        event.preventDefault();

        // Obtener los valores del formulario
        const paymentLink = document.getElementById("payment-link").value;
        const participants = document.getElementById("participants").value;

        // Validar los valores
        if (!paymentLink || !participants) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        if (!isValidURL(paymentLink)) {
            alert("Por favor, ingresa una URL válida.");
            return;
        }

        if (!isValidParticipants(participants)) {
            alert("Por favor, ingresa un número válido de participantes (mayor a 1).");
            return;
        }

        // Codificar los valores en Base64
        const encodedURL = btoa(paymentLink);
        const encodedPlayers = btoa(participants);

        // Construir el enlace final
        const gameLink = `/play/go?np=${encodedPlayers}&pl=${encodedURL}`;

        // Redirigir al usuario al enlace generado
        window.location.href = gameLink;
    });
});