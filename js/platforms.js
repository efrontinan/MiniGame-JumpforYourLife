class Platform {
    constructor(gameSize) {

        this.gameSize = gameSize

        this.platformSize = {

            width: 100,
            height: 100

        }

        this.platformPos = {
            left: 0,
            top: this.gameSize.height - this.platformSize.height - 20,
            // top: ((this.gameSize.height) / this.floornumber) - this.floorSize.height,
            base: this.gameSize.height - this.platformSize.height - 20
        }

        this.init()
    }

    init() {

        this.floor = document.createElement('div')

        this.floor.style.backgroundColor = "white"
        this.floor.style.border = "1px solid #000"
        this.floor.style.position = "absolute"
        this.floor.style.width = `${this.platformSize.width}px`
        this.floor.style.height = `${this.platformSize.height}px`
        this.floor.style.left = `${this.platformPos.left}px`
        this.floor.style.top = `${this.platformPos.top}px`

        document.querySelector("#game-screen").appendChild(this.floor)

    }

}
