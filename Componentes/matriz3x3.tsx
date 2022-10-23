import { useState } from "react";

const Matriz3x3 = () => {
  type Matriz = number[][];
  type posicionDisponible = [number, number];
  //Agregar un estado para la matriz 3x3
  const [matriz, setMatriz] = useState<Matriz>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  //Agregar un estado para ver todas las posiciones en la matriz con valores
  const [posiciones, setPosiciones] = useState<posicionDisponible[]>([
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ]);

  //agregar un estado para turno de jugador true = X, false = O
  const [turno, setTurno] = useState<boolean>(true);

  //Agregar una funcion para haber una busqueda Heuristica de primero el mejor movimiento para la maquina, tomando en cuenta que la maquina siempre va a ser 2 y el jugador 1, y que el jugador siempre va a empezar
  const busquedaHeuristica = (): posicionDisponible => {
    //filas
    //Si la maquina tiene dos en linea, entonces va a jugar en la posicion que falta para ganar
    for (let i = 0; i < 3; i++) {
      if (matriz[i][0] === 2 && matriz[i][1] === 2 && matriz[i][2] === 0) {
        return [i, 2];
      } else if (
        matriz[i][0] === 2 &&
        matriz[i][1] === 0 &&
        matriz[i][2] === 2
      ) {
        return [i, 1];
      } else if (
        matriz[i][0] === 0 &&
        matriz[i][1] === 2 &&
        matriz[i][2] === 2
      ) {
        return [i, 0];
      }
    }
    //Columnas
    //Si la maquina tiene dos en linea, entonces va a jugar en la posicion que falta para ganar
    for (let i = 0; i < 3; i++) {
      if (matriz[0][i] === 2 && matriz[1][i] === 2 && matriz[2][i] === 0) {
        return [2, i];
      } else if (
        matriz[0][i] === 2 &&
        matriz[1][i] === 0 &&
        matriz[2][i] === 2
      ) {
        return [1, i];
      } else if (
        matriz[0][i] === 0 &&
        matriz[1][i] === 2 &&
        matriz[2][i] === 2
      ) {
        return [0, i];
      }
    }

    //diagonales
    //Si la maquina tiene dos en linea, entonces va a jugar en la posicion que falta para ganar
    if (matriz[0][2] === 2 && matriz[1][1] === 2 && matriz[2][0] === 0) {
      return [2, 0];
    } else if (matriz[0][2] === 2 && matriz[1][1] === 0 && matriz[2][0] === 2) {
      return [1, 1];
    } else if (matriz[0][2] === 0 && matriz[1][1] === 2 && matriz[2][0] === 2) {
      return [0, 2];
    }
    //Si la maquina tiene dos en linea, entonces va a jugar en la posicion que falta para ganar
    if (matriz[0][0] === 2 && matriz[1][1] === 2 && matriz[2][2] === 0) {
      return [2, 2];
    } else if (matriz[0][0] === 2 && matriz[1][1] === 0 && matriz[2][2] === 2) {
      return [1, 1];
    } else if (matriz[0][0] === 0 && matriz[1][1] === 2 && matriz[2][2] === 2) {
      return [0, 0];
    }

    //bloquear el oponente filas
    //Si el jugador tiene dos en linea, entonces la maquina va a jugar en la posicion que falta para ganar
    for (let i = 0; i < 3; i++) {
      if (matriz[i][0] === 1 && matriz[i][1] === 1 && matriz[i][2] === 0) {
        return [i, 2];
      } else if (
        matriz[i][0] === 1 &&
        matriz[i][1] === 0 &&
        matriz[i][2] === 1
      ) {
        return [i, 1];
      } else if (
        matriz[i][0] === 0 &&
        matriz[i][1] === 1 &&
        matriz[i][2] === 1
      ) {
        return [i, 0];
      }
    }

    //bloquear oponente en columnas
    //Si el jugador tiene dos en linea, entonces la maquina va a jugar en la posicion que falta para ganar
    for (let i = 0; i < 3; i++) {
      if (matriz[0][i] === 1 && matriz[1][i] === 1 && matriz[2][i] === 0) {
        return [2, i];
      } else if (
        matriz[0][i] === 1 &&
        matriz[1][i] === 0 &&
        matriz[2][i] === 1
      ) {
        return [1, i];
      } else if (
        matriz[0][i] === 0 &&
        matriz[1][i] === 1 &&
        matriz[2][i] === 1
      ) {
        return [0, i];
      }
    }

    //bloquear oponente en diagonal
    //Si el jugador tiene dos en linea, entonces la maquina va a jugar en la posicion que falta para ganar
    if (matriz[0][0] === 1 && matriz[1][1] === 1 && matriz[2][2] === 0) {
      return [2, 2];
    } else if (matriz[0][0] === 1 && matriz[1][1] === 0 && matriz[2][2] === 1) {
      return [1, 1];
    } else if (matriz[0][0] === 0 && matriz[1][1] === 1 && matriz[2][2] === 1) {
      return [0, 0];
    }

    //Si el jugador tiene dos en linea, entonces la maquina va a jugar en la posicion que falta para ganar
    if (matriz[0][2] === 1 && matriz[1][1] === 1 && matriz[2][0] === 0) {
      return [2, 0];
    } else if (matriz[0][2] === 1 && matriz[1][1] === 0 && matriz[2][0] === 1) {
      return [1, 1];
    } else if (matriz[0][2] === 0 && matriz[1][1] === 1 && matriz[2][0] === 1) {
      return [0, 2];
    }

    //Si la maquina tiene una ficha en el centro, entonces va a jugar en una esquina
    if (matriz[1][1] === 2) {
      if (matriz[0][0] === 0) {
        return [0, 0];
      } else if (matriz[0][2] === 0) {
        return [0, 2];
      } else if (matriz[2][0] === 0) {
        return [2, 0];
      } else if (matriz[2][2] === 0) {
        return [2, 2];
      }
    }

    //Si la maquina tiene una ficha en una esquina, entonces va a jugar en el centro
    if (
      (matriz[0][0] === 2 ||
        matriz[0][2] === 2 ||
        matriz[2][0] === 2 ||
        matriz[2][2] === 2) &&
      matriz[1][1] === 0
    ) {
      return [1, 1];
    }

    //Si la maquina no tiene ninguna ficha, entonces va a jugar en el centro
    if (matriz[1][1] === 0) {
      return [1, 1];
    }

    //Si la maquina no tiene ninguna ficha, entonces va a jugar en una esquina
    if (matriz[0][0] === 0) {
      return [0, 0];
    } else if (matriz[0][2] === 0) {
      return [0, 2];
    } else if (matriz[2][0] === 0) {
      return [2, 0];
    } else if (matriz[2][2] === 0) {
      return [2, 2];
    }

    //Si la maquina no tiene ninguna ficha, entonces va a jugar en una posicion aleatoria de las disponibles
    const posicionAleatoria = Math.floor(Math.random() * posiciones.length);
    return posiciones[posicionAleatoria];
  };

  //funciom obtener boton y sulime unaa funcion de click
  const obtenerBoton = (fila: number, columna: number): HTMLButtonElement => {
    const boton = document.getElementById(
      `${fila}-${columna}`
    ) as HTMLButtonElement;
    return boton;
  };
  const jugarComputadora = () => {
    //si el juego no ha terminado
    if (posiciones.length > 0) {
      //llamar la busqueda Heuristica para obtener la posicion de la maquina
      const posicion = busquedaHeuristica();
      console.log("posicion", posicion);

      const [fila, columna] = posicion;

      const boton = obtenerBoton(fila, columna);
      boton.click();
    }
  };

  //Agregar una funcion para validar el ganador, validando las filas, columnas y diagonales de la matriz 3x3 y retornar el ganador
  const validarGanador = () => {
    //Validar las filas
    for (let i = 0; i < 3; i++) {
      if (
        matriz[i][0] === matriz[i][1] &&
        matriz[i][1] === matriz[i][2] &&
        matriz[i][0] !== 0
      ) {
        return matriz[i][0];
      }
    }

    //Validar las columnas
    for (let i = 0; i < 3; i++) {
      if (
        matriz[0][i] === matriz[1][i] &&
        matriz[1][i] === matriz[2][i] &&
        matriz[0][i] !== 0
      ) {
        return matriz[0][i];
      }
    }

    //Validar las diagonales
    if (
      matriz[0][0] === matriz[1][1] &&
      matriz[1][1] === matriz[2][2] &&
      matriz[0][0] !== 0
    ) {
      return matriz[0][0];
    }

    if (
      matriz[0][2] === matriz[1][1] &&
      matriz[1][1] === matriz[2][0] &&
      matriz[0][2] !== 0
    ) {
      return matriz[0][2];
    }

    return 0;
  };

  //Agregar una funcion para validar si hay un empate
  const validarEmpateUn = () => {
    if (posiciones.length === 0) {
      return true;
    }
    return false;
  };

  //Agregar una funcion para validar si el juego termino, validando si hay un ganador o un empate y retornar un booleano
  const validarJuegoTerminado = () => {
    if (validarGanador() !== 0 || validarEmpateUn()) {
      return true;
    }
    return false;
  };

  //Agregar una funciom para reiniciar el juego
  const reiniciarJuego = () => {
    setMatriz([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setPosiciones([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
    setTurno(true);
  };

  return (
    <div className="container pt-3">
      <h1>Gato</h1>
      {/*  //mostrar el turno del jugador */}
      <h2>Turno del jugador: {turno ? "X" : "O"}</h2>
      {/*   //si el juego termino mostrar un mensaje de ganador o empate */}
      {validarJuegoTerminado() && (
        <h2>
          {validarGanador() !== 0
            ? "Ganador: " + (validarGanador() === 1 ? "X" : "O")
            : "Empate"}
        </h2>
      )}
      {/* //en una tabla mostrar la matriz 3x3 con los valores de la matriz en botones en cada celda y que cambien segun el turno, si turno es true mostrar X y la matriz cambiarla a 1, si es false mostrar O y cambiar la matriz a 2 */}
      <table className="table-info">
        <tbody>
          {matriz.map((fila, i) => (
            <tr key={i}>
              {fila.map((celda, j) => (
                <td key={j}>
                  <button
                    id={`${i}-${j}`}
                    className={`btn btn-${
                      matriz[i][j] === 1 ? "danger" : "primary"
                    }`}
                    onClick={() => {
                      if (validarGanador() !== 0 && !validarEmpateUn()) return;
                      //si el valor de la matriz en la posicion i,j es diferente de 0, no hacer nada (return)
                      if (matriz[i][j] !== 0) {
                        console.log("no se puede jugar");
                        return;
                      }
                      //cambiar el valor de la matriz segun el turno
                      if (turno) {
                        //turno del humano
                        matriz[i][j] = 1;
                        //borrar la posicion de la matriz i,j de posiciones
                        posiciones.splice(
                          posiciones.findIndex(
                            (posicion) => posicion[0] === i && posicion[1] === j
                          ),
                          1
                        );
                        setTurno(false);
                        setTimeout(() => {
                          //turno de la computadora, se pone aqui porque se ejecuta despues de cambiar el turno(es decior el turno humano)
                          jugarComputadora();
                        }, 500);
                      } else {
                        matriz[i][j] = 2;
                        //borrar la posicion de la matriz i,j de posiciones
                        setPosiciones(
                          posiciones.filter(
                            (posicion) => posicion[0] !== i || posicion[1] !== j
                          )
                        );
                        setTurno(true);
                      }
                    }}
                  >
                    {celda === 0 ? "" : celda === 1 ? "X" : "O"}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* //si el juego termino mostrar un boton para reiniciar el juego */}
      {validarJuegoTerminado() && (
        <button className="btn btn-primary" onClick={reiniciarJuego}>
          Reiniciar Juego
        </button>
      )}
      {/* Hola hermosaaaaaaa  te amo holaaaa*/}
      {/*  //mostrar el matriz */}
      <h3>Matriz</h3>
      <table>
        <tbody>
          {matriz.map((fila, i) => (
            <tr key={i}>
              {fila.map((columna, j) => (
                <td key={j}>{columna}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* //mostrar las posiciones */}
      <h3>Posiciones Disponibles</h3>
      <ul>
        {posiciones.map((posicion, i) => (
          <li key={i}>{posicion[0] + "," + posicion[1]}</li>
        ))}
      </ul>
    </div>
  );
};
export default Matriz3x3;
