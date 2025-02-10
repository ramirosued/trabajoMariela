"use client";

import { createContext, useContext, useState, useEffect } from "react";

const NombreContext = createContext();

export const NombreProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [modoJuego, setModoJuego] = useState(false);

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedPuntos = localStorage.getItem("puntos");
    const storedModoJuego = localStorage.getItem("modoJuego");

    if (storedNombre) {
      setNombre(storedNombre);
      setPuntos(parseInt(storedPuntos) || 0);
    }
  }, []);

  useEffect(() => {
    if (nombre) {
      localStorage.setItem("nombre", nombre);
      setPuntos(0);
    }
  }, [nombre]);

  useEffect(() => {
    localStorage.setItem("puntos", puntos);
  }, [puntos]);

  useEffect(() => {
    localStorage.setItem("modoJuego", modoJuego); // Guarda el modo de juego en localStorage
  }, [modoJuego]);

  return (
    <NombreContext.Provider value={{ nombre, setNombre, puntos, setPuntos, modoJuego, setModoJuego }}>
      {children}
    </NombreContext.Provider>
  );
};

export const useNombre = () => {
  const context = useContext(NombreContext);
  if (!context) {
    throw new Error("useNombre debe ser usado dentro de un NombreProvider");
  }
  return context;
};
