const startCameraButton = document.getElementById('startCamera');
const stopCameraButton = document.getElementById('stopCamera');
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const output = document.getElementById('payment-link');
const status = document.getElementById('status');
const ctx = canvas.getContext('2d');

let stream = null;
let scanning = false;

startCameraButton.addEventListener('click', () => {
  // Solicitar permisos y acceso a la cámara
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(s => {
      stream = s;
      video.srcObject = stream;

      video.addEventListener('loadedmetadata', () => {
        // Asegurarse de que el video esté listo antes de escanear
        video.play();
        scanning = true;
        stopCameraButton.style.display = 'inline-block';
        startCameraButton.style.display = 'none';
        status.textContent = 'Estado: Escaneando...';
        scanQRCode(); // Iniciar escaneo
      });
    })
    .catch(err => {
      console.error('Error al acceder a la cámara:', err);
      status.textContent = 'Estado: No se pudo acceder a la cámara.';
    });
});

stopCameraButton.addEventListener('click', () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop()); // Detener la cámara
  }
  video.srcObject = null;
  scanning = false;
  stopCameraButton.style.display = 'none';
  startCameraButton.style.display = 'inline-block';
  status.textContent = 'Estado: Cámara detenida.';
});

function scanQRCode() {
  if (!scanning) return;

  // Validar dimensiones del video
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    requestAnimationFrame(scanQRCode);
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  if (code) {
    output.value = code.data; // Mostrar el código QR
    status.textContent = 'Estado: QR detectado.';
    scanning = false; // Detener el escaneo automático
    stream.getTracks().forEach(track => track.stop()); // Detener la cámara
  } else {
    setTimeout(() => {
      requestAnimationFrame(scanQRCode); // Continuar escaneando con una pequeña pausa
    }, 100); // Reducir frecuencia para evitar bloqueos
  }
}
