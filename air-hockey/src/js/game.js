(function() {
  'use strict';

  function Game() {

  }

  Game.prototype = {
    create: function () {
      this.input.onDown.add(this.onInputDown, this);

      this.physics.startSystem(Phaser.Physics.ARCADE);

      var bgImg = this.add.image(0, 0, "background");

      this.scale.setSize(bgImg.width, bgImg.height);

      this.gameWidth = bgImg.width;
      this.gameHeight = bgImg.height;

      this.puck = this.add.sprite(0, 0, "puck");

      this.puck.scale.set(0.5);
      this.puck.anchor.set(0.5, 0.5);

      this.puck.x = this.gameWidth/2;
      this.puck.y = this.gameHeight/2;

      this.physics.enable(this.puck, Phaser.Physics.ARCADE);
      this.puck.body.collideWorldBounds = true;
      this.puck.body.bounce.setTo(1, 1);

      this.puck.body.velocity.setTo(100, 100);

      this.controller = this.add.sprite(0, 0, "controller-1");



      this.controller.scale.set(0.5);
      this.controller.anchor.set(0.5);

      this.controller.x = this.controller.width;
      this.controller.y = this.gameHeight/2;

      this.controller.inputEnabled = true;
      this.controller.input.enableDrag();

      this.physics.enable(this.controller, Phaser.Physics.ARCADE);
      this.controller.collideWorldBounds = true;

      this.controller.body.immovable = true;
    },

    update: function () {
      this.physics.arcade.collide(this.controller, this.puck);
    },

    onInputDown: function () {
      //this.game.state.start('menu');
    }
  };

  window['air-hockey'] = window['air-hockey'] || {};
  window['air-hockey'].Game = Game;
}());