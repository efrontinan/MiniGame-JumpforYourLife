class Player {
    constructor(gameSize) {

        this.gameSize = gameSize

        this.playerSize = {

            width: 50,
            height: 50

        }

        this.playerPos = {
            left: this.gameSize.width / 2 - this.playerSize.width,
            top: this.gameSize.height - this.playerSize.height - 20,
            base: this.gameSize.height - this.playerSize.height - 20
        }

        this.init()
    }

    init() {

        this.player = document.createElement('div')

        this.player.style.backgroundColor = "yellow"

        this.player.style.position = "absolute"
        this.player.style.width = `${this.playerSize.width}px`
        this.player.style.height = `${this.playerSize.height}px`
        this.player.style.left = `${this.playerPos.left}px`
        this.player.style.top = `${this.playerPos.top}px`

        document.querySelector("#game-screen").appendChild(this.player)

    }

}