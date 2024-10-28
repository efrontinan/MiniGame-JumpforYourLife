class Platform {
    constructor(gameSize, floorNumber, type, index) {

        this.gameSize = gameSize

        this.index = index

        this.floorNumber = floorNumber

        this.type = type

        this.distance = 150

        this.platformSize = {
            width: 100,
            height: 100
        }

        this.platformPos = {
            top: ((this.gameSize.height / 5) - this.platformSize.height) / 2,
            base: this.gameSize.height - this.platformSize.height - 20
        }
        this.init()
    }

    init() {
        this.platform = document.createElement('div')
        this.createPlatform()

        this.platform.style.border = "1px solid #000"
        this.platform.style.position = "absolute"
        this.platform.style.width = `${this.platformSize.width}px`
        this.platform.style.height = `${this.platformSize.height}px`
        this.platform.style.top = `${this.platformPos.top}px`

        document.querySelector(`#eachFloor${this.floorNumber}`).appendChild(this.platform)
    }

    createPlatform() {
        if (this.type === 'duro') {
            this.platform.style.backgroundColor = "white"
        }

        if (this.type === 'blando') {
            this.platform.style.backgroundColor = "black"
        }

        if (this.floorNumber % 2) {
            const leftPos = (this.gameSize.width - this.platformSize.width - 20) - ((this.distance + this.platformSize.width) * this.index)
            this.platform.style.left = `${leftPos}px`
        } else {
            const rigthPos = 20 + (this.distance + this.platformSize.width) * this.index
            this.platform.style.left = `${rigthPos}px`
        }
    }

}
