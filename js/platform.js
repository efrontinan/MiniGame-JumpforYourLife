class Platform {
    constructor(gameSize, rowNumber, platformSpecs, type, index, uniqueId) {

        this.uniqueId = uniqueId

        this.gameSize = gameSize
        
        this.rowNumber = rowNumber

        this.index = index

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

        this.initialLeft = (this.platformSize.width + this.distance) * -1

        this.init()
    }

    init() {

        this.platform = document.createElement('div')
        this.createPlatform()
        this.setDirection()

        this.platform.classList = "platform"
        this.platform.style.position = "absolute"
        this.platform.style.width = `${this.platformSize.width}px`
        this.platform.style.height = `${this.platformSize.height}px`
        this.platform.style.top = `${this.platformPos.top}px`

        document.querySelector(`#game-screen`).appendChild(this.platform)

    }

    createPlatform() {

        if (this.type === 'stable') {
            this.platform.style.backgroundImage = "url('img/stable.png')"
            this.platform.style.backgroundSize = "cover";
            this.platform.style.backgroundRepeat = "no-repeat";
            this.platform.style.backgroundPosition = "center";
        }

        if (this.type === 'weak') {
            this.platform.style.backgroundImage = "url('img/weak.png')"
            this.platform.style.backgroundSize = "cover";
            this.platform.style.backgroundRepeat = "no-repeat";
            this.platform.style.backgroundPosition = "center";
        }

        this.platformPos.left = this.initialLeft + (this.distance + this.platformSize.width) * this.index

    }

    setDirection() {

        if (this.rowNumber % 2 === 0) {
            this.direction = 1
        } else {
            this.direction = -1
        }

    }

    revertDirection() {

        this.direction *= -1

    }

    updateTopPosition(updatedRowNumber) {

        this.platformPos.top = this.gameSize.height - ((this.gameSize.height / 5) * (updatedRowNumber + 1))
        this.platform.style.top = `${this.platformPos.top}px`
        this.platform.style.transition = "top 1s"

    }

}
