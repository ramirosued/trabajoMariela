"use client";

import Link from 'next/link'; // Para la navegación
import { useNombre } from '../../context/NombreContext'; // Para acceder al nombre en el contexto
import styles from './menu.module.css'; // Estilos del menú

export default function Menu() {
  const { nombre } = useNombre(); // Obtén el nombre desde el contexto

  return (
    <div className={styles.menuContainer}>
      <h2 className={styles.title}>Bienvenido, {nombre || "Invitado"}!</h2>
      <div className={styles.menuButtons}>
        <Link href="/views/restas">
          <button className={styles.menuButton}>Restas</button>
        </Link>
        <Link href="/views/sumas">
          <button className={styles.menuButton}>Sumas</button>
        </Link>
        <Link href="/views/multiplicacion">
          <button className={styles.menuButton}>Multiplicación</button>
        </Link>
        <Link href="/views/division">
          <button className={styles.menuButton}>División</button>
        </Link>
      </div>
    </div>
  );
}
