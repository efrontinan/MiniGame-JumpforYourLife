class Background {
  constructor(gameSize) {

    this.backgroundSize = {
      width: gameSize.width,
      height: gameSize.height
    }

    this.backgroundPosition1 = {
      left: 0,
      top: 0
    }

    this.backgroundPosition2 = {
      left: 0,
      top: 0
    }

    this.backgroundVel = {
      left: 10
    }

    this.init()

  }

  init() {

    this.backgroundElement1 = document.createElement('div')
    this.backgroundElement1.style.backgroundImage = "url('img/background 2.jpg')"

    this.backgroundElement1.style.backgroundColor = "#00bdff"
    this.backgroundElement1.style.position = "absolute"
    this.backgroundElement1.style.zIndex = "-1"
    this.backgroundElement1.style.width = `${this.backgroundSize.width}px`
    this.backgroundElement1.style.height = `${this.backgroundSize.height}px`
    this.backgroundElement1.style.left = `${this.backgroundPosition1.left}px`
    this.backgroundElement1.style.top = `${this.backgroundPosition1.top}px`

    // this.backgroundElement2 = document.createElement('div')
    // this.backgroundElement2.style.backgroundImage = "url('img/background 2.jpg')"

    // this.backgroundElement2.style.backgroundColor = "#00bdff"
    // this.backgroundElement2.style.position = "absolute"
    // this.backgroundElement2.style.backgroundSize = "cover"
    // this.backgroundElement2.style.backgroundRepeat = "no-repeat"
    // this.backgroundElement2.style.backgroundPosition = "center"
    // this.backgroundElement2.style.zIndex = "-1"
    // this.backgroundElement2.style.width = `${this.backgroundSize.width}px`
    // this.backgroundElement2.style.height = `${this.backgroundSize.height}px`
    // this.backgroundElement2.style.left = `${this.backgroundPosition1.left}px`
    // this.backgroundElement2.style.top = `${this.backgroundPosition1.top}px`

    document.querySelector("#game-screen").appendChild(this.backgroundElement1)
    
  }

}