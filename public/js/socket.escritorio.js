// Comando para establecer la conexión
var socket = io();

// Obtener parámetros de la URL
var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');
var label = $('small');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
  socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
    if (resp === null) {
      label.text('No hay más tickets');
      return;
    }
    label.text('Ticket: ' +  resp.numero);
  });
});
