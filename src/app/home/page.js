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
} from "lucide-react";
import "./styles.css"; // Importa tu archivo CSS

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
  ];

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
        <h2 className="header">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="card-title">
                Animales en el Centro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="card-content">42</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="card-title">Adopciones este mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="card-content">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="card-title">Donaciones Recibidas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="card-content">$2,500</p>
            </CardContent>
          </Card>
        </div>
        <div className="upcoming-activities">
          <h3 className="upcoming-activities-header">Actividades Próximas</h3>
          <Card>
            <CardContent>
              <ul className="activity-list">
                <li className="activity-list-item">
                  <span>Revisión Médica General</span>
                  <span className="activity-date">15 de Julio, 2023</span>
                </li>
                <li className="activity-list-item">
                  <span>Campaña de Vacunación</span>
                  <span className="activity-date">22 de Julio, 2023</span>
                </li>
                <li className="activity-list-item">
                  <span>Evento de Recaudación de Fondos</span>
                  <span className="activity-date">5 de Agosto, 2023</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="add-activity-button">
          <Button variant="contained" color="primary">
            Agregar Nueva Actividad
          </Button>
        </div>
      </main>
    </div>
  );
}
