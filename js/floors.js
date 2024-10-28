class Floor {
    constructor(gameSize, floorNumber) {

        this.gameSize = gameSize

        this.floorNumber = floorNumber

        this.floorSize = {
            width: gameSize.width,
            height: gameSize.height / 5
        }

        this.floorPos = {
            left: 0,
            top: this.gameSize.height - (this.floorSize.height * (this.floorNumber + 1)),
            base: this.gameSize.height - this.floorSize.height - 20
        }

        this.floorPlatforms = []

        this.init()
    }

    init() {
        this.floor = document.createElement('div')

        this.floor.style.backgroundColor = "red"
        this.floor.id = `eachFloor${this.floorNumber}`
        this.floor.style.border = "1px solid #000"
        this.floor.style.boxSizing = "border-box"
        this.floor.style.position = "absolute"
        // this.selectDirection(this.floorNumber)

        this.floor.style.width = `${this.floorSize.width}px`
        this.floor.style.height = `${this.floorSize.height}px`
        this.floor.style.left = `${this.floorPos.left}px`
        this.floor.style.top = `${this.floorPos.top}px`

        document.querySelector("#game-screen").appendChild(this.floor)
    }

    selectDirection(floorNumber) {
    }

}
