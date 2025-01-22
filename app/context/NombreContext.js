// context/NombreContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const NombreContext = createContext();

export const NombreProvider = ({ children }) => {
  const [nombre, setNombre] = useState('');
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const storedNombre = localStorage.getItem('nombre');
    const storedPuntos = localStorage.getItem('puntos');
    if (storedNombre) setNombre(storedNombre);
  }, []);

  useEffect(() => {
    if (nombre) localStorage.setItem('nombre', nombre);
    localStorage.setItem('puntos', puntos);
  }, [nombre, puntos]);

  return (
    <NombreContext.Provider value={{ nombre, setNombre, puntos, setPuntos }}>
      {children}
    </NombreContext.Provider>
  );
};

export const useNombre = () => {
  const context = useContext(NombreContext);

  if (!context) {
    throw new Error('useNombre debe ser usado dentro de un NombreProvider');
  }

  return context;
};
