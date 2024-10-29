const Game = {

    inactivityTimer: null, // Para rastrear la inactividad
    inactivityLimit: 5000, // 5 segundos de inactividad

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
        this.updateFloor(); // Inicia el movimiento de las plataformas
        this.startInactivityTimer(); // Inicia el temporizador de inactividad
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.code) {
                case this.keys.MOVEUP:
                    this.player.moveUp()
                    this.collisionDetection()
                    this.resetInactivityTimer() // Reinicia el temporizador de inactividad
                    break;
                case this.keys.MOVERIGHT:
                    this.player.moveRight()
                    this.collisionDetection()
                    this.resetInactivityTimer() // Reinicia el temporizador de inactividad
                    break;
                case this.keys.MOVELEFT:
                    this.player.moveLeft()
                    this.collisionDetection()
                    this.resetInactivityTimer() // Reinicia el temporizador de inactividad
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
        for (let i = 1; i < this.rowNumber; i++) {
            for (let j = 0; j < this.platformNumer; j++) {
                const platform = new Platform(this.gameSize, i, this.platformSpecs, this.getRandomType(), j)

                // Asigna dirección basada en el grupo: derecha (1) o izquierda (-1)
                const groupIndex = Math.floor((this.platformArray.length) / 3)
                platform.direction = groupIndex % 2 === 0 ? 1 : -1

                this.platformArray.push(platform)
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
        const playerPos = this.player.playerPos;
        const playerSize = this.player.playerSize;
        let isColliding = false;

        this.platformArray.forEach(eachPlatform => {
            const platformPos = eachPlatform.platformPos;
            const platformSize = eachPlatform.platformSize;

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
            ) {
                isColliding = true;
                this.onPlatform = true;
                this.plaformNumber.push(eachPlatform.rowNumber, eachPlatform.index, platformPos.left, platformPos.top);
                this.updatePosition()
            }
        });

        // Si no hay colisión, muestra el modal de "Perdiste"
        if (!isColliding) {
            this.showLoseModal()
        }

        return this.onPlatform;
    },

    showLoseModal() {
        document.getElementById("lose-modal").style.display = "flex";
    },

    resetGame() {
        // Oculta el modal de "Perdiste"
        document.getElementById("lose-modal").style.display = "none";

        // Reinicia la posición del jugador
        this.player.resetPosition(); // Asegúrate de definir `resetPosition` en tu clase Player para la posición inicial

        // Limpia y vuelve a crear las plataformas
        this.platformArray.forEach(platform => platform.platform.remove()); // Elimina del DOM
        this.platformArray = []; // Vacía el array de plataformas
        this.createPlatforms(); // Vuelve a crear las plataformas

        // Reinicia otros elementos si es necesario (ej. contador de frames)
        this.framesCounter = 0;

        // Reinicia tiempo de actividad
        this.resetInactivityTimer()

    },

    updatePosition() {
        let player_id = document.querySelector('#player');

        const leftIndex = this.plaformNumber.length - 2;
        const topIndex = this.plaformNumber.length - 1;

        // Actualiza las posiciones de acuerdo a estos índices
        player_id.style.left = `${this.plaformNumber[leftIndex] + (this.player.playerSize.width / 2)}px`;
        player_id.style.top = `${this.plaformNumber[topIndex] + (this.player.playerSize.height / 2)}px`;
    },

    updateFloor() {
        setInterval(() => {
            this.platformArray = this.platformArray.filter((platform) => {
                // Mueve la plataforma según su dirección asignada
                platform.platformPos.left += 2 * platform.direction;
                platform.platform.style.left = `${platform.platformPos.left}px`;

                // Verifica si la plataforma ha excedido los límites
                const exceedsRight = platform.platformPos.left >= this.gameSize.width;
                const exceedsLeft = platform.platformPos.left + platform.platformSize.width <= 0;

                // Elimina la plataforma del array si excede los límites del juego
                if (exceedsRight || exceedsLeft) {
                    platform.platform.remove(); // Remueve del DOM
                    return false; // Excluye del array
                }
                return true; // Mantiene en el array
            });
        }, 20); // Ejecuta cada 20ms para un movimiento fluido
    },

    startInactivityTimer() {
        this.inactivityTimer = setTimeout(() => {
            this.showLoseModal() // Muestra el modal de "Perdiste" si no hay movimiento
        }, this.inactivityLimit)
    },

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer); // Limpia el temporizador anterior
        this.startInactivityTimer() // Inicia un nuevo temporizador
    },
}