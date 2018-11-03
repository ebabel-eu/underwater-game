'use strict';

const compression = require('compression');
const express = require('express');
const app = express();
app.use(compression());

const http = require('http').Server(app);
const io = require('socket.io')(http);

const c = require('./constants');
const game = require('./game');
const Player = require('./player');
const spawnMultipleNpc = require('./spawn-multiple-npc');

const spawnPlayer = require('./spawn-player');
const updatePlayerPosition = require('./update-player-position');

const {
  greetSinglePlayer,
  waveOtherPlayers,
  messageAllPlayers,
} = require('./message-players');

// Central store that keeps state of the whole game, server-side.
global.dataStore = c.dataStore;

app.use(express.static('client', {
  maxAge: '1y',
}));

app.settings['x-powered-by'] = false;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

io.on('connection', (socket) => {
  let _name;

  // Add current player.
  socket.on('playerStarts', (name) => {
    _name = name;

    // Check if that name isn't used by a player.
    if (global.dataStore.players[name] !== undefined) {
      io.to(socket.id).emit('nameNotAvailable', name);
      return;
    }

    // Create the new player.
    global.dataStore.players[name] = new Player({ name, socketId: socket.id });

    // Messages
    greetSinglePlayer(io, socket.id, name);
    waveOtherPlayers(socket, name);
    messageAllPlayers(socket, io);

    // NPC.
    spawnMultipleNpc(io, socket.id, global.dataStore.npc);

    // Players.
    spawnPlayer(io, socket.id, global.dataStore.players[name]);
    updatePlayerPosition(socket);

    // Confirm the player has been created.
    // For the current player, spawn all previously existing players in game.
    io.to(socket.id).emit('playerCreated', {
      name,
      players: global.dataStore.players
    });

    // Spawn the current player on all existing player clients.
    socket.broadcast.emit('addOtherPlayer', global.dataStore.players[name]);
  });

  socket.on('disconnect', () => {
    if (!_name) return;
    // Message all other players that current player has left the game.
    socket.broadcast.emit('chatMessage', `${_name} has left.`);

    // Delete player.
    delete global.dataStore.players[_name];

    // Remove player from all other clients when he stops playing.
    socket.broadcast.emit('removePlayer', _name);
  });
});

let port = 3000;
if (process.env.NODE_ENV === 'production') port = 80;
if (process.env.NODE_ENV === 'cloud9') port = process.env.PORT;
http.listen(port, () => {
  console.log(`Underwater Game listening on port ${port}.`); /* eslint no-console: 0 */
});

// Start the server-side game.
game({ io });
