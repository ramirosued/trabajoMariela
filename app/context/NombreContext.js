// context/NombreContext.js

"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const NombreContext = createContext();

export const NombreProvider = ({ children }) => {
  const [nombre, setNombre] = useState('');

  // Recupera el nombre de localStorage solo cuando la página ya esté renderizada (en el lado del cliente)
  useEffect(() => {
    const storedNombre = localStorage.getItem('nombre');
    if (storedNombre) {
      setNombre(storedNombre);
    }
  }, []);

  // Guarda el nombre en localStorage cada vez que cambia
  useEffect(() => {
    if (nombre) {
      localStorage.setItem('nombre', nombre);
    }
  }, [nombre]);

  return (
    <NombreContext.Provider value={{ nombre, setNombre }}>
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
