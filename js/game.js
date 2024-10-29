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

    background: undefined,

    player: undefined,

    rowNumber: 5,
    platformArray: [],
    platformNumer: 3,

    platformSpecs: {
        distance: 150,
        width: 100,
        height: 100
    },

    isColliding: false,
    currentPlatform: [],

    interval: '',

    keys: {
        MOVEUP: 'ArrowUp',
        MOVERIGHT: 'ArrowRight',
        MOVELEFT: 'ArrowLeft'
    },

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
    },

    createElements() {
        this.createPlatforms()
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize, this.platformSpecs)
    },

    createPlatforms() {

        let uniqueId = 0

        for (let i = 1; i < this.rowNumber; i++) {

            for (let j = 0; j < this.platformNumer; j++) {

                const platform = new Platform(this.gameSize, i, this.platformSpecs, this.getRandomType(), j, uniqueId)
                this.platformArray.push(platform)

                uniqueId++

            }
        }

        hasStablePlatform = false

        for (let i = 1; i < this.rowNumber; i++) {
            const rowArray = this.platformArray.filter(eachPlatform => {
                return eachPlatform.rowNumber === i
            })
            if (rowArray.some(eachPlatform => eachPlatform.type === 'stable')) {
                hasStablePlatform = true
            } else {
                hasStablePlatform = false
                rowArray[0].type = 'stable';
                rowArray[0].createPlatform();
            }
            if (rowArray.some(eachPlatform => eachPlatform.type === 'weak')) {
                hasStablePlatform = true
            } else {
                hasStablePlatform = false
                rowArray[1].type = 'weak';
                rowArray[1].createPlatform();
            }
        }
    },

    getRandomType() {

        let randomNumber = Math.random()

        if (randomNumber >= .5) {
            return 'stable'
        }
        if (randomNumber < .5) {
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
                this.isColliding = true;
                this.currentPlatform = [idx, eachPlatform.rowNumber, eachPlatform.index, platformPos.left, platformPos.top, eachPlatform.type];
                this.player.updatePosition(this.platformArray[this.currentPlatform[0]])

                if (eachPlatform.type === 'weak') {
                    this.gameOver()
                }

                throw this.isColliding
            } else {
                this.isColliding = false;
            }
        })

        if (!this.isColliding) {
            this.player.updatePosition(this.platformArray[this.currentPlatform[0]])
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
        } )
        this.platformArray = []
        this.createPlatforms()

        this.currentPlatform= []

        this.framesCounter = 0

        // this.resetInactivityTimer()

    },



    startGameLoop() {

        interval = setInterval(() => {

            this.movePlatforms()
            this.updateElements()

            // if(this.platformArray.length < 12){
            //     this.createPlatforms()
            // }


        }, 40)

    },

    movePlatforms() {
        this.platformArray.forEach((eachPlatform) => {
            eachPlatform.platformPos.left += 2 * eachPlatform.direction;
            eachPlatform.platform.style.left = `${eachPlatform.platformPos.left}px`
        })
    },

    updateElements() {


        this.platformArray.forEach((elm, idx) => {

            const exceedsRight = elm.platformPos.left > this.gameSize.width
            const exceedsLeft = elm.platformPos.left + elm.platformSize.width < 0

            if (exceedsRight || exceedsLeft) {
                elm.platform.remove()
                // this.platformArray.splice(idx, 1)
            }
        })

        this.player.updatePosition(this.platformArray[this.currentPlatform[0]])

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