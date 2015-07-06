(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();

      //this.ready = true;
    },

    loadResources: function () {
      // load your assets here
      this.load.image("background", "assets/table.png");
      this.load.image("controller-1", "assets/controller_2.png");
      this.load.image("controller-2", "assets/controller.png");
      this.load.image("puck", "assets/puck.png");
    },

    create: function () {

    },

    update: function () {
       if (!!this.ready) {
        this.game.state.start('game');
       }
    },

    onLoadComplete: function () {
       this.ready = true;
    }
  };

  window['air-hockey'] = window['air-hockey'] || {};
  window['air-hockey'].Preloader = Preloader;
}());
