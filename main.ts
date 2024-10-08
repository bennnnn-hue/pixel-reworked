namespace SpriteKind {
    export const Rightthrow = SpriteKind.create()
    export const Bullet = SpriteKind.create()
    export const Dead = SpriteKind.create()
    export const Bomb = SpriteKind.create()
    export const Knife = SpriteKind.create()
    export const Shard = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprite.follow(Zenith, randint(1, 20))
})
sprites.onDestroyed(SpriteKind.Knife, function (sprite) {
	
})
events.spriteEvent(SpriteKind.Knife, SpriteKind.Player, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    if (launched == true) {
        sprites.destroy(Knife)
        info.changeLifeBy(1)
    }
})
events.spriteEvent(SpriteKind.Projectile, SpriteKind.Enemy, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Explosion), 100, 38)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 24)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100, 1)
    scene.cameraShake(4, 500)
    sprites.destroy(otherSprite)
    if (spriteutils.isDestroyed(otherSprite)) {
        info.changeScoreBy(1)
    }
})
function Sprite_Spawn () {
    Menu_Is_Running = false
    profilelife.setEmptyLifeImage(img`
        b b b b b 
        b a 7 9 b 
        b 7 a 7 b 
        b 9 7 a b 
        b b b b b 
        `)
    profilelife.setFilledLifeImage(img`
        3 3 3 3 3 
        3 2 4 1 3 
        3 4 2 4 3 
        3 1 4 2 3 
        3 3 3 3 3 
        `)
    profilelife.setMaxLife(1)
    game.setDialogCursor(img`
        . . . . . . . . 
        . . . 8 8 . . . 
        . . 8 b b 8 . . 
        . 8 b 9 1 b 8 . 
        . 8 b 1 9 b 8 . 
        . . 8 b b 8 . . 
        . . . 8 8 . . . 
        . . . . . . . . 
        `)
    game.setDialogFrame(img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 e e e e e e e e e e e e e 4 
        4 e d d d d d d d d d d d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d . . . . . . . . . d e 4 
        4 e d d d d d d d d d d d e 4 
        4 e e e e e e e e e e e e e 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        `)
    Zenith = sprites.create(img`
        . . . . . . . . 
        . . 2 2 2 2 . . 
        . 2 3 3 3 3 . . 
        . . 3 3 3 3 . . 
        . . 2 2 2 2 . . 
        . . 2 2 2 2 . . 
        . . 2 . . 2 . . 
        . . . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(Zenith, 80, 80)
    statusbar = statusbars.create(10, 2, StatusBarKind.Health)
    statusbar.setColor(2, 3)
    statusbar.max = 60
    statusbar.attachToSprite(Zenith)
    scene.cameraFollowSprite(Zenith)
    characterAnimations.loopFrames(
    Zenith,
    assets.animation`myAnim1`,
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Zenith,
    assets.animation`myAnim`,
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
}
// Makes the boomerang move.  
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.player1.hasLife()) {
        if (Weapon_Selection_Boomerang == true && Weapon_Selection_Gun == false) {
            if (controller.A.isPressed() && left == 1) {
                launched = false
                info.changeLifeBy(-1)
                Knife = sprites.createProjectileFromSprite(img`
                    . . b a a 
                    . b b . a 
                    b b . . . 
                    a . . . . 
                    a a . . . 
                    `, Zenith, -80, 0)
                Knife.setKind(SpriteKind.Knife)
                Knife.setFlag(SpriteFlag.AutoDestroy, false)
                Knife.setFlag(SpriteFlag.DestroyOnWall, false)
                characterAnimations.loopFrames(
                Knife,
                [img`
                    . . b a a 
                    . b b . a 
                    b b . . . 
                    a . . . . 
                    a a . . . 
                    `,img`
                    . . . . . 
                    . b b b . 
                    a b . b a 
                    a . . . a 
                    . . . . . 
                    `,img`
                    a a b . . 
                    a . b b . 
                    . . . b b 
                    . . . . a 
                    . . . a a 
                    `,img`
                    . a a . . 
                    . . b b . 
                    . . . b . 
                    . . b b . 
                    . a a . . 
                    `,img`
                    . . . a a 
                    . . . . a 
                    . . . b b 
                    a . b b . 
                    a a b . . 
                    `,img`
                    . . . . . 
                    a . . . a 
                    a b . b a 
                    . b b b . 
                    . . . . . 
                    `,img`
                    a a . . . 
                    a . . . . 
                    b b . . . 
                    . b b . a 
                    . . b a a 
                    `,img`
                    . . a a . 
                    . b b . . 
                    . b . . . 
                    . b b . . 
                    . . a a . 
                    `],
                100,
                characterAnimations.rule(Predicate.Moving)
                )
                extraEffects.createSpreadEffectOnAnchor(Knife, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 5000, 5)
            }
            if (controller.A.isPressed() && Right == 1) {
                launched = false
                info.changeLifeBy(-1)
                Knife = sprites.createProjectileFromSprite(img`
                    a a b . . 
                    a . b b . 
                    . . . b b 
                    . . . . b 
                    . . . a a 
                    `, Zenith, 80, 0)
                Knife.setKind(SpriteKind.Knife)
                Knife.setFlag(SpriteFlag.AutoDestroy, false)
                Knife.setFlag(SpriteFlag.DestroyOnWall, false)
                characterAnimations.loopFrames(
                Knife,
                [img`
                    a a b . . 
                    a . b b . 
                    . . . b b 
                    . . . . a 
                    . . . a a 
                    `,img`
                    . a a . . 
                    . . a b . 
                    . . . b . 
                    . . a b . 
                    . a a . . 
                    `,img`
                    . . . a a 
                    . . . . a 
                    . . . b b 
                    a . b b . 
                    a a b . . 
                    `,img`
                    . . . . . 
                    a . . . a 
                    a a . a a 
                    . b b b . 
                    . . . . . 
                    `,img`
                    a a . . . 
                    a . . . . 
                    b b . . . 
                    . b b . a 
                    . . b a a 
                    `,img`
                    . . a a . 
                    . b a . . 
                    . b . . . 
                    . b a . . 
                    . . a a . 
                    `,img`
                    . . b a a 
                    . b b . a 
                    b b . . . 
                    a . . . . 
                    a a . . . 
                    `,img`
                    . . . . . 
                    . b b b . 
                    a a . a a 
                    a . . . a 
                    . . . . . 
                    `],
                100,
                characterAnimations.rule(Predicate.Moving)
                )
                extraEffects.createSpreadEffectOnAnchor(Knife, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 5000, 5)
            }
        }
        if (Weapon_Selection_Boomerang == false && Weapon_Selection_Gun == true) {
            if (controller.A.isPressed() && left == 1) {
                info.changeLifeBy(-1)
                Bullet = sprites.createProjectileFromSprite(img`
                    8 8 
                    `, Zenith, -500, 0)
                extraEffects.createSpreadEffectOnAnchor(Bullet, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Cloud), 100, 25)
                extraEffects.createSpreadEffectOnAnchor(Bullet, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Cloud), 100, 5)
                extraEffects.createSpreadEffectOnAnchor(Bullet, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Cloud), 100, 1)
                Bullet.setKind(SpriteKind.Bullet)
            }
            if (controller.A.isPressed() && Right == 1) {
                info.changeLifeBy(-1)
                Bullet = sprites.createProjectileFromSprite(img`
                    8 8 
                    `, Zenith, 500, 0)
                extraEffects.createSpreadEffectOnAnchor(Bullet, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Cloud), 100, 25)
                extraEffects.createSpreadEffectOnAnchor(Bullet, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Cloud), 100, 5)
                extraEffects.createSpreadEffectOnAnchor(Bullet, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Cloud), 100, 1)
                Bullet.setKind(SpriteKind.Bullet)
            }
        }
        if (Big_Rocket == true) {
            if (controller.A.isPressed() && left == 1) {
                BR = sprites.createProjectileFromSprite(img`
                    ..............................
                    .....aaaaaaaaaaaaaaaaaaaaaaa..
                    ...aabbbbbbbabbbbbbaba111ab99.
                    ..abbabbbbbbabbbbbbbabaaaa977.
                    ..abbbabbbbbabbbbbbbbabbbb977.
                    ..abbbbabbbbabbbbbbabbbbb9777.
                    ..abbbbbabbabbbbbbabaaaab9777.
                    ..abbbbbbaababbbbaba111ab9777.
                    ..abbbbbbaababbbbaba111ab9777.
                    ..abbbbbabbabbbbbbabaaaab9777.
                    ..abbbbabbbbabbbbbbabbbbb9777.
                    ..abbbabbbbbabbbbbbbbabbbb977.
                    ..abbabbbbbbabbbbbbbabaaaa977.
                    ...aabbbbbbbabbbbbbaba111ab99.
                    .....aaaaaaaaaaaaaaaaaaaaaaa..
                    ..............................
                    `, Zenith, -50, 0)
                extraEffects.createSpreadEffectOnAnchor(BR, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Twinkle), 5000, 45, 40)
                extraEffects.createSpreadEffectOnAnchor(BR, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Twinkle), 5000, 25, 40)
                extraEffects.createSpreadEffectOnAnchor(BR, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Twinkle), 5000, 5, 40)
                BR.setFlag(SpriteFlag.GhostThroughWalls, true)
                info.changeLifeBy(-1)
            }
            if (controller.A.isPressed() && Right == 1) {
                info.changeLifeBy(-1)
                BR = sprites.createProjectileFromSprite(img`
                    ..............................
                    ..aaaaaaaaaaaaaaaaaaaaaaa.....
                    .99ba111ababbbbbbabbbbbbbaa...
                    .779aaaababbbbbbbabbbbbbabba..
                    .779bbbbabbbbbbbbabbbbbabbba..
                    .7779bbbbbabbbbbbabbbbabbbba..
                    .7779baaaababbbbbbabbabbbbba..
                    .7779ba111ababbbbabaabbbbbba..
                    .7779ba111ababbbbabaabbbbbba..
                    .7779baaaababbbbbbabbabbbbba..
                    .7779bbbbbabbbbbbabbbbabbbba..
                    .779bbbbabbbbbbbbabbbbbabbba..
                    .779aaaababbbbbbbabbbbbbabba..
                    .99ba111ababbbbbbabbbbbbbaa...
                    ..aaaaaaaaaaaaaaaaaaaaaaa.....
                    ..............................
                    `, Zenith, 50, 0)
                extraEffects.createSpreadEffectOnAnchor(BR, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Twinkle), 5000, 45, 40)
                extraEffects.createSpreadEffectOnAnchor(BR, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Twinkle), 5000, 25, 40)
                extraEffects.createSpreadEffectOnAnchor(BR, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Twinkle), 5000, 5, 40)
                BR.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
        } else if (Grav_Bomb_selection == true) {
            info.changeLifeBy(-1)
            GravBomb = sprites.create(img`
                . . . a a . . . 
                . a a 7 7 a a . 
                . a 7 9 9 7 a . 
                a 7 9 9 9 9 7 a 
                a 7 9 9 9 9 7 a 
                . a 7 9 9 7 a . 
                . a a 7 7 a a . 
                . . . a a . . . 
                `, SpriteKind.Bomb)
            GravBomb.setPosition(Zenith.x, Zenith.y)
            for (let index = 0; index < 4; index++) {
                scene.cameraShake(4, 500)
                animation.runImageAnimation(
                GravBomb,
                [img`
                    . . . a a . . . 
                    . a a 7 7 a a . 
                    . a 7 9 9 7 a . 
                    a 7 9 9 9 9 7 a 
                    a 7 9 9 9 9 7 a 
                    . a 7 9 9 7 a . 
                    . a a 7 7 a a . 
                    . . . a a . . . 
                    `,img`
                    . . . a a . . . 
                    . a a 9 9 a a . 
                    . a 9 7 7 9 a . 
                    a 9 7 7 7 7 9 a 
                    a 9 7 7 7 7 9 a 
                    . a 9 7 7 9 a . 
                    . a a 9 9 a a . 
                    . . . a a . . . 
                    `],
                100,
                true
                )
                Blast = sprites.createProjectileFromSprite(img`
                    7 7 7 7 . . . . 
                    7 9 b 8 7 . . . 
                    7 b 9 b 8 7 . . 
                    7 8 b 9 b 8 7 . 
                    . 7 8 b 9 b 8 7 
                    . . 7 8 b 9 b 7 
                    . . . 7 8 b 9 7 
                    . . . . 7 7 7 7 
                    `, GravBomb, -50, -50)
                extraEffects.createSpreadEffectOnAnchor(Blast, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100, 48, 20)
                Blast.setKind(SpriteKind.Shard)
                Blast.setFlag(SpriteFlag.GhostThroughWalls, true)
                Blast.setFlag(SpriteFlag.DestroyOnWall, false)
                Blast = sprites.createProjectileFromSprite(img`
                    . . . . 7 7 7 7 
                    . . . 7 8 b 9 7 
                    . . 7 8 b 9 b 7 
                    . 7 8 b 9 b 8 7 
                    7 8 b 9 b 8 7 . 
                    7 b 9 b 8 7 . . 
                    7 9 b 8 7 . . . 
                    7 7 7 7 . . . . 
                    `, GravBomb, 50, -50)
                extraEffects.createSpreadEffectOnAnchor(Blast, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100, 48, 20)
                Blast.setKind(SpriteKind.Shard)
                Blast.setFlag(SpriteFlag.GhostThroughWalls, true)
                Blast.setFlag(SpriteFlag.DestroyOnWall, false)
                Blast = sprites.createProjectileFromSprite(img`
                    . . . . 7 7 7 7 
                    . . . 7 8 b 9 7 
                    . . 7 8 b 9 b 7 
                    . 7 8 b 9 b 8 7 
                    7 8 b 9 b 8 7 . 
                    7 b 9 b 8 7 . . 
                    7 9 b 8 7 . . . 
                    7 7 7 7 . . . . 
                    `, GravBomb, -50, 50)
                extraEffects.createSpreadEffectOnAnchor(Blast, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100, 48, 20)
                Blast.setKind(SpriteKind.Shard)
                Blast.setFlag(SpriteFlag.GhostThroughWalls, true)
                Blast.setFlag(SpriteFlag.DestroyOnWall, false)
                Blast = sprites.createProjectileFromSprite(img`
                    7 7 7 7 . . . . 
                    7 9 b 8 7 . . . 
                    7 b 9 b 8 7 . . 
                    7 8 b 9 b 8 7 . 
                    . 7 8 b 9 b 8 7 
                    . . 7 8 b 9 b 7 
                    . . . 7 8 b 9 7 
                    . . . . 7 7 7 7 
                    `, GravBomb, 50, 50)
                extraEffects.createSpreadEffectOnAnchor(Blast, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100, 48, 20)
                Blast.setKind(SpriteKind.Shard)
                Blast.setFlag(SpriteFlag.GhostThroughWalls, true)
                Blast.setFlag(SpriteFlag.DestroyOnWall, false)
                pause(1000)
            }
            sprites.destroy(GravBomb)
        }
    }
})
events.wallEvent(SpriteKind.Knife, events.simpleWallCondition(events.WallFlag.Any), events.WallEvent.StartHitting, function (sprite) {
    Knife.follow(Zenith)
    launched = true
})
sprites.onDestroyed(SpriteKind.Dead, function (sprite) {
    game.reset()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Right = 0
    left = 1
})
events.spriteEvent(SpriteKind.Shard, SpriteKind.Enemy, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Explosion), 100, 38)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 24)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100, 1)
    scene.cameraShake(4, 500)
    sprites.destroy(otherSprite)
    if (spriteutils.isDestroyed(otherSprite)) {
        info.changeScoreBy(1)
    }
})
info.onCountdownEnd(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    if (tileUtil.currentTilemap() == Forest) {
        tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
            tileUtil.setWallAt(Forest, location, false)
        })
        tileUtil.replaceAllTiles(assets.tile`myTile34`, assets.tile`myTile27`)
        tileUtil.replaceAllTiles(assets.tile`myTile45`, assets.tile`myTile27`)
        tileUtil.replaceAllTiles(assets.tile`myTile26`, assets.tile`myTile27`)
    } else if (tileUtil.currentTilemap() == Factory) {
        tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
            tileUtil.setWallAt(Factory, location, false)
        })
        tileUtil.replaceAllTiles(assets.tile`myTile45`, assets.tile`myTile53`)
        tileUtil.replaceAllTiles(assets.tile`myTile49`, assets.tile`myTile53`)
    } else if (tileUtil.currentTilemap() == Dessert) {
        tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
            tileUtil.setWallAt(Dessert, location, false)
        })
        tileUtil.replaceAllTiles(assets.tile`myTile52`, assets.tile`myTile55`)
        tileUtil.replaceAllTiles(assets.tile`myTile48`, assets.tile`myTile55`)
        tileUtil.replaceAllTiles(assets.tile`myTile45`, assets.tile`myTile55`)
        tileUtil.replaceAllTiles(assets.tile`myTile51`, assets.tile`myTile55`)
    }
    tileUtil.unloadTilemap()
    Create_New_Tile_map()
})
events.spriteEvent(SpriteKind.Enemy, SpriteKind.Player, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    statusbar.value += -10
    scene.cameraShake(4, 500)
    animation.runImageAnimation(
    Zenith,
    assets.animation`myAnim0`,
    100,
    false
    )
    if (left == 1) {
        Zenith.setVelocity(-30, 0)
    }
    if (Right == 1) {
        Zenith.setVelocity(30, 0)
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(statusbar)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 100)
    tileUtil.unloadTilemap()
    scene.setBackgroundImage(img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ...........................................222222222...2222222222222...22222222222222222...22222222222...222....................................................
        ..........................................22222222222.222222222222222.2222222222222222222.2222222222222.22222...................................................
        ..........................................22222..2222.222222222222222..22222222222222222..2222222222222.22222...................................................
        ..........................................2222....222.222222222222222...222222222222222...2222222222222.22222...................................................
        ..........................................22222..2222.222222222222222....2222214222222....222222.....22.22222...................................................
        ..........................................22222222222.222222222222222.....22214142222.....22222.........22222...................................................
        ..........................................2222222222..222222222222222......214141412......2222......222.22222...................................................
        ..........................................22222........2222222222222........2141412.......2222.....2222.22222...88..............................................
        ..........................................22222..........222222222...........21412........2222....22222.22222..8bb8.............................................
        ..........................................22222.............222..............22122........2222222222222.22222.8b91b8............................................
        ..........................................22222.............222..............22222........2222222222222.22222.8b19b8............................................
        ..........................................22222.............222..............22122........2222222222222.22222..8bb8.............................................
        ..........................................22222..........222222222...........22222........2222....22222.22222...88..............................................
        ..........................................22222........2222222222222........2224222.......2222.....2222.22222...................................................
        ..........................................22222.......222222222222222......222422222......2222......222.22222...................................................
        ..........................................22222.......222222222222222.....22222222222.....22222.........22222...................................................
        ..........................................22222.......222222222222222....2222221222222....222222.....22.2222222222222...........................................
        ..........................................22222.......222222222222222...222221422222222...2222222222222.22222222222222..........................................
        ..........................................22222.......222222222222222..22222141412222222..2222222222222.22222222222222..........................................
        ..........................................22222.......222222222222222.2222214141414222222.2222222222222.22222222222222..........................................
        ...........................................222.........2222222222222...22222222222222222...22222222222...222222222222...........................................
        ................................................................................................................................................................
        ..........................................................22....22.2...2..22..22...2..2..22.222.................................................................
        ..........................................................2.2..2...2...2.2..2.2.2..2.2..2...2..2................................................................
        ..........................................................2.2..222.2.2.2.2..2.2.2..22...222.2..2................................................................
        ..........................................................22...2....2.2..2..2.22...22...2...2..2................................................................
        ..........................................................2.2..2....2.2..2..2.2.2..2.2..2...2..2................................................................
        ..........................................................2..2..22..2.2...22..2..2.2..2..22.222.................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `)
    Zenith.setKind(SpriteKind.Dead)
    sprites.destroy(Zenith, effects.fire, 4000)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Right = 1
    left = 0
})
tileUtil.onMapLoaded(function (tilemap2) {
    for (let index = 0; index < randint(1, 4); index++) {
        tileUtil.createSpritesOnTiles(assets.tile`myTile34`, Enemy_List._pickRandom(), SpriteKind.Enemy)
    }
    for (let index = 0; index < randint(1, 4); index++) {
        tileUtil.createSpritesOnTiles(assets.tile`myTile54`, Enemy_List._pickRandom(), SpriteKind.Enemy)
    }
    for (let index = 0; index < randint(1, 4); index++) {
        tileUtil.createSpritesOnTiles(assets.tile`myTile52`, Enemy_List._pickRandom(), SpriteKind.Enemy)
    }
    for (let index = 0; index < randint(1, 8); index++) {
        tileUtil.createSpritesOnTiles(assets.tile`myTile60`, Enemy_List._pickRandom(), SpriteKind.Enemy)
    }
})
info.onLifeZero(function () {
	
})
function Start_Game () {
    Sprite_Spawn()
    Create_New_Tile_map()
    launched = false
}
events.spriteEvent(SpriteKind.Knife, SpriteKind.Enemy, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Explosion), 100, 38)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 24)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100, 1)
    scene.cameraShake(4, 500)
    sprites.destroy(otherSprite)
    if (spriteutils.isDestroyed(otherSprite)) {
        info.changeScoreBy(1)
    }
})
events.spriteEvent(SpriteKind.Bullet, SpriteKind.Enemy, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Explosion), 100, 38)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 24)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100, 1)
    scene.cameraShake(4, 500)
    sprites.destroy(otherSprite)
    if (spriteutils.isDestroyed(otherSprite)) {
        info.changeScoreBy(1)
    }
})
// This is the Biome Generator
function Create_New_Tile_map () {
    tiles.setCurrentTilemap(Biomes._pickRandom())
    statusbar.value = 60
    info.changeLifeBy(1)
    sprites.destroy(Knife)
    sprites.destroyAllSpritesOfKind(SpriteKind.Bomb)
    if (Forest == tileUtil.currentTilemap()) {
        for (let index = 0; index < 8; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile43`)
        }
        for (let index = 0; index < 30; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile26`)
        }
        for (let index = 0; index < 8; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile45`)
        }
        for (let index = 0; index < randint(1, 3); index++) {
            tileUtil.createSpritesOnTiles(assets.tile`myTile34`, Enemy_List._pickRandom(), SpriteKind.Enemy)
        }
        tileUtil.setWalls(assets.tile`myTile26`, true)
        tileUtil.setWalls(assets.tile`myTile45`, true)
    }
    if (Factory == tileUtil.currentTilemap()) {
        for (let index = 0; index < 8; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile54`)
        }
        for (let index = 0; index < 30; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile49`)
        }
        for (let index = 0; index < 8; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile45`)
        }
        for (let index = 0; index < randint(1, 3); index++) {
            tileUtil.createSpritesOnTiles(assets.tile`myTile54`, Enemy_List._pickRandom(), SpriteKind.Enemy)
        }
        tileUtil.setWalls(assets.tile`myTile45`, true)
        tileUtil.setWalls(assets.tile`myTile49`, true)
    }
    if (Dessert == tileUtil.currentTilemap()) {
        for (let index = 0; index < 8; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile52`)
        }
        for (let index = 0; index < 30; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile51`)
        }
        for (let index = 0; index < 8; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile45`)
        }
        for (let index = 0; index < randint(1, 3); index++) {
            tileUtil.createSpritesOnTiles(assets.tile`myTile52`, Enemy_List._pickRandom(), SpriteKind.Enemy)
        }
        for (let index = 0; index < 4; index++) {
            tileUtil.setTileAt(tileUtil.currentTilemap(), tiles.getTileLocation(randint(0, 15), randint(20, 0)), assets.tile`myTile55`)
        }
        tileUtil.setWalls(assets.tile`myTile51`, true)
        tileUtil.setWalls(assets.tile`myTile48`, true)
        tileUtil.setWalls(assets.tile`myTile45`, true)
    }
    info.startCountdown(20)
}
let Blast: Sprite = null
let GravBomb: Sprite = null
let BR: Sprite = null
let Bullet: Sprite = null
let statusbar: StatusBarSprite = null
let Knife: Sprite = null
let launched = false
let Zenith: Sprite = null
let myMenu4: miniMenu.MenuSprite = null
let myMenu3: miniMenu.MenuSprite = null
let Grav_Bomb_selection = false
let Big_Rocket = false
let myMenu2: miniMenu.MenuSprite = null
let Menu_Is_Running = false
let Biomes: tiles.TileMapData[] = []
let Enemy_List: Image[] = []
let Factory: tiles.TileMapData = null
let Forest: tiles.TileMapData = null
let Dessert: tiles.TileMapData = null
let Right = 0
let left = 0
let Weapon_Selection_Boomerang = false
let Weapon_Selection_Gun = false
Weapon_Selection_Gun = false
Weapon_Selection_Boomerang = false
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...........................................222222222...2222222222222...22222222222222222...22222222222...222....................................................
    ..........................................22222222222.222222222222222.2222222222222222222.2222222222222.22222...................................................
    ..........................................22222..2222.222222222222222..22222222222222222..2222222222222.22222...................................................
    ..........................................2222....222.222222222222222...222222222222222...2222222222222.22222...................................................
    ..........................................22222..2222.222222222222222....2222214222222....222222.....22.22222...................................................
    ..........................................22222222222.222222222222222.....22214142222.....22222.........22222...................................................
    ..........................................2222222222..222222222222222......214141412......2222......222.22222...................................................
    ..........................................22222........2222222222222........2141412.......2222.....2222.22222...88..............................................
    ..........................................22222..........222222222...........21412........2222....22222.22222..8bb8.............................................
    ..........................................22222.............222..............22122........2222222222222.22222.8b91b8............................................
    ..........................................22222.............222..............22222........2222222222222.22222.8b19b8............................................
    ..........................................22222.............222..............22122........2222222222222.22222..8bb8.............................................
    ..........................................22222..........222222222...........22222........2222....22222.22222...88..............................................
    ..........................................22222........2222222222222........2224222.......2222.....2222.22222...................................................
    ..........................................22222.......222222222222222......222422222......2222......222.22222...................................................
    ..........................................22222.......222222222222222.....22222222222.....22222.........22222...................................................
    ..........................................22222.......222222222222222....2222221222222....222222.....22.2222222222222...........................................
    ..........................................22222.......222222222222222...222221422222222...2222222222222.22222222222222..........................................
    ..........................................22222.......222222222222222..22222141412222222..2222222222222.22222222222222..........................................
    ..........................................22222.......222222222222222.2222214141414222222.2222222222222.22222222222222..........................................
    ...........................................222.........2222222222222...22222222222222222...22222222222...222222222222...........................................
    ................................................................................................................................................................
    ..........................................................22....22.2...2..22..22...2..2..22.222.................................................................
    ..........................................................2.2..2...2...2.2..2.2.2..2.2..2...2..2................................................................
    ..........................................................2.2..222.2.2.2.2..2.2.2..22...222.2..2................................................................
    ..........................................................22...2....2.2..2..2.22...22...2...2..2................................................................
    ..........................................................2.2..2....2.2..2..2.2.2..2.2..2...2..2................................................................
    ..........................................................2..2..22..2.2...22..2..2.2..2..22.222.................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
left = 0
Right = 0
Dessert = tileUtil.createSmallMap(tilemap`level38`)
Forest = tileUtil.createSmallMap(tilemap`level32`)
Factory = tileUtil.createSmallMap(tilemap`level30`)
Enemy_List = [
img`
    2 . . 2 . . . 2 
    . 2 . . 2 . 2 . 
    . 2 2 2 2 2 2 . 
    . 2 3 2 2 3 2 . 
    . 2 2 2 2 2 2 . 
    . . 2 2 2 2 . . 
    . . . . . . . . 
    . . 2 2 2 2 . . 
    `,
img`
    . . . . . . . . 
    . . . 8 8 . . . 
    . . 8 b b 8 . . 
    . 8 b 9 1 b 8 . 
    . 8 b 1 9 b 8 . 
    . . 8 b b 8 . . 
    . . . 8 8 . . . 
    . . . . . . . . 
    `,
img`
    . . 6 . . 6 . . 
    . . 6 6 6 6 . . 
    . . 5 6 6 5 . . 
    6 6 6 6 6 6 6 6 
    6 6 . 6 6 . 6 6 
    6 . . 6 6 . . 6 
    . . 6 6 6 6 . . 
    . 6 6 6 6 6 6 . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f f f . . . 
    . . f c 2 3 c c c c 3 2 c f . . 
    . f c c c 2 3 c c 3 2 c c c f . 
    . f 2 c c c 2 c c 2 c c c 2 f . 
    . f 3 2 c c c f f c c c 2 3 f . 
    . f c 3 2 c f . . f c 2 3 c f . 
    . f c c c f . . . . f c c c f . 
    . f c c c f . . . . f c c c f . 
    . f c 3 2 c f . . f c 2 3 c f . 
    . f 3 2 c c c f f c c c 2 3 f . 
    . f 2 c c c 2 c c 2 c c c 2 f . 
    . f c c c 2 3 c c 3 2 c c c f . 
    . . f c 2 3 c c c c 3 2 c f . . 
    . . . f f f f f f f f f f . . . 
    . . . . . . . . . . . . . . . . 
    `
]
Biomes = [Dessert, Forest, Factory]
effects.blizzard.startScreenEffect()
scene.setBackgroundColor(0)
Menu_Is_Running = true
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("Descend", img`
    . . . . . . . . . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e 9 9 9 9 9 9 9 9 9 9 9 9 e . 
    . e 9 9 9 9 9 9 9 9 9 9 9 9 e . 
    . e 9 9 9 9 9 9 9 9 9 9 9 9 e . 
    . e 2 9 9 9 9 9 9 9 9 9 9 2 e . 
    . e 2 2 9 9 9 9 9 9 9 9 2 2 e . 
    . e 2 2 4 4 4 4 4 4 4 4 2 2 e . 
    . e 2 2 2 4 4 4 4 4 4 2 2 2 e . 
    . e 2 2 2 4 4 4 4 4 4 2 2 2 e . 
    . e 2 2 2 4 4 4 4 4 4 2 2 2 e . 
    . e 2 2 2 2 b 4 4 b 2 2 2 2 e . 
    . e 2 2 2 2 b b b b 2 2 2 2 e . 
    . e 2 2 2 2 2 b b 2 2 2 2 2 e . 
    . e e e e e e e e e e e e e e . 
    . . . . . . . . . . . . . . . . 
    `),
miniMenu.createMenuItem("Weapon Selection", img`
    . . . . . . . . . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e 4 4 b 4 4 4 b 4 4 b 4 4 e . 
    . e 4 4 b b 4 b b 4 b b 4 4 e . 
    . e b b b b b b b b b b b b e . 
    . e 4 b b b 2 2 2 2 b b b 4 e . 
    . e 4 4 b 2 3 3 3 3 b b 4 4 e . 
    . e b b b b 3 3 3 3 b b b 4 e . 
    . e 4 b b b 2 2 2 2 b b b b e . 
    . e 4 4 b b 2 2 2 2 b b 4 4 e . 
    . e 4 b b b 2 b b 2 b b b 4 e . 
    . e b b b b b b b b b b b b e . 
    . e 4 4 b b 4 b b 4 b b 4 4 e . 
    . e 4 4 b 4 4 b 4 4 4 b 4 4 e . 
    . e e e e e e e e e e e e e e . 
    . . . . . . . . . . . . . . . . 
    `),
miniMenu.createMenuItem("Version (9)", img`
    . . . . . . . . . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e 4 4 4 4 4 4 4 4 4 4 4 4 e . 
    . e 2 4 2 2 2 4 2 2 2 4 2 2 e . 
    . e 2 4 2 2 2 4 2 2 2 4 2 2 e . 
    . e 2 2 4 2 4 2 2 2 2 4 2 2 e . 
    . e 2 2 4 2 4 2 2 2 2 4 2 2 e . 
    . e 2 2 2 4 2 2 2 2 2 4 2 2 e . 
    . e 2 2 2 4 2 2 2 2 2 4 2 2 e . 
    . e 2 2 4 2 4 2 2 2 2 4 2 2 e . 
    . e 2 2 4 2 4 2 2 2 2 4 2 2 e . 
    . e 2 4 2 2 2 4 2 2 2 4 2 2 e . 
    . e 2 4 2 2 2 4 2 2 2 4 2 2 e . 
    . e 4 4 4 4 4 4 4 4 4 4 4 4 e . 
    . e e e e e e e e e e e e e e . 
    . . . . . . . . . . . . . . . . 
    `),
miniMenu.createMenuItem("Enemy List", img`
    . . . . . . . . . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e f 3 2 2 2 2 2 2 2 2 2 2 e . 
    . e 9 f 3 2 2 2 2 2 3 3 3 2 e . 
    . e 7 9 f 3 2 2 2 2 3 3 3 2 e . 
    . e 7 7 9 f 3 2 2 2 3 2 3 2 e . 
    . e 7 7 7 9 f 3 2 2 2 2 2 2 e . 
    . e 7 7 7 7 9 f 3 2 2 2 2 2 e . 
    . e 7 7 7 7 7 9 f 3 2 2 2 2 e . 
    . e 7 7 a 7 7 7 9 f 3 2 2 2 e . 
    . e 7 a 9 a 7 7 7 9 f 3 2 2 e . 
    . e 7 7 a 7 7 7 7 7 9 f 3 2 e . 
    . e 7 7 7 7 7 7 7 7 7 9 f 3 e . 
    . e 7 7 7 7 7 7 7 7 7 7 9 f e . 
    . e e e e e e e e e e e e e e . 
    . . . . . . . . . . . . . . . . 
    `),
miniMenu.createMenuItem("Help", img`
    . . . . . . . . . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e 2 2 d d d d d d d d 2 2 e . 
    . e 2 2 d a a a a a a d 2 2 e . 
    . e 2 2 d c c c c c a d 2 2 e . 
    . e 2 2 d d d d d c a d 2 2 e . 
    . e 2 2 2 d d d d c a d 2 2 e . 
    . e 2 2 2 d c c c c a d 2 2 e . 
    . e 2 2 2 d c a a a a d 2 2 e . 
    . e 2 2 2 d c a d d d d 2 2 e . 
    . e 2 2 2 d d d d 2 2 2 2 2 e . 
    . e 2 2 2 d c a d 2 2 2 2 2 e . 
    . e 2 2 2 d a a d 2 2 2 2 2 e . 
    . e 2 2 2 d d d d 2 2 2 2 2 e . 
    . e e e e e e e e e e e e e e . 
    . . . . . . . . . . . . . . . . 
    `),
miniMenu.createMenuItem("Practice Room", img`
    . . . . . . . . . . . . . . . . 
    . e e e e e e e e e e e e e e . 
    . e 8 8 8 8 8 8 8 8 8 8 8 8 e . 
    . e 8 7 7 7 7 7 7 7 7 7 7 8 e . 
    . e 8 7 d d d d d d d d 7 8 e . 
    . e 8 7 d d 3 3 3 3 d d 7 8 e . 
    . e 8 7 d 3 2 2 2 2 d d 7 8 e . 
    . e 8 7 d d 2 2 2 2 d d 7 8 e . 
    . e 8 7 d d 3 3 3 3 d d 7 8 e . 
    . e 8 7 d d 3 3 3 3 d d 7 8 e . 
    . e 8 7 d d 3 d d 3 d d 7 8 e . 
    . e 8 7 d d d d d d d d 7 8 e . 
    . e 8 7 7 7 7 7 7 7 7 7 7 8 e . 
    . e 8 8 8 8 8 8 8 8 8 8 8 8 e . 
    . e e e e e e e e e e e e e e . 
    . . . . . . . . . . . . . . . . 
    `)
)
myMenu.setFrame(img`
    a a a a a a a a a a a a a a a 
    b c c c c c c c c c c c c c a 
    b c b b b b b b b b b b b c a 
    b c a c c c c c c c c c b c a 
    b c a c a a a a a a a c b c a 
    b c a c b c c c c c a c b c a 
    b c a c b c b b b c a c b c a 
    b c a c b c a c b c a c b c a 
    b c a c b c a a b c a c b c a 
    b c a c b c c c c c a c b c a 
    b c a c b b b b b b a c b c a 
    b c a c c c c c c c c c b c a 
    b c a a a a a a a a a a b c a 
    b c c c c c c c c c c c c c a 
    b b b b b b b b b b b b b b b 
    `)
myMenu.setDimensions(100, 30)
myMenu.setPosition(80, 80)
myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    if (selectedIndex == 0) {
        myMenu.close()
        Start_Game()
    } else if (selectedIndex == 1) {
        myMenu.setButtonEventsEnabled(false)
        myMenu2 = miniMenu.createMenu(
        miniMenu.createMenuItem("Railgun", img`
            . . . . . . . . . . . . . . . . 
            . e e e e e e e e e e e e e e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e d b b b b b b b b b b d e . 
            . e a b b b a a a a a a a a e . 
            . e a a a a a a a a a a a a e . 
            . e d d d d d d f d b a a a e . 
            . e d d d d d d d f d a a a e . 
            . e d d d d d d d d f a a a e . 
            . e d d d d d d d d d a a d e . 
            . e d d d d d d d d d d d d e . 
            . e e e e e e e e e e e e e e . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Boomerang", img`
            . . . . . . . . . . . . . . . . 
            . e e e e e e e e e e e e e e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e d d d b b b b b b d d d e . 
            . e d d b a b b b b a b d d e . 
            . e d a a b d d d d b a a d e . 
            . e a a d d d d d d d d a a e . 
            . e a d d d d d d d d d d a e . 
            . e d a d d d d d d d d a d e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e d d d d d d d d d d d d e . 
            . e e e e e e e e e e e e e e . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Big Rocket", img`
            e e e e e e e e e e e e e e e e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e d d a a a a a a a a a d d d e 
            e d d a a b a b a b a b a d d e 
            e d d a b b a b a b a b a d d e 
            e d d a b b b b a b a b a d d e 
            e d d a b b b b b b a b a d d e 
            e d d a a a a a a a a a d d d e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e e e e e e e e e e e e e e e e 
            `),
        miniMenu.createMenuItem("Shard Bomb", img`
            e e e e e e e e e e e e e e e e 
            e d d d d d d d d d d d d d d e 
            e d d d d d d a a d d d d d d e 
            e d d d d a a 7 7 a a d d d d e 
            e d d d a 7 7 9 9 7 7 a d d d e 
            e d d a 7 9 9 9 9 9 9 7 a d d e 
            e d d a 7 9 9 9 9 9 9 7 a d d e 
            e d a 7 9 9 9 9 9 9 9 9 7 a d e 
            e d a 7 9 9 9 9 9 9 9 9 7 a d e 
            e d d a 7 9 9 9 9 9 9 7 a d d e 
            e d d a 7 9 9 9 9 9 9 7 a d d e 
            e d d d a 7 7 9 9 7 7 a d d d e 
            e d d d d a a 7 7 a a d d d d e 
            e d d d d d d a a d d d d d d e 
            e d d d d d d d d d d d d d d e 
            e e e e e e e e e e e e e e e e 
            `)
        )
        myMenu2.setTitle("Weapon Selection")
        myMenu2.setDimensions(100, 32)
        myMenu2.setPosition(80, 80)
        myMenu2.onButtonPressed(controller.B, function (selection, selectedIndex) {
            myMenu2.close()
            myMenu.setButtonEventsEnabled(true)
        })
        myMenu2.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                Weapon_Selection_Gun = true
                Weapon_Selection_Boomerang = false
                myMenu.setButtonEventsEnabled(true)
            } else if (selectedIndex == 1) {
                Weapon_Selection_Gun = false
                Weapon_Selection_Boomerang = true
                myMenu.setButtonEventsEnabled(true)
            } else if (selectedIndex == 2) {
                Big_Rocket = true
                Weapon_Selection_Gun = false
                Weapon_Selection_Boomerang = false
                myMenu.setButtonEventsEnabled(true)
            } else if (selectedIndex == 3) {
                Grav_Bomb_selection = true
                Big_Rocket = false
                Weapon_Selection_Gun = false
                Weapon_Selection_Boomerang = false
                myMenu.setButtonEventsEnabled(true)
            }
            myMenu2.close()
            myMenu.moveSelection(miniMenu.MoveDirection.Up)
        })
    } else if (selectedIndex == 3) {
        myMenu.setButtonEventsEnabled(false)
        myMenu3 = miniMenu.createMenu(
        miniMenu.createMenuItem("Tracker Eye", img`
            . . . . . . . . . . . . . . . . 
            . e e e e e e e e e e e e e e . 
            . e 2 2 2 2 2 2 2 2 2 2 2 2 e . 
            . e 2 2 2 d d d d d d 2 2 2 e . 
            . e 2 2 d d d d d d d d 2 2 e . 
            . e 2 d d d d 8 8 d d d d 2 e . 
            . e 2 d d d 8 b b 8 d d d 2 e . 
            . e 2 d d 8 b 9 1 b 8 d d 2 e . 
            . e 2 d d 8 b 1 9 b 8 d d 2 e . 
            . e 2 d d d 8 b b 8 d d d 2 e . 
            . e 2 d d d d 8 8 d d d d 2 e . 
            . e 2 2 d d d d d d d d 2 2 e . 
            . e 2 2 2 d d d d d d 2 2 2 e . 
            . e 2 2 2 2 2 2 2 2 2 2 2 2 e . 
            . e e e e e e e e e e e e e e . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Skull Demon", img`
            e e e e e e e e e e e e e e e e 
            e 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
            e 2 2 2 d d d d d d d d 2 2 2 e 
            e 2 2 d d d d d d d d d d 2 2 e 
            e 2 d d 2 d d 2 d d d 2 d d 2 e 
            e 2 d d d 2 d d 2 d 2 d d d 2 e 
            e 2 d d d 2 2 2 2 2 2 d d d 2 e 
            e 2 d d d 2 3 2 2 3 2 d d d 2 e 
            e 2 d d d 2 2 2 2 2 2 d d d 2 e 
            e 2 d d d d 2 2 2 2 d d d d 2 e 
            e 2 d d d d d d d d d d d d 2 e 
            e 2 d d d d 2 2 2 2 d d d d 2 e 
            e 2 2 d d d d d d d d d d 2 2 e 
            e 2 2 2 d d d d d d d d 2 2 2 e 
            e 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
            e e e e e e e e e e e e e e e e 
            `),
        miniMenu.createMenuItem("Ghoul Bat", img`
            e e e e e e e e e e e e e e e e 
            e 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
            e 2 2 2 d d d d d d d d 2 2 2 e 
            e 2 2 d d d d d d d d d d 2 2 e 
            e 2 d d d d 6 d d 6 d d d d 2 e 
            e 2 d d d d 6 6 6 6 d d d d 2 e 
            e 2 d d d d 5 6 6 5 d d d d 2 e 
            e 2 d d 6 6 6 6 6 6 6 6 d d 2 e 
            e 2 d d 6 6 d 6 6 d 6 6 d d 2 e 
            e 2 d d 6 d d 6 6 d d 6 d d 2 e 
            e 2 d d d d 6 6 6 6 d d d d 2 e 
            e 2 d d d 6 6 6 6 6 6 d d d 2 e 
            e 2 2 d d d d d d d d d d 2 2 e 
            e 2 2 2 d d d d d d d d 2 2 2 e 
            e 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
            e e e e e e e e e e e e e e e e 
            `),
        miniMenu.createMenuItem("Inferno Core", img`
            e e e e e e e e e e e e e e e e 
            e 2 2 f f f f f f f f f f 2 2 e 
            e 2 f c 2 3 c c c c 3 2 c f 2 e 
            e f c c c 2 3 c c 3 2 c c c f e 
            e f 2 c c c 2 c c 2 c c c 2 f e 
            e f 3 2 c c c f f c c c 2 3 f e 
            e f c 3 2 c f d d f c 2 3 c f e 
            e f c c c f d d d d f c c c f e 
            e f c c c f d d d d f c c c f e 
            e f c 3 2 c f d d f c 2 3 c f e 
            e f 3 2 c c c f f c c c 2 3 f e 
            e f 2 c c c 2 c c 2 c c c 2 f e 
            e f c c c 2 3 c c 3 2 c c c f e 
            e 2 f c 2 3 c c c c 3 2 c f 2 e 
            e 2 2 f f f f f f f f f f 2 2 e 
            e e e e e e e e e e e e e e e e 
            `)
        )
        myMenu3.setDimensions(100, 32)
        myMenu3.setPosition(myMenu.x, myMenu.y)
        myMenu3.setTitle("Enemy List")
        myMenu3.onButtonPressed(controller.B, function (selection, selectedIndex) {
            myMenu3.close()
            myMenu.setButtonEventsEnabled(true)
        })
    } else if (selectedIndex == 4) {
        myMenu.setButtonEventsEnabled(false)
        story.printText("Move using arrow keys or WASD ", 80, 80, 1, 2)
        story.printText("To use weapons; press A (Spacebar or Z) ", 80, 80, 1, 2)
        myMenu.setButtonEventsEnabled(true)
    } else if (selectedIndex == 5) {
        myMenu4 = miniMenu.createMenu(
        miniMenu.createMenuItem("Training Room I", img`
            . . . . . . . . . . . . . . . . 
            . e e e e e e e e e e e e e e . 
            . e 1 1 1 1 1 1 1 1 1 1 1 1 e . 
            . e 1 9 9 9 9 9 9 9 9 9 9 1 e . 
            . e 1 9 1 1 9 9 9 9 1 1 9 1 e . 
            . e 1 9 1 2 9 9 9 9 2 1 9 1 e . 
            . e 1 9 9 9 9 9 9 9 9 9 9 1 e . 
            . e 1 9 9 9 9 9 9 9 9 9 9 1 e . 
            . e 1 9 9 9 9 9 9 9 9 9 9 1 e . 
            . e 1 9 9 9 9 9 9 9 9 9 9 1 e . 
            . e 1 9 1 2 9 9 9 9 2 1 9 1 e . 
            . e 1 9 1 1 9 9 9 9 1 1 9 1 e . 
            . e 1 9 9 9 9 9 9 9 9 9 9 1 e . 
            . e 1 1 1 1 1 1 1 1 1 1 1 1 e . 
            . e e e e e e e e e e e e e e . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Training Room II", img`
            . . . . . . . . . . . . . . . . 
            . e e e e e e e e e e e e e e . 
            . e 6 6 6 6 6 6 6 6 6 6 6 6 e . 
            . e 6 2 5 5 5 5 5 5 5 5 2 6 e . 
            . e 6 5 5 5 5 5 5 5 5 5 5 6 e . 
            . e 6 5 5 5 5 5 5 5 5 5 5 6 e . 
            . e 6 5 5 5 5 6 6 5 5 5 5 6 e . 
            . e 6 5 5 5 6 6 6 6 5 5 5 6 e . 
            . e 6 5 5 2 6 6 6 6 2 5 5 6 e . 
            . e 6 5 5 5 5 6 6 5 5 5 5 6 e . 
            . e 6 5 5 5 5 5 5 5 5 5 5 6 e . 
            . e 6 5 5 5 5 5 5 5 5 5 5 6 e . 
            . e 6 5 5 5 5 5 5 5 5 5 5 6 e . 
            . e 6 6 6 6 6 6 6 6 6 6 6 6 e . 
            . e e e e e e e e e e e e e e . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Training Room III", img`
            e e e e e e e e e e e e e e e e 
            e 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e 
            e 4 2 2 1 1 1 1 1 1 1 1 2 2 4 e 
            e 4 2 2 1 1 1 1 1 1 1 1 2 2 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 2 2 1 1 1 1 1 4 e 
            e 4 1 1 1 1 2 2 2 2 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 1 1 1 1 1 1 1 1 1 1 1 1 4 e 
            e 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e 
            e e e e e e e e e e e e e e e e 
            `),
        miniMenu.createMenuItem("Training Room IV", img`
            . . . . . . . . . . . . . . . . 
            . e e e e e e e e e e e e e e . 
            . e 7 7 7 7 7 7 7 7 7 7 7 7 e . 
            . e 7 9 9 9 9 9 9 9 9 9 9 7 e . 
            . e 7 9 9 9 9 9 9 9 9 9 9 7 e . 
            . e 7 9 9 9 9 9 9 9 9 9 9 7 e . 
            . e 7 9 9 9 2 b b 2 9 9 9 7 e . 
            . e 7 9 9 9 b 2 2 b 9 9 9 7 e . 
            . e 7 9 9 9 b 2 2 b 9 9 9 7 e . 
            . e 7 9 9 9 2 9 9 2 9 9 9 7 e . 
            . e 7 9 9 9 9 9 9 9 9 9 9 7 e . 
            . e 7 9 9 9 9 9 9 9 9 9 9 7 e . 
            . e 7 9 9 9 9 9 9 9 9 9 9 7 e . 
            . e 7 7 7 7 7 7 7 7 7 7 7 7 e . 
            . e e e e e e e e e e e e e e . 
            . . . . . . . . . . . . . . . . 
            `)
        )
        myMenu4.setDimensions(100, 32)
        myMenu4.setTitle("Practice Room ")
        myMenu4.setPosition(myMenu.x, myMenu.y)
        myMenu.setButtonEventsEnabled(false)
        myMenu4.onButtonPressed(controller.B, function (selection, selectedIndex) {
            myMenu4.close()
            myMenu.setButtonEventsEnabled(true)
        })
        myMenu4.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                Sprite_Spawn()
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level60`))
                tiles.placeOnTile(Zenith, tiles.getTileLocation(9, 13))
            } else if (selectedIndex == 1) {
                Sprite_Spawn()
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level67`))
                tiles.placeOnTile(Zenith, tiles.getTileLocation(9, 13))
            } else if (selectedIndex == 2) {
                Sprite_Spawn()
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level71`))
                tiles.placeOnTile(Zenith, tiles.getTileLocation(9, 13))
            } else if (selectedIndex == 3) {
                Sprite_Spawn()
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level74`))
                tiles.placeOnTile(Zenith, tiles.getTileLocation(9, 13))
            }
            myMenu.setButtonEventsEnabled(true)
            myMenu4.close()
            myMenu.close()
        })
    }
})
game.onUpdateInterval(5000, function () {
    if (Menu_Is_Running == false) {
        if (Big_Rocket == true) {
            info.changeLifeBy(1)
        }
        if (Grav_Bomb_selection == true) {
            info.changeLifeBy(1)
        }
    }
})
game.onUpdateInterval(500, function () {
    if (Menu_Is_Running == false) {
        if (Weapon_Selection_Gun == true) {
            info.changeLifeBy(1)
        }
    }
})
