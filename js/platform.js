class Platform {
    constructor(gameSize, rowNumber, platformSpecs, type, index) {

        this.gameSize = gameSize

        this.index = index

        this.rowNumber = rowNumber

        this.type = type

        this.distance = platformSpecs.distance

        this.platformSize = {
            width: platformSpecs.width,
            height: platformSpecs.height
        }

        this.platformPos = {
            left: 0,
            top: this.gameSize.height - ((this.gameSize.height / 5) * (this.rowNumber + 1))
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

        document.querySelector(`#game-screen`).appendChild(this.platform)
    }

    createPlatform() {
        if (this.type === 'duro') {
            this.platform.style.backgroundColor = "white"
        }

        if (this.type === 'blando') {
            this.platform.style.backgroundColor = "black"
        }

        if (this.rowNumber % 2) {
            this.platformPos.left = (this.gameSize.width - this.platformSize.width - 20) - ((this.distance + this.platformSize.width) * this.index)
            this.platform.style.left = `${this.platformPos.left}px`
        } else {
            this.platformPos.left = 20 + (this.distance + this.platformSize.width) * this.index
            this.platform.style.left = `${this.platformPos.left}px`
        }
    }

}
