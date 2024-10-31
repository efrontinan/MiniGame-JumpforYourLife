const Game = {

    name: 'Jump for your life',
    author: 'Diego Silva y Elena Frontiñán',
    version: '1.0',
    license: undefined,


    gameSize: {
        width: 700,
        height: window.innerHeight,
        padding: {
            topbottom: 20,
            leftright: 20
        }
    },

    framesCounter: 0,

    background: undefined,

    player: undefined,

    rowNumber: 5,
    platformNumer: 5,
    platformArray: [],
    uniqueId: 0,

    platformSpecs: {
        distance: 150,
        width: 100,
        height: 100
    },

    isColliding: false,
    alreadyCollision: false,
    currentPlatform: [],

    totalPoints: 0,

    interval: '',

    keys: {
        MOVEUP: 'ArrowUp',
        MOVERIGHT: 'ArrowRight',
        MOVELEFT: 'ArrowLeft'
    },

    platform: undefined,

    init() {

        this.start()
        this.setDimensions()
        this.setEventListeners()
        this.printInfoJumps()

    },

    startGame() {

        document.getElementById('start-modal').style.display = 'none'

    },

    setEventListeners() {

        let moveFirstkey = false

        document.addEventListener("keydown", e => {
            switch (e.code) {

                case this.keys.MOVEUP:
                    if (moveFirstkey) {

                        this.player.moveUp()
                        this.background.moveBackground()
                        this.background.updateBackground()
                        this.collisionDetection()

                    } else {

                        this.player.moveUp()
                        this.collisionDetection()
                        movefirst = true

                    }

                case this.keys.MOVERIGHT:
                    this.player.moveRight()
                    this.collisionDetection()
                    break

                case this.keys.MOVELEFT:
                    this.player.moveLeft()
                    this.collisionDetection()
                    break
            }
        })
    },

    setDimensions() {

        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`

    },

    printInfoJumps() {

        document.getElementById("jump-max-number").innerHTML = localStorage.getItem('maxPoints')
        document.getElementById("jump-number").innerHTML = this.totalPoints

    },

    start() {

        this.createElements()
        this.startGameLoop()

    },

    createElements() {

        this.createPlatforms()
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize, this.platformSpecs)

    },

    createPlatforms() {

        for (let i = 1; i < this.rowNumber; i++) {

            for (let j = 0; j < this.platformNumer; j++) {

                this.platform = new Platform(this.gameSize, i, this.platformSpecs, this.getRandomType(), j, this.uniqueId)
                this.platformArray.push(this.platform)
                this.uniqueId++

            }
        }

        this.getStablePlatform()

    },

    createNewPlatforms() {

        if (this.isColliding === true && this.alreadyCollision === true) {

            this.platformArray.forEach((eachPlatform) => {
                eachPlatform.rowNumber -= 1
                eachPlatform.updateTopPosition(eachPlatform.rowNumber)
            })

            for (let j = 0; j < this.platformNumer; j++) {

                const platform = new Platform(this.gameSize, 4, this.platformSpecs, this.getRandomType(), j, this.uniqueId)
                this.platformArray.push(platform)

                this.uniqueId++
            }

            this.isColliding === false
        }
    },

    getStablePlatform() {

        let hasStablePlatform = false

        for (let i = 1; i < this.rowNumber; i++) {

            const rowArray = this.platformArray.filter(eachPlatform => {
                return eachPlatform.rowNumber === i
            })

            const stableArray = rowArray.filter(element => {
                return element.type === 'stable'
            })

            console.log('antes: ', stableArray)

            if (stableArray.length < 2) {

                hasStablePlatform = false

                rowArray[1].type = 'stable'
                rowArray[1].createPlatform()

                rowArray[3].type = 'stable'
                rowArray[3].createPlatform()

            }

            if (stableArray.length > 3) {

                rowArray[2].type = 'weak'
                rowArray[2].createPlatform()

                rowArray[4].type = 'weak'
                rowArray[4].createPlatform()

            }

            console.log('despues', rowArray.filter(element => element.type === 'stable'))

        }


    },

    getRandomType() {

        let randomNumber = Math.random()

        if (randomNumber >= .3) {
            return 'stable'
        }

        if (randomNumber < .3) {
            return 'weak'
        }

    },

    collisionDetection() {

        const playerPos = this.player.playerPos
        const playerSize = this.player.playerSize

        this.platformArray.forEach((eachPlatform, idx) => {

            const platformPos = eachPlatform.platformPos
            const platformSize = eachPlatform.platformSize

            if (
                playerPos.left < platformPos.left + platformSize.width &&
                playerPos.left + playerSize.width > platformPos.left &&
                playerPos.top < platformPos.top + platformSize.height &&
                playerPos.top + playerSize.height > platformPos.top
            ) {

                this.totalPoints++
                this.isColliding = true
                this.currentPlatform = [idx, eachPlatform.rowNumber, eachPlatform.index, platformPos.left, platformPos.top, eachPlatform.type]

                if (this.currentPlatform.length > 0) {
                    this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
                }
                this.createNewPlatforms()
                this.alreadyCollision = true

                if (eachPlatform.type === 'weak') {
                    this.totalPoints--
                    this.gameOver('Fuiste consumido, ¡Intentalo nuevamente!')
                }
                throw this.isColliding

            } else {
                this.isColliding = false
            }

        })

        if (!this.isColliding) {

            if (this.currentPlatform.length > 0) {
                this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
            }
            this.gameOver('Caíste en espacio vacio, ¡Intentalo nuevamente!')
        }

        return this.onPlatform

    },

    updateLocalStorage() {

        if (localStorage.getItem('maxPoints') < this.totalPoints) {

            localStorage.setItem('maxPoints', this.totalPoints)

        }

    },

    resetGame() {

        document.getElementById("lose-modal").style.display = "none"

        this.startGameLoop()

        this.player.resetPosition()

        this.platformArray.forEach(elm => {
            elm.platform.remove()
        })

        this.platformArray = []

        this.createPlatforms()

        this.currentPlatform = []

        this.framesCounter = 0

        this.alreadyCollision = false

        this.totalPoints = 0

        this.updateLocalStorage()

        this.printInfoJumps()

    },

    startGameLoop() {

        interval = setInterval(() => {
            this.movePlatforms()
            this.framesCounter++
            this.updateElements()
            this.printInfoJumps()
            this.clearAll()
        }, 40)

    },

    movePlatforms() {

        this.framesCounter += 2

        this.platformArray.forEach((eachPlatform) => {

            if (this.framesCounter >= (-(eachPlatform.initialLeft) + (eachPlatform.distance / 2))) {
                eachPlatform.revertDirection()
            }

            eachPlatform.platformPos.left += 2 * eachPlatform.direction
            eachPlatform.platform.style.left = `${eachPlatform.platformPos.left}px`
        })

        if (this.framesCounter >= (-(this.platform.initialLeft) + (this.platform.distance / 2))) {
            this.framesCounter = 0
        }

    },

    updateElements() {

        const exceedsRight = this.player.playerPos.left >= this.gameSize.width
        const exceedsLeft = this.player.playerPos.left + this.player.platformSize.width / 2 <= 0

        if (this.currentPlatform.length > 0) {
            this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
        }

        if (exceedsRight || exceedsLeft) {
            this.gameOver('Te excediste, intentalo nuevamente!')
        }

    },

    clearAll() {

        this.platformArray.forEach((elem, idx) => {
            if (elem.rowNumber === -1) {
                elem.platform.remove()
                this.platformArray.splice(idx, 1)
            }
        })

    },

    gameOver(menssage) {

        document.getElementById("lose-modal").style.display = "flex"
        document.getElementById("jump-number-lose").innerHTML = this.totalPoints
        document.getElementById("loss-reason").innerHTML = menssage

        clearInterval(interval)

    },

}