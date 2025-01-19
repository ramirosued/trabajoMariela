"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const NombreContext = createContext();

// Crear el proveedor para envolver la aplicación
export const NombreProvider = ({ children }) => {
  const [nombre, setNombre] = useState('');

  // Leer el nombre de localStorage si está disponible (solo en el cliente)
  useEffect(() => {
    const storedNombre = localStorage.getItem('nombre');
    if (storedNombre) {
      setNombre(storedNombre);
    }
  }, []);

  // Guardar el nombre en localStorage cada vez que cambie
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

// Crear un hook para usar el contexto
export const useNombre = () => {
  const context = useContext(NombreContext);
  
  if (!context) {
    throw new Error('useNombre debe ser usado dentro de un NombreProvider');
  }

  return context;
};
