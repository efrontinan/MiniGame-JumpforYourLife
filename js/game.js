const Game = {

    gameSize: {
        width: 700,
        height: window.innerHeight,
        padding: {
            topbottom: 20,
            leftright: 20
        }
    },

    framesCounter: 0,

    background: undefined,

    player: undefined,

    rowNumber: 5,
    platformArray: [],
    platformNumer: 3,

    platformSpecs: {
        distance: 150,
        width: 100,
        height: 100
    },

    onPlatform: false,
    plaformNumber: [],

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
                    this.player.moveUp()
                    this.collisionDetection()
                    break;
                case this.keys.MOVERIGHT:
                    this.player.moveRight()
                    this.collisionDetection()
                    break;
                case this.keys.MOVELEFT:
                    this.player.moveLeft()
                    this.collisionDetection()
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
        this.createPlatforms()
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize, this.platformSpecs)
    },

    createPlatforms() {
        const floorPlatforms = []
        for (let i = 1; i < this.rowNumber; i++) {

            for (let j = 0; j < this.platformNumer; j++) {
                const platform = new Platform(this.gameSize, i, this.platformSpecs, this.getRandomType(), j)


                this.platformArray.push(platform)
            }
        }

        // console.log (this.platformArray)
        hasStablePlatform = false

        //compruebo si en cada nivel hay un stable y si no, fijo uno como estable

        for (let i = 1; i < this.rowNumber; i++) {

            const rowArray = this.platformArray.filter(eachPlatform => {
                return eachPlatform.rowNumber === i
            })
            if (rowArray.some(eachPlatform => eachPlatform.type === 'stable')) {

                console.log('hay uno estable')
                hasStablePlatform = true

            } else {
                hasStablePlatform = false

                rowArray[0].type = 'stable';
                rowArray[0].createPlatform();

            }

            if (rowArray.some(eachPlatform => eachPlatform.type === 'weak')) {

                console.log('hay uno débil')
                hasStablePlatform = true

            } else {
                hasStablePlatform = false

                rowArray[1].type = 'weak';
                rowArray[1].createPlatform();

            }

        }




    },

    getRandomType() {

        let randomNumber = Math.random()

        if (randomNumber >= .5) {
            return 'stable'
        }
        if (randomNumber < .5) {
            return 'weak'
        }
    },

    collisionDetection() {

        const playerPos = this.player.playerPos
        const playerSize = this.player.playerSize

        this.platformArray.forEach(eachPlatforms => {
            const platformPos = eachPlatforms.platformPos
            const platformSize = eachPlatforms.platformSize
            console.log('player left: ', playerPos.left)
            console.log('each platform: ', platformPos.left)
            console.log('final platform: ', (platformPos.left + platformSize.width))
            if (
                (playerPos.left > platformPos.left &&
                    playerPos.left < (platformPos.left + platformSize.width) &&
                    playerPos.top > platformPos.top &&
                    playerPos.top < platformPos.top + platformSize.height
                )
                ||
                ((playerPos.left + playerSize.width) < (platformPos.left + platformSize.width) &&
                    ((playerPos.left + playerSize.width) > platformPos.left)) &&
                (playerPos.top + playerSize.height) < (platformPos.top + platformSize.height) &&
                (playerPos.top + playerSize.height) > (platformPos.top)
                // No está chocando siempre y no se cuando lo recibe y cuando no
            ) {

                this.onPlatform = true
                this.updatePosition()
                this.plaformNumber.push([eachPlatforms.rowNumber, eachPlatforms.index])
                console.log(this.plaformNumber)
                alert('Sos un crack')

            } else {
                //alert('NO DATA')
                this.updatePosition()
            }
        });

        return this.onPlatform;
    },

    updatePosition() {
        let player_id = document.querySelector('#player');
        player_id.style.left = `${this.player.playerPos.left}px`
        player_id.style.top = `${this.player.playerPos.top}px`
    },

    updateFloor() {
    },
}