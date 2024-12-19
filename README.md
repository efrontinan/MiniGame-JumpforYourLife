![Jump for Your Life](https://res.cloudinary.com/dt9pviq34/image/upload/v1734630862/Arcade_Desktop_z6dtwo.png)

# Jump for Your Life  

<p align="center">
  <a href="https://efrontinan.github.io/MiniGame-JumpforYourLife/" target="_blank">
    <button type="button" style="background-color: #3571FC; color: #fff; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer;">
      Play the Game
    </button>
  </a>
</p>

## **Project Description**  

**Jump for Your Life** is a dynamic arcade game developed by **Diego Silva** and **Elena Frontiñán**. The main objective is to make the character jump across various platforms to progress as far as possible, earning points and avoiding hazards. The platforms, which can be stable or weak, add an extra layer of strategy and difficulty. With its visually appealing design and intuitive controls, **Jump for Your Life** is perfect for anyone seeking an addictive and thrilling challenge.

---

## **Features**  

- **Dynamic Platforms**: Stable and weak platforms. Weak platforms collapse upon contact, adding extra difficulty.  
- **Simple and Intuitive Controls**: Use arrow keys to navigate and jump through levels.  
- **Score and High Score Storage**: Keeps the highest score in the browser's local storage.  
- **Immersive Sound**: Includes sound effects triggered during various in-game events (start, collision, game over).  
- **Accurate Collision Detection**: Ensures realistic movements and adds strategic challenge.  

---

## **Project Structure**  

The project is organized around a `Game` object that contains all the game logic and configuration, along with separate `.js` files defining each class.

### **Key Methods**  

1. **`init()`**: Sets up the game area size, events, and score display.  
2. **`start()`**: Starts the game by hiding the start screen and playing the initial sound.  
3. **`setEventListeners()`**: Detects key presses for character movement.  
4. **`createPlatforms()`**: Generates platforms at the start of the game.  
5. **`collisionDetection()`**: Checks for collisions between the character and platforms.  
6. **`gameOver()`**: Ends the game, displays a message, and plays a game-over sound.  
7. **`updateLocalStorage()`**: Saves the highest score in local storage.  
8. **`resetGame()`**: Resets the game to its initial state.  

---

## **Controls**  

- **Up Arrow**: Move to the platform directly above.  
- **Right Arrow**: Move to the platform above and to the right.  
- **Left Arrow**: Move to the platform above and to the left.  

---

## **Credits**  

Developed by **Diego Silva** and **Elena Frontiñán**.
