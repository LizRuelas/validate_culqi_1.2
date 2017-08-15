var moneda1;
$("#response-panel").hide();
$('#miBoton').on('click', function (e) {
    // Abre el formulario con las opciones de Culqi.settings
    if ($('#currency_code').is(":checked"))
      {
        console.log("soles");
        moneda1 = "PEN";
      } else {
        console.log("dolares");
        moneda1 = "USD";
      }
    Culqi.codigoComercio = $("#publica").val();
    Culqi.configurar({
      nombre: 'Culqi Store',
      orden: '001',
      moneda: moneda1,
      descripcion: 'Polo/remera Culqi lover',
      monto: 100
     });
    Culqi.abrir();
    e.preventDefault();
});
// Recibimos Token del Culqi.js
  function culqi() {
    var secreta = $("#secreta").val();
    if (Culqi.token) {
        $(document).ajaxStart(function(){
          run_waitMe();
        });
        // Imprimir Token
        $.ajax({
           type: 'POST',
           url: '../culqi-php-1.2.5/examples/01-crear-cargo.php',
           data: { token: Culqi.token.id , moneda1 , secreta },
           datatype: 'json',
           success: function(data) {
             var result = JSON.parse(data);
             if(result.objeto == 'error'){
                 resultdiv(result.mensaje_usuario);
             } else {
                 resultdiv("Venta Exitosa");
             }
           },
           error: function(error) {
             resultdiv(error)
           }
        });
    } else {
      // Hubo un problema...
      // Mostramos JSON de objeto error en consola
      $('#response-panel').show();
      $('#response').html(Culqi.error.merchant_message);
      $('body').waitMe('hide');
    }
  };
  function run_waitMe(){
    $('body').waitMe({
      effect: 'orbit',
      text: 'Procesando pago...',
      bg: 'rgba(255,255,255,0.7)',
      color:'#28d2c8'
    });
  }
  function resultdiv(message){
    $('#response-panel').show();
    $('#response').html(message);
    $('body').waitMe('hide');
  }
