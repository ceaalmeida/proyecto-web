"use client";
import { useState, useEffect } from "react";
import { ResponsiveAppBar } from "./menuBar";
import { AnimalCard } from "./animalCard";
import "./style.css";
import { useRouter } from "next/navigation";

export default function HomeUser () {
  const router = useRouter();
  const initialAnimals = [
    { Nombre: "Max", Especie: "Perro", Raza: "Labrador", Precio_Adopción: 300 },
    { Nombre: "Luna", Especie: "Gato", Raza: "Siamés", Precio_Adopción: 250 },
    { Nombre: "Rocky", Especie: "Perro", Raza: "Pastor Alemán", Precio_Adopción: 350 },
    { Nombre: "Milo", Especie: "Gato", Raza: "Persa", Precio_Adopción: 270 },
    { Nombre: "Milo", Especie: "Gato", Raza: "Persa", Precio_Adopción: 270 },
    { Nombre: "Rocky", Especie: "Perro", Raza: "Pastor Alemán", Precio_Adopción: 350 },
    { Nombre: "Max", Especie: "Perro", Raza: "Labrador", Precio_Adopción: 300 },
    { Nombre: "Luna", Especie: "Gato", Raza: "Siamés", Precio_Adopción: 250 },
    { Nombre: "Milo", Especie: "Gato", Raza: "Persa", Precio_Adopción: 270 },
    { Nombre: "Luna", Especie: "Gato", Raza: "Siamés", Precio_Adopción: 250 },
    { Nombre: "Milo", Especie: "Gato", Raza: "Persa", Precio_Adopción: 270 },
    { Nombre: "Luna", Especie: "Gato", Raza: "Siamés", Precio_Adopción: 250 },

  ];

  const [opcion, setOpciones] = useState("Animales");
  const [element, setElements] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [logIn, setLogIn] = useState();

  const manejadorOpciones = (pages, element) => {
    setOpciones(pages);
    setElements(element);
  };

  const filtrado = initialAnimals.filter((adopcion) =>
    Object.values(adopcion).some((value) =>
      value.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );


  const manejadorBusqueda = (busqueda) => {
    setBusqueda(busqueda);
  };

  const manejarLogin = (logueo) => {
    setLogIn(logueo);
    if(logIn==false){
        router.replace("/") //Esto hay que cambiarlo por el nuevo logout
    }
  };
  

  return (
    <div>
      <ResponsiveAppBar value={opcion} Changes={manejadorBusqueda} Log={manejarLogin} />
      <div>
        <section className="section">
          <AnimalCard elements={filtrado} onButtonClick={manejadorOpciones} className="card" />
        </section>
      </div>
    </div>
  );
}