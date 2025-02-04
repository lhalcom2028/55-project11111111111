namespace SpriteKind {
    export const enemy2 = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    info.changeLifeBy(-10)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    hero,
    [img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f f 2 f e f . . 
        . . f f f 2 f e e 2 2 f f f . . 
        . . f e 2 f f e e 2 f e e f . . 
        . f f e f f e e e f e e e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . . e f f f f f f f f 4 e . . 
        . . . 4 f 2 2 2 2 2 e d d 4 . . 
        . . . e f f f f f f e e 4 . . . 
        . . . . f f f . . . . . . . . . 
        `,img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e f 2 f f f 2 f 2 e f . . 
        . . f f f 2 2 e e f 2 f f f . . 
        . . f e e f 2 e e f f 2 e f . . 
        . f f e e e f e e e f f e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f e . . . 
        . . 4 d d e 2 2 2 2 2 f 4 . . . 
        . . . 4 e e f f f f f f e . . . 
        . . . . . . . . . f f f . . . . 
        `],
    500,
    true
    )
})
function advanceLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy2)
    if (level == 1) {
        tiles.setCurrentTilemap(tilemap`level2`)
    } else if (level == 2) {
        tiles.setCurrentTilemap(tilemap`level0`)
    } else if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level9`)
    } else if (level == 4) {
        tiles.setCurrentTilemap(tilemap`level13`)
    } else if (level == 5) {
        tiles.setCurrentTilemap(tilemap`level15`)
    }
    spawnHero()
    spawnCoins()
    spawnMummy()
    spawnSkull()
}
function startMenu () {
    game.splash("Pyramid Escape", "Press A to Enter")
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.setVelocity(0, jump_accel)
    hero.startEffect(effects.halo)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    game.gameOver(true)
})
function spawnCoins () {
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        coin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemy2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
    info.changeLifeBy(-1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    hero,
    [img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 2 2 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `,img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e d d 4 . . . . 
        . . . f 2 2 2 2 e d d e . . . . 
        . . f f 5 5 4 4 f e e f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `],
    500,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    hero,
    [img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 2 2 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `,img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `],
    500,
    true
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    hero,
    [img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 2 2 2 2 e d d 4 e . . 
        . . e 4 f 2 2 2 2 e d d e . . . 
        . . . . f 4 4 5 5 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `,img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f e e 2 2 2 2 2 2 e f f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . e f e 4 d d d d 4 e f . . . 
        . . e 4 d d e 2 2 2 2 f e f . . 
        . . . e d d e 2 2 2 2 f 4 e . . 
        . . . . e e f 5 5 4 4 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . f f f . . . . 
        `],
    500,
    true
    )
})
function spawnMummy () {
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        mummy = sprites.create(img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f 4 5 e 4 4 4 4 e 5 4 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 d 4 5 1 1 5 4 d 5 5 f . 
            . f 5 5 f f 1 1 1 1 f f 5 5 f . 
            . f 1 1 f 1 f 1 1 f 1 f 1 1 f . 
            . f 1 1 d 1 f 1 1 f 1 d 1 1 f . 
            f f 1 1 f 1 1 1 1 1 1 f 1 1 f f 
            f 1 1 f f f 5 5 5 5 f f f 1 1 f 
            . f 1 1 f 4 5 5 5 5 4 f 1 1 f . 
            . . 1 5 5 5 5 5 5 5 5 5 5 1 . . 
            . . 1 f 4 5 4 5 4 5 4 4 5 1 . . 
            . . . f f 1 5 1 e 1 5 5 5 . . . 
            . . . . . f f 5 5 f f . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(mummy, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        mummy.setVelocity(50, 0)
        mummy.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
})
function spawnHero () {
    hero = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        tiles.placeOnTile(hero, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    hero.ay = gravity
    controller.moveSprite(hero, move_speed, 0)
    scene.cameraFollowSprite(hero)
}
function spawnSkull () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        skull = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.enemy2)
        tiles.placeOnTile(skull, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        skull.setVelocity(50, 50)
        skull.setBounceOnWall(true)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    level += 1
    advanceLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
    info.changeLifeBy(-5)
})
let skull: Sprite = null
let mummy: Sprite = null
let coin: Sprite = null
let hero: Sprite = null
let level = 0
let jump_accel = 0
let gravity = 0
let move_speed = 0
startMenu()
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999911111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999911111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999111111111111111199999999999999999999999911111111111111119999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999991111111111111111199999999999999999999999911111111111111111111119999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999911111111111111119999999999999999999999999111111111111111111111111111111111111199999999999999999999999999999
    9999999999999999999999999999999999999999999999999999111111111111119999999999942224999999999999111111111111111111111111111111111111111199999999999999999999999999
    9999999999999999999999999999999999999999999999999991111111111199999999999999444444999999999991111111111111111111111111111111111111111119999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999444444499999999991111111111111111111111111111111111111111119999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999994444444449999999991111111111111111111111111111111111111111111999999999999999999999999
    9999999999999999999999911111111111199999999999999999999999999999999999999944444444449999999911111111111111111111111111111111111111111111999999999999999999999999
    9999999999991111111111111111111111111999999999999999999999999999999999999944444444444999999911111111111111111111111111111111111111111111999999999999999999999999
    9999999999911111111111111111111111111199999999999999999999999999999999999444444444444499999911111111111111111111111111111111111111111111999999999999999999999999
    9999999991111111111111111111111111111119999999999999999999999999999999994444444444444499999911111111111111111111111111111111111111111119999999999999999999999999
    9999999911111111111111111111111111111119999999999999999999999999999999994444444444444449999991111111111111111111111111111111111111111999999999999999999999999999
    9999999111111111111111111111111111111119999999999999999999999999999999944444444444444444999999911111111111111111111111111111111199999999999999999999999999999999
    9999999111111111111111111111111111111119999999999999999999999999999999944444444444444444999999999991111111111111111111111111111999999999999999999999999999999999
    9999999111111111111111111111111111111119999999999999999999999999999999444444444444444444499999999999991111111111111111111111199999999999999999999999999999999999
    9999999111111111111111111111111111111199999999999999999999999999999994444444444444444444449999999999999999999999999999999999999999999999999999999999999999999999
    9999999111111111111111111111111119999999999999999999999999999999999994444444444444444444449999999999999999999999999999999999999999999999999999999999999999999999
    9999999111111111111111111111999999999999999999999999999999999999999944444444444444444444444999999999999999999999999999999999999999999999999999999999999999999999
    9999999111111111111111111199999999999999999999999999999999999999999944444444444444444444444499999999999999999999999999999999999999999999999999999999999999999999
    9999999111111111111111119999999999999999999999999999999999999999999444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999999
    9999999111111111111111999999999999999999999999999999999999999999994444444444444444444444444449999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999994444444444444444444444444444999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999944444444444444444444444444444999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999111111111111111111119999
    9999999999999999999999999999999999999999999999999999999999999994444444444444444444444444444444449999999999999999999999999999999999999111111111111111111111111999
    9999999999999999999999999999999999999999999999999999999999999994444444444444444444444444444444444999999999999999999999999999999999991111111111111111111111111999
    9999999999999999999999999999999999999999999999999999999999999944444444444444444444444444444444444999999999999999999999999999999999991111111111111111111111111999
    9999999999999999999999999999999999999999999999999999999999999444444444444444444444444444444444444499999999999999999999999999999999991111111111111111111111111999
    9999999999999999999999999999999999999999999999999999999999999444444444444444444444444444444444444449999999999999999999999999999999991111111111111111111111199999
    9999999999999999999999999999999999999999999999999999999999994444444444444444444444444444444444444449999999999999999999999999999999991111111111111111111999999999
    9999999999999999999999999999999999999999999999999999999999994444444444444444444444444444444444444444999999999999999999999999999999991111111111111111199999999999
    9999999999999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444499999999999999999999999999999991111111111111111999999999999
    9999999999999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444499999999999999999999999999999991111111111111119999999999999
    9999999999999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444449999999999999999999999999999999111111111111999999999999999
    9999999999999999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444999999999999999999999999999999111111111119999999999999999
    9999999999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444999999999999999999999999999999911111111999999999999999999
    9999999999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999
    9999999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999999
    9999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999999
    9999999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999
    9999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999999
    9999999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999999
    9999999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999
    9999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999999
    9999999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999999
    9999999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999
    9999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999999
    9999999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999999
    9999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999
    9999999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999999
    9999999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999999
    9999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999
    9999999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999999
    9999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999
    9999999999999999999999999999999444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999999
    9999999999999999999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999999
    9999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999
    9999999999999999999999999999944444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444449999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999
    9999999999999992444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444999999999999999999
    9999999999999994444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444499999999999999999
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    `)
tiles.setCurrentTilemap(tilemap`level2`)
move_speed = 100
gravity = 500
jump_accel = -250
level = 1
info.setLife(100)
advanceLevel()
