const Game = {

    gameSize: {
        width: window.innerWidth * .7,
        height: window.innerHeight,
        padding: {
            topbottom: 20,
            leftright: 20   
        }
    },

    framesCounter: 0,

    background: undefined,
    player: undefined,
    obstacles: [],

    floorNumber: 5,

    obstacleDensity: 0,

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
        console.log(document.querySelectorAll('eachFloor'))

    },

    createElements() {

        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize)
        this.newFloor()
        this.platform = new Platform(this.gameSize)
       
        
    },

    newFloor (){
        
        for(let i = 1; i<= this.floorNumber; i++){
            this.floor = new Floor(this.gameSize, i)
        }
        
    },

    updateFloor () {

    }
}