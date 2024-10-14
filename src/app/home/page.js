"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  LogOut
} from "lucide-react";
import "./styles.css"; // Importa tu archivo CSS
import AnimalTable from "./cargar/animales/page"
import { useRouter } from "next/navigation";
import ActivitiesTable from "./cargar/actividades/page";

export default function Component() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { icon: PawPrint, label: "Animales", key: "animals" },
    { icon: Activity, label: "Actividades", key: "activities" },
    { icon: Heart, label: "Adopción", key: "adoption" },
    { icon: DollarSign, label: "Donaciones", key: "donations" },
    { icon: FileText, label: "Contratos", key: "contracts" },
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
    { icon: ShoppingBag, label: "Alimentos", key: "food" },
    { icon: Briefcase, label: "Servicios", key: "services" },
    { icon: Truck, label: "Transporte", key: "transport" },
    { icon: List, label: "Listados", key: "lists" },
    { icon: BarChart2, label: "Programas", key: "programs" },
    { icon: TrendingUp, label: "Ingresos", key: "income" },
    { icon: LogOut, label:"LogOut",key:"logout" },
  ];
 const router=useRouter();
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="text-2xl font-bold text-primary">Amigos de Patas</h1>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
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
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {
          activeTab==='animals'&& (
            <AnimalTable></AnimalTable>
          )
          
        }
        {
          activeTab==='activities'&&(
              <ActivitiesTable/>
            )
        }
        {
          activeTab==='logout'&& (
            router.push("/")
          )
        }
      </main>
    </div>
  );
}
