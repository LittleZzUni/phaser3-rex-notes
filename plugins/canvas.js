import Factory from './gameobjects/canvas/canvas/Factory.js';
import Creator from './gameobjects/canvas/canvas/Creator.js';
import Canvas from './gameobjects/canvas/canvas/Canvas.js';

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCanvas', Creator);

export default Canvas;