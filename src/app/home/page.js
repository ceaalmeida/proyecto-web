"use client";

import React, { useState } from "react";


import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapse,
  Collapse,
} from "@mui/material";
import {
  PawPrint,
  Activity,
  Heart,
  DollarSign,
  FileText,
  Stethoscope,
  ShoppingBag,
  Briefcase,
  Truck,
  List,
  BarChart2,
  TrendingUp,
  LogOut,
  MoreHoriz,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import "./styles.css"; // Importa tu archivo CSS
import AnimalTable from "./cargar/animales/page";
import { useRouter } from "next/navigation";
import ActivitiesTable from "./cargar/actividades/page";
import AdopcionesTable from "./cargar/adopciones/page";
import ProveedorAlimentosTable from "./cargar/proveedores-alimentos/page";
import ProveedorServiciosTable from "./cargar/proveedor-servicios-complementarios/page";
import TransporteTable from "./cargar/transportes/page";
import DonacionesTable from "./cargar/donaciones/page";
import ContractTable from "./cargar/contratos/page";
import ServiceTypeTable from "./cargar/tipo-servicios/page";
import VeterinarianTable from "./cargar/veterinarios/page";
import FoodTypeTable from "./cargar/tipos-alimentos/page";
import { ResponsiveAppBar } from "./menuBar";

export default function Component() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isContractMenuOpen, setIsContractMenuOpen] = useState(false);
  const router = useRouter();

  const sidebarItems = [
    { icon: PawPrint, label: "Animales", key: "animals" },
    { icon: Activity, label: "Actividades", key: "activities" },
    { icon: Heart, label: "Adopción", key: "adoption" },
    { icon: DollarSign, label: "Donaciones", key: "donations" },
    { icon: FileText, label: "Contratos", key: "contracts" },
    { icon: ShoppingBag, label: "Alimentos", key: "food" },
    { icon: Briefcase, label: "Servicios", key: "services" },
    { icon: Truck, label: "Transporte", key: "transport" },
    { icon: List, label: "Listados", key: "lists" },
    { icon: BarChart2, label: "Programas", key: "programs" },
    { icon: TrendingUp, label: "Ingresos", key: "income" },
    { icon: LogOut, label: "LogOut", key: "logout" },
  ];

  const contractOptions = [
    { icon: Stethoscope, label: "Veterinarios", key: "vets" },
    {
      icon: ShoppingBag,
      label: "Proveedor de Alimentos",
      key: "food-provider",
    },
    {
      icon: Briefcase,
      label: "Servicios Complementarios",
      key: "complementary-services",
    },
  ];
  const [opcion, setOpciones] = useState("");
  const [element, setElements] = useState("");
  const manejadorOpciones = (pages,element) => {
    setOpciones(pages);
    setElements(element);
  };

  return (
    <div >
      <div>
        <ResponsiveAppBar onButtonClick={manejadorOpciones}></ResponsiveAppBar>
      </div>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="text-2xl font-bold text-primary">Amigos de Patas</h1>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item) =>
            item.key !== "contracts" ? (
              <Button
                key={item.key}
                className={`sidebar-button ${
                  activeTab === item.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(item.key)}
                startIcon={<item.icon className="mr-2 h-5 w-5" />}
              >
                {item.label}
              </Button>
            ) : (
              <div key={item.key}>
                <Button
                  className={`sidebar-button ${
                    isContractMenuOpen ? "active" : ""
                  }`}
                  onClick={() => setIsContractMenuOpen(!isContractMenuOpen)}
                  startIcon={<item.icon className="mr-2 h-5 w-5" />}
                >
                  {item.label}
                  {!isContractMenuOpen ? (
                    <ChevronRight
                      className=".submenu-active-icon" 
                    ></ChevronRight>
                  ):(
                    <ChevronDown className=".submenu-active-icon">
                      
                    </ChevronDown>
                  )}
                </Button>
                <Collapse in={isContractMenuOpen} timeout="auto" unmountOnExit>
                  <div className="submenu">
                    {contractOptions.map((option) => (
                      <Button
                        key={option.key}
                        startIcon={<option.icon className="mr-2 h-5 w-5" />}
                        className={`sidebar-button submenu-button ${
                          activeTab === option.key ? "active" : ""
                        }`}
                        onClick={() => {
                          setActiveTab(option.key);
                          setIsContractMenuOpen(false);
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </Collapse>
              </div>
            )
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {activeTab === "animals" && <AnimalTable />}
        {activeTab === "activities" && <ActivitiesTable />}
        {activeTab === "adoption" && <AdopcionesTable />}
        {activeTab === "donations" && <DonacionesTable />}
        {activeTab === "contracts" && <ContractTable />}
        {activeTab === "food-provider" && <ProveedorAlimentosTable />}
        {activeTab === "complementary-services" && <ProveedorServiciosTable />}
        {activeTab === "transport" && <TransporteTable />}
        {activeTab === "logout" && router.back("/")}
        {activeTab === "services" && <ServiceTypeTable />}
        {activeTab === "vets" && <VeterinarianTable />}
        {activeTab === "food" && <FoodTypeTable />}
      </main>
    </div>
  );
}
