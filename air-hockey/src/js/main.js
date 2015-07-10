window.addEventListener('load', function () {
  'use strict';

  var ns = window['air-hockey'];
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'air-hockey-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
