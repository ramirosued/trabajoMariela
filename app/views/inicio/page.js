"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNombre } from '../../context/NombreContext'; // Importa el hook del contexto
import styles from './inicio.module.css'; // Importa el archivo CSS para el diseño

export default function Inicio() {
  const [inputNombre, setInputNombre] = useState('');
  const { nombre, setNombre } = useNombre(); // Accede al nombre y la función para actualizarlo

  // Función para manejar el cambio en el input y actualizar el nombre en el contexto
  const handleChange = (e) => {
    const value = e.target.value;
    setInputNombre(value); // Actualiza el estado local del input
    setNombre(value); // Actualiza el nombre en el contexto inmediatamente
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Bienvenido a Calculando</h2>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          value={inputNombre}
          onChange={handleChange} // Actualiza el nombre en el contexto directamente al cambiar el input
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
