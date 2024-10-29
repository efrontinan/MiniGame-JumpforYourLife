class Player {
    constructor(gameSize, platformSpecs) {

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

        this.distance = platformSpecs.distance

        this.platformSize = {
            width: platformSpecs.width,
            height: platformSpecs.height
        }

        this.init()
    }

    init() {
        // console.log(document.querySelectorAll('#eachFloor1'))
        this.player = document.createElement('div')

        this.player.id = "player"
        this.player.style.backgroundColor = "green"
        this.player.style.position = "absolute"
        this.player.style.width = `${this.playerSize.width}px`
        this.player.style.height = `${this.playerSize.height}px`
        this.player.style.left = `${this.playerPos.left}px`
        this.player.style.top = `${this.playerPos.top}px`

        document.querySelector("#game-screen").appendChild(this.player)

    }

    moveLeft() {
        this.playerPos.top -= this.gameSize.height / 5
        console.log(this.playerPos.left)
        this.playerPos.left -= (this.distance + this.platformSize.width)
        console.log(this.playerPos.left)
        // this.game.collisionDetection()
    }

    moveUp() {
        this.playerPos.top -= this.gameSize.height / 5
        // this.game.collisionDetection()
    }

    moveRight() {
        this.playerPos.top -= this.gameSize.height / 5
        this.playerPos.left += (this.distance + this.platformSize.width)
        // this.game.collisionDetection()
    }

    resetPosition() {
        this.playerPos = { left: 300, top: 625 }; // Define una posición inicial en el constructor
        const playerElement = document.getElementById('player');
        playerElement.style.left = `${this.playerPos.left}px`;
        playerElement.style.top = `${this.playerPos.top}px`;
    }

}