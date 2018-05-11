var game = new Phaser.Game(600, 400, Phaser.AUTO);

var GameState = {
    preload: function () {
        this.load.image('background', 'assets/images/background.png');

        // this.load.image('pig', 'assets/images/pig.png');
        // this.load.image('chicken', 'assets/images/chicken.png');
        // this.load.image('horse', 'assets/images/horse.png');
        // this.load.image('sheep', 'assets/images/sheep3.png');
        this.load.image('arrow', 'assets/images/arrow.png');


        //Spritesheet images
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);


        // Sound file load
        this.load.audio('pigSound', ['assets/audio/pig.mp3', 'assets/audio/pig.ogg']);
        this.load.audio('chickenSound', ['assets/audio/chicken.mp3', 'assets/audio/chicken.ogg']);
        this.load.audio('horseSound', ['assets/audio/horse.mp3', 'assets/audio/horse.ogg']);
        this.load.audio('sheepSound', ['assets/audio/sheep.mp3', 'assets/audio/sheep.ogg']);

    },

    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');

        var animalsData = [
            {
                key: 'chicken',
                text: 'Chicken',
                audio: 'chickenSound'
            },
            {
                key: 'pig',
                text: 'Pig',
                audio: 'pigSound'
            },
            {
                key: 'horse',
                text: 'Horse',
                audio: 'horseSound'
            },
            {
                key: 'sheep',
                text: 'Sheep',
                audio: 'sheepSound'
            }
        ];

        this.animals = this.game.add.group();
        var self = this;
        var animal;
        animalsData.forEach(function (element) {
            animal = self.animals.create(-1000, self.game.world.centerY, element.key);
            animal.anchor.setTo(.5);
            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};

            animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);

            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animalClick, self);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(
            this.game.world.centerX,
            this.game.world.centerY
        );

        // Animal text
        this.showText(this.currentAnimal);


        // right arrow load
        this.rightArrow = this.game.add.sprite(
            this.game.world.centerY + 350,
            this.game.world.centerY,
            'arrow'
        );
        this.rightArrow.anchor.setTo(.5);
        this.rightArrow.customParams = {direction: 1};

        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

        // left arrow
        this.leftArrow = this.game.add.sprite(
            this.game.world.centerX - 250,
            this.game.world.centerY,
            'arrow'
        );
        this.leftArrow.anchor.setTo(.5);
        this.leftArrow.scale.setTo(-1);
        this.leftArrow.customParams = {direction: 0}

        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);


    },

    update: function () {
    },

    switchAnimal: function (arrow, event) {
        var newAnimal, endX;

        if (this.isMoving) {
            return false;
        }

        this.isMoving = true;

        this.animalText.visible = false;

        if (arrow.customParams.direction == 1) {
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width / 2;
            endX = 640 + this.currentAnimal.width / 2;
        } else {
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width / 2;
            endX = -this.currentAnimal.width / 2;
        }

        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX});
        newAnimalMovement.onComplete.add(function () {
            this.showText(newAnimal);
            this.isMoving = false;
        }, this);
        newAnimalMovement.start();

        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX});
        currentAnimalMovement.start();

        this.currentAnimal = newAnimal;
    },

    animalClick: function (animal, event) {
        animal.play('animate');
        animal.customParams.sound.play();
    },

    showText(animal) {
        var style = {
            font: 'bold 30pt Arial',
            fill: '#fff',
            align: 'center'
        };
        if (!this.animalText) {
            this.animalText = this.game.add.text(this.game.width / 2, this.game.height * 0.85, '', style);
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    }
}

game.state.add('GameState', GameState);

game.state.start('GameState');