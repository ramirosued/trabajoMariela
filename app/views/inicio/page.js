"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './inicio.module.css'; // Importa el archivo CSS para el diseño

export default function Inicio() {
  const [nombre, setNombre] = useState('');

  // Cuando el nombre cambia, guardarlo en localStorage
  useEffect(() => {
    if (nombre) {
      localStorage.setItem('nombre', nombre);
    }
  }, [nombre]);

  // Función para manejar el submit del formulario y prevenir recarga de la página
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    if (nombre) {
      localStorage.setItem('nombre', nombre); // Asegurarse de que el nombre se guarde
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Bienvenido a Calculando</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el nombre
          required
          className={styles.input}
        />
      </form>

      <div className={styles.buttonsContainer}>
        {/* Deshabilitar los enlaces si el nombre está vacío */}
        <Link href="/views/restas">
          <button disabled={!nombre} className={styles.button}>
            Restas
          </button>
        </Link>
        <Link href="/views/sumas">
          <button disabled={!nombre} className={styles.button}>
            Sumas
          </button>
        </Link>
        <Link href="/views/multiplicacion">
          <button disabled={!nombre} className={styles.button}>
            Multiplicación
          </button>
        </Link>
        <Link href="/views/division">
          <button disabled={!nombre} className={styles.button}>
            División
          </button>
        </Link>
      </div>
    </div>
  );
}
