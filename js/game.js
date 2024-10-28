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
    },

    init() {
        this.start()
        this.setDimensions()
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
        // document.querySelector("#game-screen").style.padding = `${this.gameSize.padding.topbottom}px`
    },

    setEventListeners() {
    },

    start() {
        this.createElements()
        this.randomPlatform()
        this.randomPlatform()
    },

    createElements() {
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize)
        this.createFloor()
        this.createPlatforms()
    },

    createFloor() {
        for (let i = 1; i < this.floorNumber; i++) {
            this.floor = new Floor(this.gameSize, i)
            this.floorArray.push(this.floor)
        }
    },

    createPlatforms() {
        this.floorArray.forEach((eachFloor) => {
            console.log(eachFloor)
            const number = eachFloor.floorNumber
            for (let i = 0; i < this.platformNumer; i++) {
                this.platform = new Platform(this.gameSize, number, this.randomPlatform(), i)
                eachFloor.floorPlatforms.push(this.platform)
            }
        })
        // console.log(this.floorArray)
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

    }
}