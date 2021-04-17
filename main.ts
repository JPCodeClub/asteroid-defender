namespace SpriteKind {
    export const Home = SpriteKind.create()
    export const Defence = SpriteKind.create()
    export const Shot = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Home, function (sprite, otherSprite) {
    sprite.setKind(SpriteKind.Shot)
    sprite.destroy(effects.disintegrate, 200)
    otherSprite.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
    population += -10
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        bullet = sprites.createProjectileFromSprite(img`
            . 1 b . 
            1 1 b b 
            b b b b 
            . b b . 
            `, cannon, 0, 0)
        a = Math.atan2(crosshair.y - bullet.y, crosshair.x - bullet.x)
        bullet.setVelocity(Math.cos(a) * 50, Math.sin(a) * 50)
        bullet.startEffect(effects.trail)
        music.playTone(220, music.beat(BeatFraction.Half))
        ammo += -1
    } else {
        ammo = 0
    }
})
function createBase () {
    game.splash("Level " + convertToText(level))
    population = 100
    ammo = 50
    info.setScore(level)
    info.setLife(4)
    buildings = [img`
        . 2 . . . . . . . d 1 . . . . . 
        . . 6 . . . . . . b d 1 . . . . 
        . . 9 6 . . . . 6 6 6 d 1 . . . 
        . . . 9 6 . 6 6 6 . b d 1 . . . 
        . . . . 9 6 6 . . . b d 1 . . . 
        . . . . 6 6 6 . . . b d 1 . . . 
        . . . . 6 . 9 6 . . b d 1 . . . 
        . . . 6 6 . . 9 6 . b d 1 . . . 
        . . . 6 . . . . 9 b b d 1 . . . 
        . 1 d 6 b b b b b b d 1 . . . . 
        . . 1 d d d d d d d 1 . . . . . 
        . . . 1 1 1 d d 1 1 . . . . . . 
        . . . . . 1 1 d d . . . . . . . 
        . . . . 1 1 d d d b . . . . . . 
        . . 1 1 1 1 1 d d d d b b b . . 
        . 1 1 1 1 1 d d d d d d d d b . 
        `, img`
        . . d d d d d d b b b 2 b b . . 
        . d b b b b b b b b b b b b b . 
        d b 9 9 5 9 9 9 9 9 9 5 9 9 b c 
        . b b b b b b b b b b b b b c . 
        . . b b b b b b b c c c c c . . 
        . . . . . d d b c c . . . . . . 
        . . . . . . d b c . . . . . . . 
        . . . . . . d b c . . . . . . . 
        . . . . . . d b c . . . . . . . 
        . . . . . . d b c . . . . . . . 
        . . . . . d d b c c . . . . . . 
        . . . . . d b b b c . . . . . . 
        . . . . . d b b c c . . . . . . 
        . . . . . d b c b c . . . . . . 
        . . . . . d b b c c . . . . . . 
        . . . . . d b c b c . . . . . . 
        `, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . 4 . . 4 . . . . . . . 4 . 4 . 
        . 4 e . 4 e . . . . . . 4 e 4 e 
        . 4 e . 4 e . . . . . . 4 e 4 e 
        4 4 4 4 4 4 . . . . . 4 4 4 4 4 
        4 e e e e 4 . b c b c 4 e e e 4 
        4 9 e 9 e 4 . b c b c 4 9 e 9 4 
        4 3 e 3 e 4 4 4 4 4 4 4 3 e 3 4 
        4 e e e e 4 e e e e e 4 e e e 4 
        4 e e e e 4 e 9 e 9 e 4 e e e 4 
        4 9 e 9 e 4 e 3 e 3 e 4 9 e 9 4 
        4 3 e 3 e 4 e e e e e 4 3 e 3 4 
        4 e e e e 4 e e e e e 4 e e e 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        `, img`
        . . . 9 6 6 6 6 6 6 6 6 6 8 . . 
        . . . 9 9 6 6 6 6 6 6 6 8 8 . . 
        . . . 9 6 5 5 6 6 5 5 8 6 8 . . 
        . . . 9 9 5 5 6 6 5 5 6 8 8 . . 
        . . . 9 6 6 6 6 6 6 6 8 6 8 . . 
        . . . 9 9 6 6 6 6 6 6 6 8 8 . . 
        . . . 9 6 5 5 6 6 5 5 8 6 8 . . 
        . . . 9 9 5 5 6 6 5 5 6 8 8 . . 
        . . . 9 6 6 6 6 6 6 6 8 6 8 . . 
        . . . 9 9 6 6 6 6 6 6 6 8 8 . . 
        . . . 9 6 5 5 6 6 5 5 8 6 8 . . 
        . . . 9 9 5 5 6 6 5 5 6 8 8 . . 
        . . . 9 6 6 6 6 6 6 6 8 6 8 . . 
        . . . 9 9 6 6 6 6 6 6 6 8 8 . . 
        . . . 9 6 6 6 6 6 6 6 8 6 8 . . 
        . . . 9 9 6 6 6 6 6 6 6 8 8 . . 
        `, img`
        . . . . . . 5 2 5 . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . 1 . 1 . 1 . . . . . . 
        . . . . . 2 1 1 1 2 . . . . . . 
        . . . . . 2 . 1 . 2 . . . . . . 
        . . . . 2 2 . 2 . 2 2 . . . . . 
        . . . . 2 . 2 2 2 . 2 . . . . . 
        . . . . 1 . . 2 . . 1 . . . . . 
        . . . 1 1 . . 2 . . 1 1 . . . . 
        . . . 1 1 . . 1 . . 1 1 . . . . 
        . . . 1 . 1 . 1 . 1 . 1 . . . . 
        . . . 1 . . 1 1 1 . . 1 . . . . 
        . . . . . . . 1 . . . . . . . . 
        `]
    cannonIMG = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . e f f 4 . . . . . . 
        . . . . . . e e d 4 . . . . . . 
        . . . . . . e e d 4 . . . . . . 
        . . . . . . e e d 4 . . . . . . 
        . . . . . . e e d 4 . . . . . . 
        . . . . . . e e d 4 . . . . . . 
        . . . . 8 8 e e d 4 8 8 . . . . 
        . . 8 f f f c c a a f f 8 8 . . 
        . 8 8 8 8 a a 3 3 1 3 3 8 8 8 . 
        8 8 8 8 8 8 a a 3 1 3 3 3 8 8 8 
        8 8 8 8 8 8 a a 3 3 1 3 3 8 8 8 
        `
    cannonIMGR = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . e f f . . 
        . . . . . . . . . . e f f 4 . . 
        . . . . . . . . . e e d 4 . . . 
        . . . . . . . . e e d 4 . . . . 
        . . . . . . . e e d 4 . . . . . 
        . . . . 8 8 e e d 4 a a . . . . 
        . . 8 f f f c c a a f f a a . . 
        . 8 8 8 8 a a 3 3 3 3 1 3 a a . 
        8 8 8 8 8 8 a a 3 3 3 1 3 3 a a 
        8 8 8 8 8 8 a a 3 3 3 3 1 3 a a 
        `
    cannonIMGL = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . e f f . . 
        . . . . . . . . . . e f f 4 . . 
        . . . . . . . . . e e d 4 . . . 
        . . . . . . . . e e d 4 . . . . 
        . . . . . . . e e d 4 . . . . . 
        . . . . 8 8 e e d 4 a a . . . . 
        . . 8 f f f c c a a f f a a . . 
        . 8 8 8 8 a a 3 3 3 3 1 3 a a . 
        8 8 8 8 8 8 a a 3 3 3 1 3 3 a a 
        8 8 8 8 8 8 a a 3 3 3 3 1 3 a a 
        `
    cannonIMGL.flipX()
    for (let index = 0; index <= 4; index++) {
        if (index != 2) {
            base = sprites.create(buildings[randint(0, buildings.length - 1)], SpriteKind.Home)
            base.setPosition(scene.screenWidth() * 0.75 / 4 * index + 20 + randint(-10, 10), 110)
        }
    }
}
info.onCountdownEnd(function () {
    music.powerUp.playUntilDone()
    level += 1
    difficulty = difficulty * 1.25
    clearLevel()
    info.startCountdown(25 + level * 5)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Defence, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 200)
    otherSprite.destroy(effects.fire, 500)
    info.setLife(0)
})
function clearLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Home)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Projectile)) {
        value3.destroy()
    }
    createBase()
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    population += -10
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.Shot)
    otherSprite.destroy(effects.fire, 200)
    sprite.destroy()
    if (Math.percentChance(50)) {
        music.playTone(392, music.beat(BeatFraction.Quarter))
        music.playTone(440, music.beat(BeatFraction.Quarter))
    } else {
        music.playTone(392, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
    }
})
let asteroid: Sprite = null
let base: Sprite = null
let cannonIMGL: Image = null
let cannonIMGR: Image = null
let buildings: Image[] = []
let a = 0
let bullet: Sprite = null
let ammo = 0
let population = 0
let cannonIMG: Image = null
let cannon: Sprite = null
let difficulty = 0
let level = 0
let crosshair: Sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff77888888888888888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777777888888888888888888888887ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffff777777777777888888888888888888888777777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffff777777777777777788888888888888888888777777777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff7777777777777777777788888888888888888877777777777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffff7777777777777777777777778888888888888888877777777777777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff77777777777777777777777777888888888888888887777777777777777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff7777777777777777777777777778888888888888888887777777777777777fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff77777777777777777777777777777888888888888888888777777777777777777fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffff777777777777777777777777777777888888888888888888887777777777777777777fffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff77777777777777777777777777777778888888888888888888887777777777777777777ffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff777777777777777777777777777777777888888888888888888888877777777777777777777ffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff77777777777777777777777777777777788888888888888888888888888777777777777777777fffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff7777777777777777777777777777777788888888888888888888888888888777777777777777777ffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffff77777777777777777777777777777777788888888888888888888888888888888777777777777777777ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff7777777777777777777777777777777778888888888888888888888888888888888777777777777777777fffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff777777777777777778877777777777777788888888888888888888888888888888887777777777777777777ffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff88777777777777778888888777777777788888888888888888888888888888888888887777777777777777777fffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff8888777777777778888888888888888888888888888888888888888888888888888888887777777777777777778ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff888888888888888888888888888888888888888888888888888888888888888888888888888888888777777777888fffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff88888888888888888888888888888888888888888888888888888888888888888888888888888888888877777888888ffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888fffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff8888888888888cccccccccccccc8888888888888888888888888888888888888888888888888888888888888888888888fffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff88888888ccccccccccccccccccccccc88888888888888888888888888888888888888cccccccccccccccccccccccccc8888ffffffffffffffffffffffffffffffffffffbb
    bbbbffffffffffffffffff8888cccccccccccccccccccccccccccccccc888888888888888888888888ccccccccccccccccccbbbbbbbbcccccccccccccccfffffffffffffffffffffffffffffffbbbbbb
    bbbbbbbbbfffffffffccccccccccccccccccccccccccccccccccccccccccccccccc888888888ccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `)
let asteroidsBig = [
img`
    . . . . . c c c c c c . . . . . 
    . . . c c c 5 5 4 4 c c c . . . 
    . . c c 5 5 5 4 4 4 4 4 c c c . 
    c c c 5 4 4 4 4 4 c e 4 4 4 c c 
    c 4 5 4 4 c 4 4 c e 4 4 4 4 4 c 
    c 4 4 4 4 e c c c e 4 4 4 4 e c 
    c 4 4 4 4 4 e e e e 4 4 4 4 e c 
    c 4 4 4 4 4 4 4 4 4 4 4 e e e c 
    c c 4 4 4 4 4 4 4 e e e e e c c 
    . c c 4 e e e e e e e e c c c . 
    . . . c c c e c c c c c c . . . 
    . . . . . c c c . . . . c c c . 
    . . . . . . . . . . . c 5 4 4 c 
    . . . . . . . . . . . c 4 e e c 
    . . . . . . . . . . . c 4 e c . 
    . . . . . . . . . . . . c c . . 
    `,
img`
    . . . . . . c c c c . . . . . . 
    . . c c c c 5 4 4 c c c c . . . 
    . c c 5 5 5 4 4 4 4 4 4 c c . . 
    c c 5 4 4 4 4 4 4 4 4 4 4 c c . 
    c 5 4 4 4 c e 4 4 4 4 4 4 4 c . 
    c 4 4 4 c c e 4 4 4 4 4 4 4 4 c 
    c 4 4 e e e e 4 4 c e 4 4 4 4 c 
    c 4 4 4 4 4 4 4 4 e e 4 4 4 e c 
    c c 4 4 4 4 4 4 4 4 4 4 4 e e c 
    . c 4 4 4 4 4 4 4 4 4 4 e e e c 
    . c 4 4 4 4 4 4 4 4 4 4 e e e c 
    . c c 4 4 4 4 4 4 4 e e e e c c 
    . . c c 4 4 e e e e e e e c c . 
    . . . c c e e e e e e e c c . . 
    . . . . . c c c e c c c c . . . 
    . . . . . . . c c c . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . c c c c c c c c c c . . 
    . . c c 5 5 5 5 5 5 4 4 4 c c . 
    . c c 5 4 4 4 4 4 4 4 4 4 4 c c 
    . c 5 4 4 4 c c c 4 4 4 4 4 4 c 
    c c 5 4 4 4 e c c c 4 4 4 4 4 c 
    c 5 4 4 4 4 4 e e e e 4 4 4 4 c 
    c 4 4 4 4 4 4 4 4 4 4 4 4 4 4 c 
    c 4 c e 4 4 4 4 4 4 4 4 4 4 4 c 
    c 4 e e 4 4 4 4 4 4 4 4 4 e e c 
    c 4 4 4 4 4 4 4 4 4 4 4 e e c c 
    c c 4 4 4 4 e e 4 4 4 4 e e c . 
    . c e e e e e c c e e e e e c . 
    . c c c e e c c . c e e e c c . 
    . . . c c c c . . c c c c c . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . c c c c c . . . . . . . . 
    . c c c 5 5 5 c c c c c . . . . 
    . c 5 5 4 4 4 4 4 4 4 c c c c . 
    c c 5 4 4 4 4 4 4 4 4 4 4 4 c c 
    c 5 4 4 4 4 4 4 4 4 4 4 4 4 4 c 
    c 4 4 4 4 4 4 4 4 4 4 c c e 4 c 
    c 4 c c c c e 4 4 4 4 c c e 4 c 
    c 4 e c c e e 4 4 4 4 e e e 4 c 
    c 4 4 e e e 4 4 4 4 4 4 4 4 e c 
    c 4 4 4 4 4 4 4 4 4 4 4 e e e c 
    c 4 4 4 4 4 4 4 4 4 e e e e c . 
    c c 4 4 4 4 4 4 4 e e e c c c . 
    . c 4 4 4 4 4 e e e c c c . . . 
    . . c e e e e e e c c . . . . . 
    . . c c e e e c c c . . . . . . 
    . . . . c c c c . . . . . . . . 
    `,
img`
    . . . c c c c c . . . . . . . . 
    . c c c 4 4 4 c c c c c . . . . 
    . c 5 5 4 4 4 4 4 4 4 c c c c . 
    c c 5 4 4 4 4 4 4 4 4 4 4 4 c c 
    c 5 4 4 4 4 4 4 4 c c e 4 4 e c 
    c 5 4 4 4 4 4 4 c c c e 4 4 e c 
    c 5 4 4 4 4 4 4 c c c e 4 4 e c 
    c 5 4 4 4 4 4 4 e e e e 4 4 e c 
    c 5 4 4 4 4 4 4 4 4 4 4 4 4 e c 
    c 5 4 4 4 4 4 4 4 4 4 4 4 e e c 
    c 4 4 4 4 4 4 4 4 4 4 e e e c . 
    c c 4 4 4 4 4 4 4 e e e c c c . 
    . c 4 e 4 4 4 4 e e c c c . . . 
    . . c 4 4 4 4 e e c c . . . . . 
    . . c c 4 e 4 c c c . . . . . . 
    . . . . c c c c . . . . . . . . 
    `,
img`
    . . . . . . c c c c . . . . . . 
    . . c c c c 5 5 5 c c c c . . . 
    . c c 4 4 4 4 4 4 5 5 5 c c . . 
    c c 4 4 4 4 4 4 4 4 4 4 5 c c . 
    c 4 4 e c 4 4 4 4 4 4 4 4 5 c . 
    c 4 4 e e 4 4 4 4 4 4 4 4 4 5 c 
    c 4 4 4 4 4 4 4 4 e c 4 4 4 4 c 
    c 4 4 4 4 4 4 4 e c c c 4 4 4 c 
    c c 4 4 4 4 4 4 4 e e e 4 4 4 c 
    . c e e 4 4 4 4 4 4 4 4 4 4 4 c 
    . c e e e e 4 4 4 4 4 4 4 e e c 
    . c c e e e e e 4 4 4 4 e e c c 
    . . c c e e e e e e e e e c c . 
    . . . c c e e e e e e e c c . . 
    . . . . . c c c e c c c c . . . 
    . . . . . . . c c c . . . . . . 
    `
]
let asteroidsSmall = [img`
    . c c c c c . . 
    c c 5 5 5 c c c 
    c 5 4 4 4 4 4 c 
    c 4 4 e c 4 4 c 
    c 4 4 e e 4 4 c 
    c 4 4 4 4 e e c 
    c c c e e e c c 
    . . c c c c c . 
    `, img`
    . c c c c c . . 
    c 5 5 4 4 4 c . 
    c 5 4 c e 4 4 c 
    c 4 4 e e 4 4 c 
    c 4 4 4 4 4 4 c 
    c 4 4 4 4 4 e c 
    . c 4 e e e e c 
    . . c c c c c . 
    `, img`
    . c c c c c c . 
    c 5 5 5 4 4 4 c 
    c 5 4 4 4 4 4 c 
    c 4 4 4 4 4 4 c 
    c 4 4 c e 4 e c 
    c 4 4 e 4 4 e c 
    c e e 4 4 e e c 
    . c c c c c c . 
    `]
crosshair = sprites.create(img`
    . . . . . . . . 
    . 2 2 . . 2 2 . 
    . 2 . . . . 2 . 
    . . . . . . . . 
    . . . . . . . . 
    . 2 . . . . 2 . 
    . 2 2 . . 2 2 . 
    . . . . . . . . 
    `, SpriteKind.Player)
crosshair.setPosition(100, 80)
crosshair.z = 10
controller.moveSprite(crosshair, 75, 75)
level = 1
difficulty = 1
createBase()
cannon = sprites.create(cannonIMG, SpriteKind.Defence)
cannon.setPosition(scene.screenWidth() / 2, scene.screenHeight() - 8)
info.startCountdown(25 + level * 5)
let popLabel = sprites.create(img`
    1 1 . . . 1 . . 1 1 . . . . . . 
    1 . 1 . 1 . 1 . 1 . 1 . . . . . 
    1 1 . . 1 . 1 . 1 1 . . . . . . 
    1 . . . 1 . 1 . 1 . . . . . . . 
    1 . . . . 1 . . 1 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
population = 100
popLabel.setPosition(150, 95)
let ammoLabel = sprites.create(img`
    . . . . . . d . . . d . . . d . 
    . . . . . d d b . d d b . d d b 
    . . . . . . . . . . . . . . . . 
    . . . . . d d b . d d b . d d b 
    . . . . . d d b . d d b . d d b 
    . . . . . d d b . d d b . d d b 
    . . . . . d d b . d d b . d d b 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
ammoLabel.setPosition(5, 95)
game.onUpdate(function () {
    if (crosshair.x <= 40) {
        cannon.setImage(cannonIMGL)
    } else if (crosshair.x >= 120) {
        cannon.setImage(cannonIMGR)
    } else {
        cannon.setImage(cannonIMG)
    }
    popLabel.say(population)
    ammoLabel.say(convertToText(ammo))
})
game.onUpdateInterval(1000, function () {
    if (Math.percentChance(30 * difficulty)) {
        if (Math.percentChance(105 - level * 5)) {
            asteroid = sprites.create(asteroidsBig[randint(0, asteroidsBig.length - 1)], SpriteKind.Enemy)
        } else {
            asteroid = sprites.create(asteroidsSmall[randint(0, asteroidsSmall.length - 1)], SpriteKind.Enemy)
        }
        asteroid.setPosition(randint(60, 100), 0)
        asteroid.setVelocity(randint(-10 - difficulty, 10 + difficulty), randint(10 + difficulty * 2, 25 + difficulty * 2))
        asteroid.startEffect(effects.starField, 1000)
        asteroid.setFlag(SpriteFlag.AutoDestroy, true)
    }
    if (population <= 0) {
        game.over(false)
    }
})
