"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useNombre } from '../../context/NombreContext'; // Cambié la ruta para asegurarme de que sea correcta
import styles from './inicio.module.css'; // Importa el archivo CSS para el diseño

export default function Inicio() {
  const [inputNombre, setInputNombre] = useState('');
  const { nombre, setNombre } = useNombre(); // Accede al nombre y la función para actualizarlo

  // Función para manejar el submit del formulario y guardar el nombre
  const handleSubmit = (e) => {
    e.preventDefault();
    setNombre(inputNombre); // Establece el nombre en el contexto
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Bienvenido a Calculando</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          value={inputNombre}
          onChange={(e) => setInputNombre(e.target.value)} // Actualiza el nombre en el input
          required
          className={styles.input}
        />
      </form>

      <div className={styles.buttonsContainer}>
        <Link href="/views/restas">
          <button disabled={!inputNombre} className={styles.button}>
            Restas
          </button>
        </Link>
        <Link href="/views/sumas">
          <button disabled={!inputNombre} className={styles.button}>
            Sumas
          </button>
        </Link>
        <Link href="/views/multiplicacion">
          <button disabled={!inputNombre} className={styles.button}>
            Multiplicación
          </button>
        </Link>
        <Link href="/views/division">
          <button disabled={!inputNombre} className={styles.button}>
            División
          </button>
        </Link>
      </div>
    </div>
  );
}
