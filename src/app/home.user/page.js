"use client";
import { useState } from "react";
import {ResponsiveAppBar } from "./menuBar";
import  {AnimalCard} from "./animalCard"
import ContractTable from "../home/cargar/contratos/page";
import AdopcionesTable from "../home/cargar/adopciones/page";
import Adoptar from "./adoptar"
import "./style.css";

export default function homeUser() {
  
  const initialAnimals = [
    {
      Nombre: "Max",
      Especie: "Perro",
      Raza: "Labrador",
      Precio_Adopción: 300,
    },
    {
      Nombre: "Luna",
      Especie: "Gato",
      Raza: "Siamés",
      Precio_Adopción: 250,
    },
    {
      Nombre: "Rocky",
      Especie: "Perro",
      Raza: "Pastor Alemán",
      Precio_Adopción: 350,
    },
    {
      Nombre: "Milo",
      Especie: "Gato",
      Raza: "Persa",
      Precio_Adopción: 270,
    },
    {
      Nombre: "Milo",
      Especie: "Gato",
      Raza: "Persa",
      Precio_Adopción: 270,
    },
    {
      Nombre: "Milo",
      Especie: "Gato",
      Raza: "Persa",
      Precio_Adopción: 270,
    },
    {
      Nombre: "Milo",
      Especie: "Gato",
      Raza: "Persa",
      Precio_Adopción: 270,
    },
    {
      Nombre: "Milo",
      Especie: "Gato",
      Raza: "Persa",
      Precio_Adopción: 270,
    },
  ];
  const [opcion, setOpciones] = useState("");
  const [element, setElements] = useState("");
  const manejadorOpciones = (pages,element) => {
    setOpciones(pages);
    setElements(element);
  };
  return (
    <div>
      <ResponsiveAppBar onButtonClick={manejadorOpciones}></ResponsiveAppBar>
      <h1>{opcion}</h1>
      {
        <main>
          {opcion === "Animales" && (
            <section className="section">
              <AnimalCard elements={initialAnimals} onButtonClick={manejadorOpciones} className="card"/>
            </section>
          )}
          {opcion === "Adoptar" &&  <Adoptar element={element} onButtonClick={manejadorOpciones}></Adoptar> }
          {opcion === "MAS" &&  <h1>Perfil</h1>}
        </main>
      }
    </div>
  );
}
