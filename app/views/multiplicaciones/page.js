"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useNombre } from '../../context/NombreContext'; // Importa el hook del contexto
import styles from './multiplicaciones.module.css'; // Importamos el archivo CSS

export default function Restas() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { nombre } = useNombre(); // Accede al nombre desde el contexto

  const asignarNumero = () => {
    let numA = Math.floor(Math.random() * 20); 
    let numB = Math.floor(Math.random() * 20); 

    // Aseguramos que numA siempre sea mayor que numB

    setA(numA);
    setB(numB);
    setResultado(numA*numB);  // La resta siempre será positiva ahora
    setMensaje(""); 
    setRespuestaUsuario("");
  };

  const verificarRespuesta = (e) => {
    e.preventDefault();
    if (parseInt(respuestaUsuario, 10) === resultado) {
      setMensaje("¡Correcto! 🎉");
      setTimeout(() => {
        setMensaje("");
        asignarNumero(); // Genera nuevos números después de 2 segundos
      }, 2000);
    } else {
      setMensaje("Incorrecto. Inténtalo de nuevo.");
    }
  };

  // Si a y b son nulos, asignamos números
  useEffect(() => {
    if (a === null && b === null) {
      asignarNumero();
    }
  }, [a, b]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.menuButtons}>
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
        <h2 className={styles.subtitle}>Juego de Multiplicaciones</h2>
      </div>

      <div className={styles.card}>
        <h3 className={styles.operation}>Resuelve la operación:</h3>
        <div className={styles.problem}>
          {a} x {b}
        </div>

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
      </div>
    </div>
  );
}
