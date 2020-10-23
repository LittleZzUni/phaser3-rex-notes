import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';



class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('poker', 'assets/images/poker2/poker.png', 'assets/images/poker2/poker.json');
    }

    create() {
        var faces = [];
        for (var i = 0; i < 10; i++) {
            faces.push(CreateCard(this, GetCardName()))
        }
        var carousel = this.add.rexPerspectiveCarousel({
            x: 400, y: 300,

            faces: faces
        })

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            carousel.rotationY += pointer.velocity.x * (1 / 800);
        });
    }

    update() {
    }
}


const RandInt = Phaser.Math.Between;
const Pad = Phaser.Utils.String.Pad;
var GetCardName = function (index) {
    if (index === undefined) {
        index = RandInt(0, 52);
    }
    return Pad(index.toString(), 3, '0', 1);
}

var CreateCard = function (scene, name) {
    return scene.add.rexPerspectiveCard({
        front: { key: 'poker', frame: name },
        back: { key: 'poker', frame: 'back' },
        flip: false
    })
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);