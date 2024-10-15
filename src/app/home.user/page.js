"use client";
import { useState } from "react";
import {ResponsiveAppBar } from "./menuBar";
import  {AnimalCard} from "./animalCard"
import ContractTable from "../home/cargar/contratos/page";
import AdopcionesTable from "../home/cargar/adopciones/page";

import "./style.css";

export default function homeUser() {
  const [opcion, setOpciones] = useState("");
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
  ];

  const manejadorOpciones = (pages) => {
    setOpciones(pages);
  };
  return (
    <div>
      <ResponsiveAppBar onButtonClick={manejadorOpciones}></ResponsiveAppBar>
      <h1>{opcion}</h1>
      {
        <main>
          {opcion === "Animales" && (
            <section className="section">
              <AnimalCard elements={initialAnimals} className="card"/>
            </section>
          )}
          {opcion === "Contratos" && <ContractTable></ContractTable>}
          {opcion === "Adopciones" && <AdopcionesTable></AdopcionesTable>}
        </main>
      }
    </div>
  );
}
