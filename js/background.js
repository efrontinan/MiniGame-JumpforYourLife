class Background {
  constructor(gameSize) {

    this.backgroundSize = {
      width: gameSize.width,
      height: undefined,
      originalHeight: gameSize.height
    }

    this.init()

  }

  init() {

    this.background1 = document.createElement('img')
    this.background1.src = "./img/background 2.jpg"
    this.background1.classList = "background1"

    this.background2 = document.createElement('img')
    this.background2.src = "./img/background 2.jpg"
    this.background2.classList = "background2"

    document.querySelector("#game-screen").appendChild(this.background1)
    document.querySelector("#game-screen").appendChild(this.background2)

    this.background1.onload = () => {

      this.background1.style.position = "absolute"
      this.background1.style.zIndex = "-1"
      this.background1.style.width = `${this.backgroundSize.width}px`

      this.backgroundSize.height = this.background1.offsetHeight

      this.backgroundPosition1 = {
        left: 0,
        top: this.backgroundSize.originalHeight - this.backgroundSize.height
      }

      this.background1.style.height = `${this.backgroundSize.height}px`
      this.background1.style.left = `${this.backgroundPosition1.left}px`
      this.background1.style.top = `${this.backgroundPosition1.top}px`

      this.backgroundPosition2 = {
        left: 0,
        top: this.backgroundPosition1.top - this.backgroundSize.height
      }

      this.background2.style.position = "absolute"
      this.background2.style.zIndex = "-1"
      this.background2.style.width = `${this.backgroundSize.width}px`
      this.background2.style.height = `${this.backgroundSize.height}px`
      this.background2.style.height = `${this.backgroundSize.height}px`
      this.background2.style.left = `${this.backgroundPosition1.left}px`
      this.background2.style.top = `${this.backgroundPosition1.top}px`

    }

  }


  moveBackground() {

    if (this.backgroundPosition1.top >= this.backgroundSize.originalHeight) {

      this.backgroundPosition1.top = this.backgroundSize.originalHeight - this.backgroundSize.height
      this.backgroundPosition2.top = this.backgroundPosition1.top - this.backgroundSize.height

      console.log(this.backgroundPosition2.left)

    }

    this.backgroundPosition1.top += this.backgroundSize.height / 5
    this.backgroundPosition2.top += this.backgroundSize.height / 5

  }

  updateBackground() {

    this.background1.style.top = `${this.backgroundPosition1.top}px`
    this.background2.style.top = `${this.backgroundPosition2.top}px`
    this.background1.style.transition = "top 3s"
    this.background2.style.transition = "top 3s"

  }

}