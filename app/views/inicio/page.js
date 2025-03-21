"use client"; //https://supabase.com/dashboard/projects
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useNombre } from "../../context/NombreContext";
import styles from "./inicio.module.css";
import { supabase } from "../../../lib/supabaseClient";

export default function Inicio() {
  const { nombre, setNombre, puntos, modoJuego, setModoJuego } = useNombre();
  const [inputNombre, setInputNombre] = useState("");

  useEffect(() => {
    setModoJuego(false); // Se asegura de que modoJuego sea false al volver a Inicio
    if (nombre) {
      setInputNombre(nombre); // Si ya existe un nombre en el contexto, se carga en el input
    }
  }, [nombre]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputNombre(value);
    setNombre(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const guardarPuntos = async () => {
    if (!nombre) {
      console.error("El nombre no puede estar vacío.");
      return;
    }
  
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nombre, puntos }]);
  
    // Verifica si el error existe antes de acceder a sus propiedades
    if (error) {
      console.error("Error al guardar datos:", error.message); // Asegúrate de que 'error' no sea null
    } else {
      console.log("Datos guardados:", data);
    }
  };
  

  return (
    <div className={`${styles.pageContainer} ${modoJuego ? styles.modoJuego : ""}`}>
      <h2 className={styles.title}>Bienvenido a Calculando</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          value={inputNombre}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </form>

      <div className={styles.buttonsContainer}>
        <Link href="/views/restas">
          <button disabled={!inputNombre} className={styles.button}>Restas</button>
        </Link>
        <Link href="/views/sumas">
          <button disabled={!inputNombre} className={styles.button}>Sumas</button>
        </Link>
        <Link href="/views/multiplicaciones">
          <button disabled={!inputNombre} className={styles.button}>Multiplicación</button>
        </Link>
        <Link href="/views/divisiones">
          <button disabled={!inputNombre} className={styles.button}>División</button>
        </Link>
      </div>

    
      {/* Botón de Modo Juego */}
      <div className={styles.botonJuegoContainer}>
        <p className={styles.s}>Modo Juego</p>
        <button className={`${styles.botonJuego} ${modoJuego ? styles.activo : ""}`} onClick={() => setModoJuego(!modoJuego)}>
          {modoJuego ? "🎮 ON" : "🎮 OFF"}
        </button>
      </div>
    </div>
  );
}
