import Phaser from 'phaser'
import MainScene from './scenes/main-scene'

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 },
    },
  },
  scene: [MainScene]
}

var game = new Phaser.Game(config)