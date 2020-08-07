import Phaser from 'phaser'

let cursors
let player1
let player2
let leftPunch
let rightPunch
let heavy
let isInAttack = false

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MainScene'
    })
  }

  preload() {
    this.load.image('schoolyard', '/assets/schoolyard.png')
    this.load.image('ground', '/assets/platform.png')
    this.load.atlas('fighter', '/assets/fighter.png', '/assets/fighter.json')
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys()
    leftPunch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    rightPunch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    // heavy = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    let background = this.add.image(0, 0, 'schoolyard')

    let ground = this.physics.add.sprite(this.cameras.main.centerX, 500)
    ground.setSize(this.cameras.main.width, 50)
    ground.setCollideWorldBounds(true)

    player1 = this.physics.add.sprite(300, 300, 'fighter', 'fighter_idle_1.png')
    player1.setScale(3)
    player1.setCollideWorldBounds(true)

    // Idle Animation
    let frameNames = this.anims.generateFrameNames('fighter', {
      start: 1, end: 3, zeroPad: 1,
      prefix: 'fighter_idle_', suffix: '.png'
    })
    this.anims.create({ key: 'idle', frames: frameNames, frameRate: 3, repeat: -1 })

    // Walking Animation
    frameNames = this.anims.generateFrameNames('fighter', {
      start: 1, end: 3, zeroPad: 1, prefix: 'fighter_walk_', suffix: '.png'
    })
    this.anims.create({ key: 'walk', frames: frameNames, frameRate: 6, repeat: -1 })

    // Left Punch Animation
    frameNames = this.anims.generateFrameNames('fighter', {
      start: 1, end: 3, zeroPad: 1, prefix: 'fighter_lp_', suffix: '.png'
    })
    this.anims.create({ key: 'leftPunch', frames: frameNames, frameRate: 10, repeat: 0 })

    // Right Punch Animation
    frameNames = this.anims.generateFrameNames('fighter', {
      start: 1, end: 3, zeroPad: 1, prefix: 'fighter_rp_', suffix: '.png'
    })
    this.anims.create({ key: 'rightPunch', frames: frameNames, frameRate: 10, repeat: 0 })

    // Heavy Animation
    // frameNames = this.anims.generateFrameNames('fighter', {
    //   start: 2, end: 1, zeroPad: 1, prefix: 'fighter_aa_', suffix: '.png'
    // })
    // this.anims.create({ key: 'heavy', frames: frameNames, frameRate: 5, repeat: 0 })

    player2 = this.physics.add.sprite(700, 380, 'fighter', 'fighter_idle_1.png')
    player2.setScale(3)
    player2.setCollideWorldBounds(true)

    // Object Collision
    this.physics.add.collider(player1, ground)
    this.physics.add.collider(player2, ground)
    this.physics.add.collider(player1, player2)

    player1.anims.play('idle')
    player1.on('animationcomplete', (animation, frame) => {
      isInAttack = ['leftPunch', 'rightPunch', 'heavy'].includes(animation.key) ? false : isInAttack
    })
  }

  update() {
    if (!isInAttack) {
      if (Phaser.Input.Keyboard.JustDown(leftPunch)) {
        player1.setVelocityX(0)
        isInAttack = true
        player1.anims.play('leftPunch', false)
      }
      else if (Phaser.Input.Keyboard.JustDown(rightPunch)) {
        player1.setVelocityX(0)
        isInAttack = true
        player1.anims.play('rightPunch', false)
      }
      // else if (Phaser.Input.Keyboard.JustDown(heavy)) {
      //   player1.setVelocityX(0)
      //   isInAttack = true
      //   player1.anims.play('heavy', false)
      // }
      else if (cursors.right.isDown) {
        player1.setVelocityX(160)

        player1.anims.play('walk', true)
      }
      else if (cursors.left.isDown) {
        player1.setVelocityX(-160)

        player1.anims.play('walk', true)
      }
      else {
        player1.setVelocityX(0)

        player1.anims.play('idle', true)
      }
    }
  }
}

export default MainScene