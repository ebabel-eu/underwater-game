# Credits

## Spark
- assets/spark.png
Author: Lee Stemkoski (https://github.com/stemkoski)
Source: http://stemkoski.github.io/Three.js/Particles.html

## Particles 3D program
Author: Lee Stemkoski (https://github.com/stemkoski)
Source: http://stemkoski.github.io/Three.js/Particles.html

## 3D library THREE.js
Source: https://threejs.org/

## THREEx WindowResize
Source: https://raw.githubusercontent.com/jeromeetienne/threex.windowresize/master/threex.windowresize.js

## Skybox tutorial
Source: https://www.youtube.com/watch?v=7fJgVyq0OYo

## Whirlpool Skybox
- assets/whirlpool/* (all files in directory)
Author: The Mighty Pete
Source: http://www.custommapmakers.org/skyboxes.php

## Free, royalty-free sounds list
Source: https://v-play.net/game-resources/16-sites-featuring-free-game-sounds

## Theme music Nautilus
- assets/music/ambient2-nautilus.mp3
Author: poinl
Source: https://opengameart.org/content/nautilus

## CSS loading animation
Author: loadingio (https://github.com/loadingio)
Source: https://github.com/loadingio/css-spinner/

## HSL color picker
Source: http://hslpicker.com/

## Animation of a group of fishes
Source: http://altspacevr.github.io/AltspaceJam/fish/fish.html

## Fight music
- assets/music/hold-the-line.ogg
Author: Bart Kelsey
Source: https://opengameart.org/content/hold-line-boss-theme

## socket.io code snippets
```
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
```
Author: LearnRPG (https://stackoverflow.com/users/1325485/learnrpg)
Source: https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
