var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
		this.load.image('background','./assets/images/background.png');
		this.load.image('chicken', './assets/images/chicken.png');
		this.load.image('horse', './assets/images/horse.png');
		this.load.image('pig', './assets/images/pig.png');
	},

	create: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.background = this.game.add.sprite(0, 0, 'background');
		this.chicken = this.game.add.sprite(50, 50, 'chicken');
		this.horse = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'horse');
		this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');

		this.pig.anchor.setTo(.5);
		this.pig.scale.setTo(-.2);

		this.horse.anchor.setTo(0.5, 0.5);
		this.horse.angle = 10;
	},

	update: function () {
		this.pig.angle -= 1
	}
}

game.state.add('Gamestate', GameState);
game.state.start('Gamestate');
