class Floor {
    constructor(gameSize, floornumber) {

        this.gameSize = gameSize
        this.floornumber = floornumber

        this.floorSize = {

            width: gameSize.width,
            height: gameSize.height/5

        }

        this.floorPos = {
            left: 0,
            top: this.gameSize.height - (this.floorSize.height* (this.floornumber + 1)),
            // top: ((this.gameSize.height) / this.floornumber) - this.floorSize.height,
            base: this.gameSize.height - this.floorSize.height - 20
        }

        this.init()
    }

    init() {

        this.floor = document.createElement('div')

        this.floor.style.backgroundColor = "red"
        this.floor.classList = "eachFloor"
        this.floor.style.border = "1px solid #000"
        this.floor.style.position = "absolute"
        this.floor.style.width = `${this.floorSize.width}px`
        this.floor.style.height = `${this.floorSize.height}px`
        this.floor.style.left = `${this.floorPos.left}px`
        this.floor.style.top = `${this.floorPos.top}px`

        document.querySelector("#game-screen").appendChild(this.floor)

    }

}
