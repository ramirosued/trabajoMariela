"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useNombre } from '../../context/NombreContext'; // Importa el hook del contexto
import styles from './sumas.module.css'; // Importa los estilos CSS
import { supabase } from '../../../lib/supabaseClient'; // Importa Supabase

export default function Sumas() {
  const { nombre, puntos, setPuntos, modoJuego } = useNombre(); // Accede al nombre, puntos y modoJuego desde el contexto

  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(20); // Temporizador en 20 segundos por defecto
  const [preguntaActual, setPreguntaActual] = useState(1); // Para contar las preguntas
  const [correctas, setCorrectas] = useState(0); // Para contar las respuestas correctas
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [esperandoRespuesta, setEsperandoRespuesta] = useState(false); // Para esperar respuesta antes de pasar a la siguiente pregunta

  const asignarNumero = () => {
    setTiempoRestante(20); // Reseteamos el tiempo
    const numA = Math.floor(Math.random() * 101); 
    const numB = Math.floor(Math.random() * 101);
    setA(numA);
    setB(numB);
    setResultado(numA + numB); // El resultado es la suma de numA y numB
    setMensaje("");
    setRespuestaUsuario("");
  };

  const verificarRespuesta = (e) => {
    e.preventDefault(); // Prevenimos la recarga de la página al hacer submit
    if (modoJuego) {
      // Asegurándonos de que la respuesta es válida
      const respuesta = parseInt(respuestaUsuario, 10);
      if (respuesta === resultado) {
        // Incrementamos el contador de respuestas correctas
        setCorrectas(correctas+ 1); // Usa la función para actualizar el estado de correctas
        setMensaje(`¡Correcto! 🎉 +${tiempoRestante} puntos`);
        setPuntos(puntos + tiempoRestante); // Sumar puntos basados en el tiempo restante
        setEsperandoRespuesta(true); // Después de una respuesta correcta, espera 3 segundos antes de pasar a la siguiente pregunta
      } else {
        setMensaje("Incorrecto. Inténtalo de nuevo.");
      }
    } else {
      // Si no está en modo juego, pasa automáticamente de pregunta con el mensaje
      const respuesta = parseInt(respuestaUsuario, 10);
      if (respuesta === resultado) {
        setCorrectas(correctas+ 1); 
        console.log(correctas)
        setMensaje(`¡Correcto! 🎉`);
      } else {
        setMensaje("Incorrecto.");
      }
      setEsperandoRespuesta(true); // Esperamos 3 segundos antes de pasar a la siguiente pregunta
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
          enviarPuntos(); // Llamamos a la función para guardar los puntos
        }
      }, 2000); // Espera 2 segundos antes de pasar a la siguiente pregunta
    }
  }, [esperandoRespuesta, preguntaActual]);

  const enviarPuntos = async () => {
    const { error } = await supabase
      .from("usuarios")
      .insert([{ nombre, puntos: correctas, tipo: "suma" }]);
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
    asignarNumero();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>¡Bienvenido, {nombre}!</h1>
        <h2 className={styles.subtitle}>Juego de Sumas</h2>
        {modoJuego && (
          <>
            <p className={styles.timer}>⏳ Tiempo restante: {tiempoRestante}s</p>
          </>
        )}
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
              <>
                <p className={styles.points}>Puntos: {puntos}</p>
              </>
            )}
            <h3 className={styles.operation}>Resuelve la operación:</h3>
            <div className={styles.problem}>{a} + {b}</div>
            <form onSubmit={verificarRespuesta} className={styles.form}>
              <input
                type="number"
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
