"use client";

import { useState, useEffect } from "react";
import styles from './restas.module.css'; // Importamos el archivo CSS

export default function Restas() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");

  // useEffect para leer el nombre desde localStorage
  

  const asignarNumero = () => {
    const numA = Math.floor(Math.random() * 101); 
    const numB = Math.floor(Math.random() * 101); 
    setA(numA);
    setB(numB);
    setResultado(numA - numB);
    setMensaje(""); 
    setRespuestaUsuario("");
  };

  const verificarRespuesta = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
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

  if (a === null && b === null) {
    asignarNumero();
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Bienvenido, {nombre}!</h1> {/* Mostrar nombre */}
      <h1 className={styles.title}>Juego de Restas</h1>
      <div className={styles.card}>
        <h2 className={styles.subtitle}>
          Resuelve la siguiente operación:
        </h2>
        <p className={styles.operation}>
          {a} - {b}
        </p>
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
