class Platform {
    constructor(gameSize, floorNumber, type) {

        this.gameSize = gameSize

        this.floorNumber = floorNumber

        this.type = type

        this.platformSize = {

            width: 100,
            height: 100

        }

        this.platformPos = {
            left: 0,
            top: ((this.gameSize.height / 5) - this.platformSize.height) / 2,
            // top: ((this.gameSize.height) / this.floornumber) - this.floorSize.height,
            base: this.gameSize.height - this.platformSize.height - 20
        }

        this.init()
    }

    init() {

        this.platform = document.createElement('div')
        this.createPlatform(this.type)

        this.platform.style.border = "1px solid #000"
        this.platform.style.position = "relative"
        // this.platform.style.marginLeft = "150px"
        this.platform.style.width = `${this.platformSize.width}px`
        this.platform.style.height = `${this.platformSize.height}px`
        this.platform.style.left = `${this.platformPos.left}px`
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

        //faltaría implementarle la lógica para que siempre haya 1 duro y al menos 1 blando

    }

}
