"use client";
import { useState } from "react";
import {ResponsiveAppBar } from "./menuBar";
import  {AnimalCard} from "./animalCard"
import ContractTable from "../home/cargar/contratos/page";
import AdopcionesTable from "../home/cargar/adopciones/page";
import Adoptar from "./adoptar"
import "./style.css";
import { TextField } from "@mui/material";

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
  const [busqueda,setBusqueda]= useState("")
  
  const manejadorOpciones = (pages,element) => {
    setOpciones(pages);
    setElements(element);
  };
   const filtrado= initialAnimals.filter((adopcion) =>
    Object.values(adopcion).some((value) =>
        value.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
)
  return (
    <div>
      <ResponsiveAppBar onButtonClick={manejadorOpciones}></ResponsiveAppBar>
      <h1>Animales</h1>
      <div>
      <TextField
                label="Buscar animales"
                variant="outlined"
                value={busqueda}
                onChange={(e)=>setBusqueda(e.target.value)}
                sx={{ mb: 2 }}
            />
      {
        
          
            <section className="section">
              <AnimalCard elements={filtrado} onButtonClick={manejadorOpciones} className="card"/>
            </section>
         
      }
      </div>
    </div>
  );
}
