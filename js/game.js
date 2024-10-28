const Game = {

    gameSize: {
        width: window.innerWidth * .7,
        height: window.innerHeight,
        padding: {
            topbottom: 20,
            leftright: 20
        }
    },

    //Comment corazon
    framesCounter: 0,

    //Js game
    background: undefined,
    player: undefined,

    //Js Floor
    floorNumber: 5,
    floorArray: [],
    platformNumer: 3,

    keys: {
        MOVEUP: 'ArrowUp',
        MOVERIGHT: 'ArrowRight',
        MOVELEFT: 'ArrowLeft'
    },

    init() {
        this.start()
        this.setDimensions()
        this.setEventListeners()
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.code) {
                case this.keys.MOVEUP:
                    this.moveUp()
                    break;
                case this.keys.MOVERIGHT:
                    this.moveRight()
                    break;
                case this.keys.MOVELEFT:
                    this.moveLeft()
                    break;
            }
        })
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
        // document.querySelector("#game-screen").style.padding = `${this.gameSize.padding.topbottom}px`
    },

    start() {
        this.createElements()
        this.randomPlatform()
        this.randomPlatform()
    },

    createElements() {
        this.background = new Background(this.gameSize)
        this.createFloor()
        this.createPlatforms()
        this.player = new Player(this.gameSize)
    },

    createFloor() {
        for (let i = 1; i < this.floorNumber; i++) {
            this.floor = new Floor(this.gameSize, i)
            this.floorArray.push(this.floor)
        }
    },

    createPlatforms() {
        this.floorArray.forEach((eachFloor) => {
            const number = eachFloor.floorNumber
            let hasDuro = false
            for (let i = 0; i < this.platformNumer; i++) {
                this.platform = new Platform(this.gameSize, number, this.randomPlatform(), i)
                eachFloor.floorPlatforms.push(this.platform)
            }

            if (eachFloor.floorPlatforms[0].type === 'duro' || eachFloor.floorPlatforms[1].type === 'duro' || eachFloor.floorPlatforms[2].type === 'duro') {
            } else {
                eachFloor.floorPlatforms[0].type = 'duro'
                eachFloor.floorPlatforms[0].createPlatform();
            }
        })
    },

    randomPlatform() {
        let randomNumber = Math.random()
        if (randomNumber >= .5) {
            // console.log(0)
            return 'duro'
        }
        if (randomNumber < .5) {
            // console.log(1)
            return 'blando'
        }
    },

    updateFloor() {

    },

    moveLeft() {
        this.player.playerPos.top -= 100
        this.player.playerPos.left -= 100
        console.log(this.player.playerPos.left)
        this.updatePositikon()
    },

    moveUp() {
        this.player.playerPos.top -= 100
        this.updatePosition()
    },

    moveRight() {
        this.player.playerPos.top -= 100
        this.player.playerPos.left += 100
        console.log(this.player.playerPos.left)
        this.updatePosition()
    },

    updatePosition() {
        console.log(this.player.style.left)
        // this.player.style.left = `${this.playerPos.left}px`
        // this.player.style.top = `${this.playerPos.top}px`
    }
}