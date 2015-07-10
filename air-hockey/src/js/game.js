(function() {
  'use strict';

  function Game() {

  }

  Game.prototype = {
    create: function () {
      this.input.onDown.add(this.onInputDown, this);

      var bgImg = this.add.image(0, 0, "background");
      this.scale.setSize(bgImg.width, bgImg.height);

      this.gameWidth = bgImg.width;
      this.gameHeight = bgImg.height;

      console.debug(this.gameHeight);

      this.physics.startSystem(Phaser.Physics.ARCADE);

      var boundsXOffset = 85;
      var boundsYOffset = boundsXOffset;

      var boundsWidth = bgImg.width - 2 * boundsXOffset;
      var boundsHeight = bgImg.height - 2 * boundsYOffset;

      this.boundsRect = new Phaser.Rectangle(boundsXOffset, boundsYOffset, boundsWidth, boundsHeight);

      //this.physics.arcade.setBounds(boundsXOffset, boundsYOffset, boundsWidth, boundsHeight);
      this.physics.arcade.setBounds(this.boundsRect.x, this.boundsRect.y, this.boundsRect.width, this.boundsRect.height);

      


      

      this.puck = this.add.sprite(0, 0, "puck");

      this.puck.anchor.set(0.5, 0.5);

      this.puck.x = this.gameWidth/2;
      this.puck.y = this.gameHeight/2;

      this.physics.enable(this.puck, Phaser.Physics.ARCADE);


      this.puck.body.collideWorldBounds = true;
      this.puck.body.bounce.setTo(1, 1);

      //this.puck.body.drag.set(100);

      //this.puck.body.velocity.setTo(100, 100);

      this.playerOneController = this.add.sprite(0, 0, "controller-1");

      this.cursors = this.input.keyboard.createCursorKeys();

      this.playerOneController.anchor.set(0.5);

      this.playerOneController.x = this.playerOneController.width;
      this.playerOneController.y = this.gameHeight/2;




      this.physics.enable(this.playerOneController, Phaser.Physics.ARCADE);
      
      // for whatever stupid reason the sprite will not collide with the bounds set on the physics object
      // so it needs to be handledd manually on the input controller for updates
      //this.controller.collideWorldBounds = true;

      this.playerOneController.body.immovable = true;

      //this.world.setBounds(90, 90, this.game.with-180, this.game.height-180);

      
      this.playerTwoController = this.add.sprite(0, 0, "controller-2");
      this.playerTwoController.anchor.set(0.5, 0.5);
      this.playerTwoController.x = (this.boundsRect.y+this.boundsRect.width) - this.playerTwoController.width;
      this.playerTwoController.y = this.gameHeight/2;

      this.physics.enable(this.playerTwoController, Phaser.Physics.ARCADE);

      this.playerTwoController.body.immovable = true;

      var gameItemsScaling = 0.75;

      this.puck.scale.set(gameItemsScaling);
      this.playerOneController.scale.set(gameItemsScaling);
      this.playerTwoController.scale.set(gameItemsScaling);

    },

    update: function () {
      this.physics.arcade.collide(this.playerOneController, this.puck);
      this.physics.arcade.collide(this.playerTwoController, this.puck);

      //this.controller.body.velocity.setTo(0, 0);

      var controllerVelocity = { x: 0, y: 0};

      if ( this.cursors.up.isDown ) {
        controllerVelocity.y = -300;
        
      } else if ( this.cursors.down.isDown ) {
        controllerVelocity.y = 300;
      } 

      if ( this.cursors.left.isDown ) {
        controllerVelocity.x = -300;
      } else if ( this.cursors.right.isDown ) {
        controllerVelocity.x = 300;
      }

      /*if ( this.controller.x + controllerVelocity.x <= this.boundsRect.x || 
           this.controller.y + controllerVelocity.x >= this.boundsRect.width ) {
        console.debug("X velocity out of bounds");
      }*/

      if ( this.playerOneController.x < this.boundsRect.x ) {
          this.playerOneController.x = this.boundsRect.x;
          controllerVelocity.x = 0;
      } else if ( this.playerOneController.x + this.playerOneController.width > this.boundsRect.x + this.boundsRect.width ) {
          this.playerOneController.x = (this.boundsRect.x + this.boundsRect.width) - this.playerOneController.width;
          controllerVelocity.x = 0;
      }

      if ( this.playerOneController.y < this.boundsRect.y ) {
          this.playerOneController.y = this.boundsRect.y;
          controllerVelocity.y = 0;
      } else if ( this.playerOneController.y + this.playerOneController.height > this.boundsRect.y + this.boundsRect.height ) {
          this.playerOneController.y = (this.boundsRect.y + this.boundsRect.height) - this.playerOneController.height;
          controllerVelocity.y = 0;
      }

      

      this.playerOneController.body.velocity.setTo(controllerVelocity.x, controllerVelocity.y);
    },



    onInputDown: function () {
      //this.game.state.start('menu');
    }
  };

  window['air-hockey'] = window['air-hockey'] || {};
  window['air-hockey'].Game = Game;
}());
