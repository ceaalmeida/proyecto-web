
"use client";
import { useState } from "react";
import {Probando,ResponsiveAppBar} from "./comp"
import AnimalTable from "../home/cargar/animales/page";
import ContractTable from "../home/cargar/contratos/page";
import AdopcionesTable from "../home/cargar/adopciones/page";




export default function homeUser() {
    const[opcion,setOpciones] = useState("")
    

    const manejadorOpciones=(pages)=>{        
        setOpciones(pages)
        }
    return <div>
        <ResponsiveAppBar onButtonClick={manejadorOpciones}></ResponsiveAppBar>
        <h1>{opcion}</h1>
        <main>
            {opcion==='Animales' && <AnimalTable></AnimalTable>}
            {opcion==='Contratos' && <ContractTable></ContractTable>}
            {opcion==='Adopciones' && <AdopcionesTable></AdopcionesTable>}
        </main>
        </div>
}
