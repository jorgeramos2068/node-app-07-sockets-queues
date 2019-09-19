// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

// Conectado
socket.on('connect', function () {
  console.log('Conectado al servidor');
});
// Descontectado
socket.on('disconnect', function () {
  console.log('Se perdió la conexión con el servidor');
});
// Escuchar: Estado actual
socket.on('estadoActual', function(data) {
  label.text('Ticket ' + data.actual);
});

$('button').on('click', function() {
  socket.emit('siguienteTicket', null, function(resp) {
    label.text('Ticket ' + resp);
  });
});
