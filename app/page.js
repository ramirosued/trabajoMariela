"use client";
import Inicio from './views/inicio/page.js'
export default function Home() {
  localStorage.setItem('nombre', "");

  return (
    <div>
<Inicio/>      
</div>
);
}
