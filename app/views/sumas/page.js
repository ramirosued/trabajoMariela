"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useNombre } from '../../context/NombreContext'; // Importa el contexto global
import styles from './sumas.module.css'; // Importa los estilos CSS

export default function Sumas() {
  const { nombre, puntos, setPuntos, modoJuego } = useNombre(); // Accede al nombre y puntos desde el contexto global
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(20); // Inicializa el temporizador en 20 segundos

  // Genera nuevos números y calcula el resultado
  const asignarNumero = () => {
    setTiempoRestante(20); // Reinicia el temporizador
    const numA = Math.floor(Math.random() * 101); 
    const numB = Math.floor(Math.random() * 101); 
    setA(numA);
    setB(numB);
    setResultado(numA + numB);
    setMensaje("");
    setRespuestaUsuario("");
  };

  // Verifica si la respuesta es correcta
  const verificarRespuesta = (e) => {
    e.preventDefault(); // Evita recargar la página
    if (parseInt(respuestaUsuario, 10) === resultado) {
      setMensaje(`¡Correcto! 🎉 +${tiempoRestante} puntos`);
      setPuntos(puntos + tiempoRestante); // Suma los puntos basados en el tiempo restante
      setTimeout(() => {
        setMensaje("");
        asignarNumero(); // Genera nuevos números
      }, 2000);
    } else {
      setMensaje("Incorrecto. Inténtalo de nuevo.");
     }
  };

  // Maneja el temporizador
  useEffect(() => {
    if (tiempoRestante > 0) {
      const timer = setTimeout(() => {
        if(modoJuego){
          setTiempoRestante(tiempoRestante - 1);
        }
      }, 1000);
      return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
    } else {
      setMensaje("⏰ ¡Se acabó el tiempo!, resta 10 puntos");
      setPuntos(puntos - 10)
      setTimeout(() => {
        asignarNumero(); // Genera nuevos números después de 2 segundos
      }, 2000);
    }
  }, [tiempoRestante]);

  // Asigna números al cargar el componente
  useEffect(() => {
    if (a === null && b === null) {
      asignarNumero();
    }
  }, [a, b]);

  return (
    <div className={styles.pageContainer}>
      {/* Menú de navegación */}
      <div className={styles.menuContainer}>
        <div className={styles.menuButtons}>
        <Link href="/views/inicio">
            <button className={styles.menuButton}>Home</button>
          </Link>
          <Link href="/views/restas">
            <button className={styles.menuButton}>Restas</button>
          </Link>
          <Link href="/views/sumas">
            <button className={styles.menuButton}>Sumas</button>
          </Link>
          <Link href="/views/multiplicaciones">
            <button className={styles.menuButton}>Multiplicación</button>
          </Link>
          <Link href="/views/divisiones">
            <button className={styles.menuButton}>División</button>
          </Link>
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>¡Bienvenido, {nombre}!</h1>
        <h2 className={styles.subtitle}>Juego de Sumas</h2>
          {modoJuego && (
             <>
              <p className={styles.points}>Puntos: {puntos}</p>
              <p className={styles.timer}>⏳ Tiempo restante: {tiempoRestante}s</p>
            </>
          )}
      </div>

      {/* Tarjeta con el problema de suma */}
      <div className={styles.card}>
        <h3 className={styles.operation}>Resuelve la operación:</h3>
        <div className={styles.problem}>
          {a} + {b}
        </div>

        {/* Formulario para ingresar la respuesta */}
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
        
        {/* Mensaje de retroalimentación */}
        {mensaje && <p className={styles.message}>{mensaje}</p>}
      </div>
    </div>
  );
}
