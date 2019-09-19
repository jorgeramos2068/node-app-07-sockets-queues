const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log(siguiente);
    callback(siguiente);
  });
  // Emitir: Estado actual
  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4(),
  });
  // Escuchar: Atender ticket
  client.on('atenderTicket', (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario'
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    client.broadcast.emit('ultimos4');
  });
});