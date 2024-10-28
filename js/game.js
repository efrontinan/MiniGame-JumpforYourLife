const Game = {

    gameSize: {
        width: window.innerWidth * .7,
        height: window.innerHeight,
        padding: {
            topbottom: 20,
            leftright: 20
        }
    },

    framesCounter: 0,

    background: undefined,
    player: undefined,

    floorNumber: 5,
    floorArray: [],
    platformNumer: 3,

    platformsSpecs: {
        distance: 150,
        width: 100,
        height: 100
    },

    keys: {
        MOVEUP: 'ArrowUp',
        MOVERIGHT: 'ArrowRight',
        MOVELEFT: 'ArrowLeft'
    },

    init() {
        this.start()
        this.setDimensions()
        this.setEventListeners()
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.code) {
                case this.keys.MOVEUP:
                    this.moveUp()
                    // this.player.moveUp()
                    break;
                case this.keys.MOVERIGHT:
                    this.moveRight()
                    break;
                case this.keys.MOVELEFT:
                    this.moveLeft()
                    break;
            }
        })
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
    },

    start() {
        this.createElements()
    },

    createElements() {
        this.createFloor()
        this.createPlatforms()
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize)
    },

    createFloor() {
        for (let i = 1; i < this.floorNumber; i++) {
            this.floor = new Floor(this.gameSize, i)
            this.floorArray.push(this.floor)
        }
    },

    createPlatforms() {

        this.floorArray.forEach((eachFloor) => {

            for (let i = 0; i < this.platformNumer; i++) {
                const platform = new Platform(this.gameSize, eachFloor.floorNumber, this.platformsSpecs, this.getRandomType(), i)
                eachFloor.floorPlatforms.push(platform)
            }

            if (
                eachFloor.floorPlatforms[0].type === 'duro' ||
                eachFloor.floorPlatforms[1].type === 'duro' ||
                eachFloor.floorPlatforms[2].type === 'duro'
            ) {
                // hola?
            } else {
                eachFloor.floorPlatforms[0].type = 'duro'
                eachFloor.floorPlatforms[0].createPlatform()
            }
        })
    },

    getRandomType() {

        let randomNumber = Math.random()

        if (randomNumber >= .5) {
            return 'duro'
        }
        if (randomNumber < .5) {
            return 'blando'
        }
    },

    updateFloor() {

    },

    moveLeft() {
        this.player.playerPos.top -= this.gameSize.height / 5
        this.player.playerPos.left -= (this.platformsSpecs.distance + this.platformsSpecs.width)
        this.collisionDetection()
    },

    moveUp() {
        this.player.playerPos.top -= this.gameSize.height / 5
        this.collisionDetection()
    },

    moveRight() {
        this.player.playerPos.top -= this.gameSize.height / 5
        this.player.playerPos.left += (this.platformsSpecs.distance + this.platformsSpecs.width)
        this.collisionDetection()
    },


    collisionDetection() {
        const actualFloor = this.floorArray[0].floorPlatforms
        const playerPos = this.player.playerPos
        const playerSize = this.player.playerSize
        // console.log(playerPos.left)
        // console.log(this.player.playerPos.left)
        // console.log(this.player.playerPos.top)

        actualFloor.forEach(eachPlatforms => {
            const platformPos = eachPlatforms.platformPos
            const platformSize = eachPlatforms.platformSize
            console.log('player left: ', playerPos.left)
            console.log('each platform: ', platformPos.left)
            console.log('final platform: ', (platformPos.left + platformSize.width))
            if ((playerPos.left > platformPos.left && playerPos.left < (platformPos.left + platformSize.width)) ||
                ((playerPos.left + playerSize.width) < (platformPos.left + platformSize.width) && ((playerPos.left + playerSize.width) > platformPos.left))) {
                // tenemos que comprobar el top position
                console.log(eachPlatforms)
                const platformChecked = eachPlatforms.index
                alert('Sos un crack')
                this.updatePosition()
            } else {
                this.updatePosition()
            }
        });

        return platformChecked;

    },

    updatePosition() {
        let player_id = document.querySelector('#player');
        player_id.style.left = `${this.player.playerPos.left}px`
        player_id.style.top = `${this.player.playerPos.top}px`
    },
}