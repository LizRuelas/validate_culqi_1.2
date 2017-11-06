<?php
/**
 * Ejemplo 1 (01-crear-cargo.php)
 * Como crear un cargo a una tarjeta usando Culqi PHP.
 */

try {
      // Usando Composer (o puedes incluir las dependencias manualmente)
      require '../Requests-master/library/Requests.php';
      Requests::register_autoloader();
      require '../lib/culqi.php';


      // Configurar tu API Key y autenticación
      $SECRET_API_KEY = $_POST["secreta"] ;
      $culqi = new Culqi\Culqi(array('api_key' => $SECRET_API_KEY));

      // Entorno: Integración (pruebas)
      $culqi->setEnv("PRODUC");

      $pedidoId = time();

      // Creando Cargo a una tarjeta
      $cargo = $culqi->Cargos->create(
          array(
            "token"=> $_POST["token"],
            "moneda"=> $_POST["moneda1"],
            "monto"=> 100,
            "descripcion"=> "Venta de prueba",
            "pedido"=> $pedidoId,
            "codigo_pais"=> "PE",
            "direccion"=> "Calle Narciso de la Colina 421",
            "ciudad"=> "Lima",
            "usuario"=> "00000001",
            "telefono"=> 123456789,
            "nombres"=> "Test",
            "apellidos"=> "Culqi",
            "correo_electronico"=> $_POST["correo"]
          )
      );

      // Respuesta
      echo json_encode($cargo);

} catch (Exception $e) {

      echo $e->getMessage();

}
