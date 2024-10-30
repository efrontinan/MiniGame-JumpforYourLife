const Game = {

    inactivityTimer: null,
    inactivityLimit: 5000,

    gameSize: {
        width: 700,
        height: window.innerHeight,
        padding: {
            topbottom: 20,
            leftright: 20
        }
    },

    framesCounter: 0,
    distanceCovered: 0,

    background: undefined,

    player: undefined,

    rowNumber: 5,
    platformArray: [],
    platformNumer: 5,

    platformSpecs: {
        distance: 150,
        width: 100,
        height: 100
    },

    uniqueId: 0,

    totalPoints: 0,

    isColliding: false,
    alreadyCollision: false,
    currentPlatform: [],

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

        // this.updateFloor(); // Inicia el movimiento de las plataformas
        // this.startInactivityTimer();
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.code) {
                case this.keys.MOVEUP:
                    this.player.moveUp()
                    this.collisionDetection()
                    // this.resetInactivityTimer() 
                    break;
                case this.keys.MOVERIGHT:
                    this.player.moveRight()
                    this.collisionDetection()
                    // this.resetInactivityTimer() 
                    break;
                case this.keys.MOVELEFT:
                    this.player.moveLeft()
                    this.collisionDetection()
                    // this.resetInactivityTimer() 
                    break;
            }
        })
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
    },

    start() {
        this.createElements()
        this.startGameLoop()
        // alert('Los puntos maximos conseguidos son ' + localStorage.getItem('maxPoints'))
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

            // this.platformArray = this.platformArray.filter(eachPlatform => eachPlatform.rowNumber > 0)

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
            if (rowArray.some(eachPlatform => eachPlatform.type === 'stable')) {
                hasStablePlatform = true
            } else {
                hasStablePlatform = false
                rowArray[2].type = 'stable';
                rowArray[2].createPlatform();
            }
            if (rowArray.some(eachPlatform => eachPlatform.type === 'weak')) {
                hasStablePlatform = true
            } else {
                hasStablePlatform = false
                rowArray[2].type = 'weak';
                rowArray[2].createPlatform();
            }
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

        const playerPos = this.player.playerPos;
        const playerSize = this.player.playerSize;

        this.platformArray.forEach((eachPlatform, idx) => {

            const platformPos = eachPlatform.platformPos;
            const platformSize = eachPlatform.platformSize;

            if (
                playerPos.left < platformPos.left + platformSize.width &&
                playerPos.left + playerSize.width > platformPos.left &&
                playerPos.top < platformPos.top + platformSize.height &&
                playerPos.top + playerSize.height > platformPos.top
            ) {
                this.totalPoints++
                localStorage.setItem('maxPoints', this.totalPoints)
                this.isColliding = true;
                this.currentPlatform = [idx, eachPlatform.rowNumber, eachPlatform.index, platformPos.left, platformPos.top, eachPlatform.type];
                if (this.currentPlatform.length > 0) {
                    this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
                }
                this.createNewPlatforms()
                this.alreadyCollision = true;

                if (eachPlatform.type === 'weak') {
                    this.gameOver()
                }
                throw this.isColliding
            } else {
                this.isColliding = false;
            }
        })

        if (!this.isColliding) {
            if (this.currentPlatform.length > 0) {
                this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
            }
            this.gameOver()
        }
        return this.onPlatform;
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

        // this.resetInactivityTimer()

    },

    startGameLoop() {
        interval = setInterval(() => {
            this.movePlatforms()
            this.framesCounter++
            this.updateElements()
        }, 40)
    },

    movePlatforms() {
        this.distanceCovered += 2

        this.platformArray.forEach((eachPlatform) => {

            if (this.distanceCovered >= (-(eachPlatform.initialLeft) + (eachPlatform.distance / 2))) {
                eachPlatform.revertDirection()
            }

            eachPlatform.platformPos.left += 2 * eachPlatform.direction
            eachPlatform.platform.style.left = `${eachPlatform.platformPos.left}px`
        })

        if (this.distanceCovered >= (-(this.platform.initialLeft) + (this.platform.distance / 2))) {
            this.distanceCovered = 0
        }

    },

    updateElements() {

        const exceedsRight = this.player.playerPos.left >= this.gameSize.width
        const exceedsLeft = this.player.playerPos.left + this.player.platformSize.width / 2 <= 0


        // this.platformArray.forEach((elm, idx) => {

        //     const exceedsRight = elm.platformPos.left > this.gameSize.width
        //     const exceedsLeft = elm.platformPos.left + elm.platformSize.width < 0

        //     // if (exceedsRight || exceedsLeft) {
        //     //     elm.platform.remove()
        //     //     // this.platformArray.splice(idx, 1)
        //     // }
        // })

        if (this.currentPlatform.length > 0) {
            this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
        }

        if (exceedsRight || exceedsLeft) {
            this.gameOver()
        }

    },

    // startInactivityTimer() {
    //     this.inactivityTimer = setTimeout(() => {
    //         this.showLoseModal() // Muestra el modal de "Perdiste" si no hay movimiento
    //     }, this.inactivityLimit)
    // },

    // resetInactivityTimer() {
    //     clearTimeout(this.inactivityTimer); // Limpia el temporizador anterior
    //     this.startInactivityTimer() // Inicia un nuevo temporizador
    // },

    gameOver() {
        document.getElementById("lose-modal").style.display = "flex";
        clearInterval(interval)
    },
}