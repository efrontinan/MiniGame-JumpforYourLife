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
        left: gameSize.w,
        top: 0
      }
      this.backgroundVel = {
        left: 10
      }
  
      this.init()
    }
  
    init() {
      this.backgroundElement1 = document.createElement('div')
    //   this.backgroundElement2 = document.createElement('img')
  
      this.backgroundElement1.style.backgroundColor = "green"
    //   this.backgroundElement2.style.backgroundColor = "yellow"
  
      this.backgroundElement1.style.position = "absolute"
      this.backgroundElement1.style.width = `${this.backgroundSize.width}px`
      this.backgroundElement1.style.height = `${this.backgroundSize.height}px`
      this.backgroundElement1.style.left = `${this.backgroundPosition1.left}px`
      this.backgroundElement1.style.top = `${this.backgroundPosition1.top}px`
  
    //   this.backgroundElement2.style.position = "absolute"
    //   this.backgroundElement2.style.width = `${this.backgroundSize.w}px`
    //   this.backgroundElement2.style.height = `${this.backgroundSize.h}px`
    //   this.backgroundElement2.style.left = `${this.backgroundPosition2.left}px`
    //   this.backgroundElement2.style.top = `${this.backgroundPosition2.top}px`
  
      document.querySelector("#game-screen").appendChild(this.backgroundElement1)
    //   document.querySelector("#game-screen").appendChild(this.backgroundElement2)
    }
  
  }