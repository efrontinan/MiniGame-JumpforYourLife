class Platform {
    constructor(gameSize, rowNumber, platformSpecs, type, index, uniqueId) {

        this.uniqueId = uniqueId

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

        this.direction 


        this.init()
    }

    init() {
        this.platform = document.createElement('div')
        this.createPlatform()
        this.setDirection()

        this.platform.style.border = "1px solid #000"
        this.platform.style.position = "absolute"
        this.platform.style.width = `${this.platformSize.width}px`
        this.platform.style.height = `${this.platformSize.height}px`
        this.platform.style.top = `${this.platformPos.top}px`

        document.querySelector(`#game-screen`).appendChild(this.platform)
    }

    createPlatform() {
        if (this.type === 'stable') {
            this.platform.style.backgroundColor = "#4caf50"
        }

        if (this.type === 'weak') {
            this.platform.style.backgroundColor = "#4caf5080"
        }

        if (this.rowNumber % 2) {
            this.platformPos.left = (this.gameSize.width - this.platformSize.width - 20) - ((this.distance + this.platformSize.width) * this.index)
            this.platform.style.left = `${this.platformPos.left}px`
        } else {
            this.platformPos.left = 20 + (this.distance + this.platformSize.width) * this.index
            this.platform.style.left = `${this.platformPos.left}px`

        }
    }

    setDirection() {
        if(this.rowNumber % 2 === 0){
           this.direction= 1
        } else {
            this.direction= -1
        }
    }

}
