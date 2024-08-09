<?php
$carpetaNombre = isset($_GET['nombre']) ? $_GET['nombre'] : '';
$carpetaRuta = "./descarga/" . $carpetaNombre;

try {
    if (!file_exists($carpetaRuta)) {
        mkdir($carpetaRuta, 0755, true);
        $mensaje = "Carpeta '$carpetaNombre' creada con éxito.";
    } else {
        $mensaje = "La carpeta '$carpetaNombre' ya existe.";
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['archivos'])) {
            $totalArchivos = count($_FILES['archivos']['name']);
            for ($i = 0; $i < $totalArchivos; $i++) {
                $archivoNombreLimpio = str_replace(' ', '_', basename($_FILES['archivos']['name'][$i]));  
                $archivoTmpName = $_FILES['archivos']['tmp_name'][$i];
                
                if (move_uploaded_file($archivoTmpName, $carpetaRuta . '/' . $archivoNombreLimpio)) {   // linea 20
                    $subido = true;
                    $mensaje = "Archivo subido con éxito.";
                } else {
                    throw new Exception("Error al subir el archivo '$archivoNombreLimpio'.");
                }
            }
        }
    }

    if (isset($_POST['eliminarArchivo'])) {
        $archivoAEliminar = $_POST['eliminarArchivo'];
        $archivoRutaAEliminar = $carpetaRuta . '/' . $archivoAEliminar;

        if (file_exists($archivoRutaAEliminar)) {
            if (unlink($archivoRutaAEliminar)) {
                $mensaje = "Archivo '$archivoAEliminar' eliminado con éxito.";
            } else {
                throw new Exception("Error al eliminar el archivo.");
            }
        } else {
            throw new Exception("El archivo '$archivoAEliminar' no existe.");
        }
    }
} catch (Exception $e) {
    $mensaje = "Error: " . htmlspecialchars($e->getMessage());
}
?>    





