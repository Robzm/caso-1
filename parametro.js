// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'nombre' ya está presente en la URL
const parametros = new URLSearchParams(window.location.search);
let carpetaNombre = parametros.get("nombre");

if (!carpetaNombre) {
    // Si 'nombre' no está presente, genera un número aleatorio
    carpetaNombre = generarCadenaAleatoria();
    // Agrega el parámetro 'nombre' a la URL
    const urlConParametro = urlActual.includes("?") ? `${urlActual}&nombre=${carpetaNombre}` : `${urlActual}?nombre=${carpetaNombre}`;
    // Redirige a la nueva URL con el parámetro 'nombre'
    window.location.href = urlConParametro;
} else {
    // Llama a la función para crear la carpeta con el nombre obtenido
    crearCarpeta(carpetaNombre);
}

// Función para generar una cadena aleatoria
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

// Función para crear la carpeta
function crearCarpeta(carpetaNombre) {
    $.ajax({
        url: 'crearCarpeta.php',
        type: 'POST',
        data: { nombreCarpeta: carpetaNombre },
        success: function(response) {
            console.log('Carpeta creada con éxito:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error al crear la carpeta:', error);
        }
    });
}

// Función para manejar el evento de envío del formulario
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const file = fileInput.files[0];
    if (file) {
        // Puedes enviar el archivo al servidor para su procesamiento aquí
        console.log('Subir archivo:', file.name);
    } else {
        alert('Por favor, seleccione un archivo primero.');
    }
});


// Función para generar un número aleatorio de 3 dígitos
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}


// //BARRA DE PROGRESO 
// function uploadFile(carpetaRuta, inputId) {
//   var archivoInput = document.getElementById(inputId);
//   var archivo = archivoInput.files[0];
//   var progressBar = document.getElementById('progressBar');

//   var formData = new FormData();
//   formData.append('archivo', archivo);

//   var xhr = new XMLHttpRequest();

//   xhr.upload.onprogress = function (event) {
//       if (event.lengthComputable) {
//           var percentComplete = (event.loaded / event.total) * 100;
//           progressBar.value = percentComplete;
//       }
//   };

//   xhr.onload = function () {
//       if (xhr.status === 200) {
//           console.log('Archivo subido con éxito');
//           // Puedes realizar acciones adicionales después de la carga aquí
//       } else {
//           console.error('Error al subir el archivo');
//       }
//   };

//   xhr.open('POST', 'upload.php', true);
//   xhr.send(formData);
// }


//DROP AREA

// Obtén la zona de arrastre y el formulario
const dropArea = document.getElementById('drop-area');
const Form = document.getElementById('form');

// Agrega los siguientes eventos a la zona de arrastre
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active'); // drag-over
    dragText.textContent = "Suelte los Archivos";  //no estaba
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');  //drag-over
    dragText.textContent = 'Arrastra tus archivos aquí';  // no estaba
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');   //drag-over
    dragText.textContent = 'Arrastra tus archivos aquí';  //no estaba
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        handleFile(files[i]);
    }
});

// Función para manejar el archivo seleccionado
function handleFile(file) {
    if (file) {
        // Realiza alguna acción, como mostrar el nombre del archivo
        console.log('Archivo seleccionado:', file.name);

        // También puedes realizar otras acciones, como subir el archivo al servidor
        // Puedes agregar aquí el código para subir el archivo si lo deseas
    }
}

// Agrega esta función para manejar el evento de envío del formulario
document.getElementById('Form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('#archivo');
    const files = fileInput.files; // Obtiene todos los archivos seleccionados

    if (files.length > 0) {
        // Crea un objeto FormData para enviar los archivos
        const formData = new FormData();
        for (const file of files) {
            formData.append('archivos[]', file); // 'archivos[]' es el nombre del campo que recibirás en el servidor
        }

        // Envía la solicitud fetch
        fetch('subir.php?nombre=' + encodeURIComponent(carpetaNombre), { // Asegúrate de que la URL sea correcta
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Cambia a .text() si esperas una respuesta en texto
        .then(data => console.log('Respuesta del servidor:', data))
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, seleccione al menos un archivo.');
    }
});