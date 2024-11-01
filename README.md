# Jump for Your Life

## Descripción del Proyecto

**Jump for Your Life** es un dinámico juego arcade desarrollado por Diego Silva y Elena Frontiñán. El objetivo principal del jugador es hacer que el personaje salte a través de diferentes plataformas para avanzar lo más lejos posible, acumulando puntos y evitando peligros. 
Las plataformas, que pueden ser estables o débiles, agregan un nivel de dificultad y estrategia al juego. Con un diseño visual atractivo y controles intuitivos, **Jump for Your Life** es perfecto para quienes buscan un desafío adictivo y emocionante.

## Características

- **Plataformas Dinámicas**: Existen plataformas estables y débiles. Las plataformas débiles colapsan al contacto, lo que añade un nivel de dificultad extra.
- **Controles Simples e Intuitivos**: Usa las teclas de flecha para moverte y saltar a través de los niveles.
- **Puntaje y Almacenamiento de Récords**: Guarda el puntaje máximo del jugador en el almacenamiento local del navegador.
- **Sonido Inmersivo**: Incluye efectos de sonido que se activan en diferentes eventos del juego (inicio, colisión, game over).
- **Detección de Colisiones Precisa**: La detección de colisiones garantiza que los movimientos sean realistas y añade un desafío estratégico.

## Estructura del Proyecto

El proyecto se organiza en un objeto `Game` que contiene toda la lógica y configuración del juego, así como diferentes archivos .js con cada una de las clases que los definen.

### Métodos Clave

1. **`init()`**: Configura el tamaño del área de juego, eventos y visualización del puntaje.
2. **`start()`**: Inicia el juego ocultando la pantalla de inicio y reproduciendo el sonido inicial.
3. **`setEventListeners()`**: Detecta teclas para el movimiento del personaje.
4. **`createPlatforms()`**: Genera plataformas al inicio del juego.
5. **`collisionDetection()`**: Verifica las colisiones entre el personaje y las plataformas.
6. **`gameOver()`**: Termina el juego, muestra un mensaje y reproduce un sonido de fin.
7. **`updateLocalStorage()`**: Guarda el puntaje más alto en el almacenamiento local.
8. **`resetGame()`**: Reinicia el juego a su configuración inicial.

## Controles

- **Flecha Arriba**: Mover a la plataforma inmediatamente superior
- **Flecha Derecha**: Mover a la plataforma superior y a la derecha
- **Flecha Izquierda**: Mover a la plataforma superior y a la izquierda

## Créditos

Desarrollado por **Diego Silva** y **Elena Frontiñán**.
