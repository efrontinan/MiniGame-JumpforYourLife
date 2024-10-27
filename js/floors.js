class Floor {
    constructor(gameSize, floorNumber) {

        this.gameSize = gameSize
        this.floorNumber = floorNumber

        this.floorSize = {

            width: gameSize.width,
            height: gameSize.height / 5

        }
        this.floorSpecs = {
            distance: 150,
            padding: {
                odd: {
                    paddingTop: 0,
                    paddingLeft: 20
                },
                even: {
                    paddingTop: 0,
                    paddingLeft: 100
                }
            }

        }

        this.floorPos = {
            left: 0,
            top: this.gameSize.height - (this.floorSize.height * (this.floorNumber + 1)),
            // top: ((this.gameSize.height) / this.floornumber) - this.floorSize.height,
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
        this.floor.style.display = "flex"
        this.floor.style.gap = `${this.floorSpecs.distance}px`
        this.selectDirection(this.floorNumber)
        // this.floor.style.flexDirection = "flex"

        this.floor.style.width = `${this.floorSize.width}px`
        this.floor.style.height = `${this.floorSize.height}px`
        this.floor.style.left = `${this.floorPos.left}px`
        this.floor.style.top = `${this.floorPos.top}px`

        document.querySelector("#game-screen").appendChild(this.floor)

    }

    selectDirection(floorNumber) {

        if (floorNumber % 2 === 0) {
            this.floor.style.flexDirection = "row"
            this.floor.style.padding = `${this.floorSpecs.padding.odd.paddingTop}px ${this.floorSpecs.padding.odd.paddingLeft}px`
        }
        if (floorNumber % 2 === 0) {
            this.floor.style.flexDirection = "row-reverse"
            this.floor.style.padding = `${this.floorSpecs.padding.even.paddingTop}px ${this.floorSpecs.padding.even.paddingLeft}px`
        }

    }

}
