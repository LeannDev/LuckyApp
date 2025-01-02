const startCameraButton = document.getElementById('startCamera');
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const status = document.getElementById('status');
const ctx = canvas.getContext('2d');

let scanning = false;

startCameraButton.addEventListener('click', () => {
    // Solicitar permisos y acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
        video.style.display = 'block'; // Mostrar el video
        video.srcObject = stream;
        video.play();
        status.textContent = 'Estado: Escaneando...';
        scanning = true;
        scanQRCode(); // Iniciar escaneo
    })
    .catch(err => {
        console.error('Error al acceder a la cámara:', err);
        status.textContent = 'Estado: No se pudo acceder a la cámara.';
    });
});

function scanQRCode() {
    if (!scanning) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
    output.textContent = code.data; // Mostrar el código QR
    status.textContent = 'Estado: QR detectado.';
    scanning = false; // Detener escaneo
    } else {
    requestAnimationFrame(scanQRCode); // Continuar escaneando
    }
}