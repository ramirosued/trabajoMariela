"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useNombre } from '../../context/NombreContext'; // Importa el hook del contexto
import styles from './divisiones.module.css'; // Importamos el archivo CSS
import { supabase } from '../../../lib/supabaseClient'; // Importa Supabase

export default function Divisiones() {
  const { nombre, puntos, setPuntos, modoJuego } = useNombre(); // Accede al nombre y puntos desde el contexto global
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(20); // Inicializa el temporizador en 20 segundos
  const [preguntaActual, setPreguntaActual] = useState(1); // Para contar las preguntas
  const [correctas, setCorrectas] = useState(0); // Para contar las respuestas correctas
  const [juegoTerminado, setJuegoTerminado] = useState(false); // Para saber si el juego ha terminado
  const [esperandoRespuesta, setEsperandoRespuesta] = useState(false); // Para esperar respuesta antes de pasar a la siguiente pregunta
  const [soloEnteros, setSoloEnteros] = useState(true); // Estado para alternar entre divisiones con enteros o decimales

  const asignarNumero = () => {
    setTiempoRestante(20); // Reseteamos el tiempo
    let numB, cociente, numA;
    
    if (soloEnteros) {
      // Generamos una división exacta con números enteros
      numB = Math.floor(Math.random() * 12) + 1; // Número B entre 1 y 12
      cociente = Math.floor(Math.random() * 13) + 1; // Cociente entre 1 y 12
      numA = numB * cociente; // Asegura que la división sea exacta
    } else {
      // Generamos una división con decimales
      numB = Math.floor(Math.random() * 12) + 1; // Número B entre 1 y 12
      numA = Math.floor(Math.random() * 100) + 1; // Número A entre 1 y 100
      cociente = (numA / numB).toFixed(2); // Resultado con dos decimales
    }

    setA(numA);
    setB(numB);
    setResultado(parseFloat(cociente)); // Convertimos el resultado en un número decimal si es necesario
    setMensaje("");
    setRespuestaUsuario("");
  };

  const verificarRespuesta = (e) => {
    e.preventDefault(); // Prevenimos la recarga de la página al hacer submit
    if (modoJuego) {
      // Asegurándonos de que la respuesta es válida
      const respuesta = parseFloat(respuestaUsuario);
      if (respuesta === resultado) {
        setCorrectas(correctas + 1); // Incrementamos el contador de respuestas correctas
        setMensaje(`¡Correcto! 🎉 +${tiempoRestante} puntos`);
        setPuntos(puntos + tiempoRestante); // Sumar puntos basados en el tiempo restante
        setEsperandoRespuesta(true); // Después de una respuesta correcta, espera 2 segundos antes de pasar a la siguiente pregunta
      } else {
        setMensaje("Incorrecto. Inténtalo de nuevo.");
      }
    } else {
      // Si no está en modo juego, pasa automáticamente de pregunta con el mensaje
      const respuesta = parseFloat(respuestaUsuario);
      if (respuesta === resultado) {
        setCorrectas(correctas + 1);
        console.log(correctas);
        setMensaje(`¡Correcto! 🎉`);
      } else {
        setMensaje("Incorrecto.");
      }
      setEsperandoRespuesta(true); // Esperamos antes de pasar a la siguiente pregunta
    }
  };

  useEffect(() => {
    if (tiempoRestante > 0 && modoJuego && !esperandoRespuesta) {
      const timer = setTimeout(() => {
        setTiempoRestante(tiempoRestante - 1);
      }, 1000);
      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    } else if (tiempoRestante === 0 && !esperandoRespuesta) {
      setMensaje("⏰ ¡Se acabó el tiempo!, resta 10 puntos");
      setPuntos(puntos - 10); // Restar puntos si se acaba el tiempo
      setEsperandoRespuesta(true); // Esperamos antes de pasar a la siguiente pregunta
    }
  }, [tiempoRestante, modoJuego, esperandoRespuesta]);

  useEffect(() => {
    if (a === null && b === null) {
      asignarNumero(); // Asignar números cuando a y b son nulos
    }
  }, [a, b]);

  useEffect(() => {
    if (esperandoRespuesta) {
      setTimeout(() => {
        if (preguntaActual < 10) {
          setPreguntaActual(preguntaActual + 1);
          asignarNumero(); // Asignamos nuevos números a la siguiente pregunta
          setEsperandoRespuesta(false); // Permitimos pasar a la siguiente pregunta
        } else {
          setJuegoTerminado(true); // Termina el juego si es la última pregunta
          enviarPuntos();
        }
      }, 2000); // Espera 2 segundos antes de pasar a la siguiente pregunta
    }
  }, [esperandoRespuesta, preguntaActual]);

  const enviarPuntos = async () => {
    const { error } = await supabase
      .from("usuarios")
      .insert([{ nombre, puntos: correctas, tipo: "division" }]);
    if (error) {
      console.error("Error al guardar puntos:", error.message);
    } else {
      console.log("Puntos guardados correctamente");
    }
  };

  const reiniciarJuego = () => {
    setPreguntaActual(1);
    setCorrectas(0); // Reiniciamos el contador de respuestas correctas
    setJuegoTerminado(false);
    setPuntos(0);
  };

  const cambiarModo = () => {
    setSoloEnteros(!soloEnteros); // Cambiar entre modo entero y decimal
    asignarNumero(); // Asignar nuevos números según el modo
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>¡Bienvenido, {nombre}!</h1>
        <h2 className={styles.subtitle}>Juego de Divisiones</h2>
        {modoJuego && (
          <>
            <p className={styles.timer}>⏳ Tiempo restante: {tiempoRestante}s</p>
          </>
        )}
      </div>

      <div className={styles.toggleContainer}>
        <button
          className={`${styles.toggleButton} ${soloEnteros ? styles.active : ""}`}
          onClick={cambiarModo}
        >
          Solo enteros
        </button>
        <button
          className={`${styles.toggleButton} ${!soloEnteros ? styles.active : ""}`}
          onClick={cambiarModo}
        >
          Permitir decimales
        </button>
      </div>

      <div className={styles.card}>
        {juegoTerminado ? (
          <div>
            <h3 className={styles.operation}>Juego Terminado</h3>
            <p className={styles.message}>Respuestas correctas: {correctas} / 10</p>
            <button onClick={reiniciarJuego} className={styles.submitButton}>Volver a jugar</button>
            <Link href="/">
              <button className={styles.submitButton}>Volver al inicio</button>
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.points}>{preguntaActual}/10</p>
            {modoJuego && (
              <p className={styles.points}>Puntos: {puntos}</p>
            )}
            <h3 className={styles.operation}>Resuelve la operación:</h3>
            <div className={styles.problem}>{a} ÷ {b}</div>
            <form onSubmit={verificarRespuesta} className={styles.form}>
              <input
                type="number"
                step="0.01"
                value={respuestaUsuario}
                onChange={(e) => setRespuestaUsuario(e.target.value)}
                placeholder="Ingresa tu respuesta"
                className={styles.input}
              />
              <input type="submit" value="Verificar" className={styles.submitButton} />
            </form>
            {mensaje && <p className={styles.message}>{mensaje}</p>}
          </>
        )}
      </div>
    </div>
  );
}
